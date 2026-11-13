import { Fragment, useEffect, useState } from "@wordpress/element";
import {
	useBlockProps,
	useInnerBlocksProps,
	BlockControls,
	RichText,
} from "@wordpress/block-editor";
import { ToolbarGroup, ToolbarButton } from "@wordpress/components";
import { useSelect, useDispatch } from "@wordpress/data";
import { createBlock, cloneBlock } from "@wordpress/blocks";
import { __ } from "@wordpress/i18n";
import Inspector from "./inspector";
import { useEditorDevice } from "../../utils/skt-device";
import renderSVG from "../../renderIcon";
import {
	getTabsClassNames,
	getTabsEditorCSS,
	getTabsFontURL,
	MAX_TABS,
} from "./utils";

const CHILD = "skt-blocks/skt-tab";

const newKey = () => Math.random().toString(36).slice(2, 10);

export default function Edit(props) {
	const { attributes, setAttributes, clientId } = props;
	const tabs = attributes.tabs || [];
	const { device } = useEditorDevice();
	const [activeIndex, setActiveIndex] = useState(
		Math.max(0, (parseInt(attributes.initialTab, 10) || 1) - 1)
	);
	const active = Math.min(activeIndex, Math.max(0, tabs.length - 1));

	// Stable unique id used to scope this block's CSS.
	useEffect(() => {
		if (!attributes.uniqueId) {
			setAttributes({ uniqueId: clientId.slice(0, 8) });
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const { innerBlocks, selectedChildIndex } = useSelect(
		(select) => {
			const be = select("core/block-editor");
			const blocks = be.getBlocks(clientId);
			const selId = be.getSelectedBlockClientId();
			let idx = -1;
			if (selId) {
				const parents = be.getBlockParents(selId);
				idx = blocks.findIndex(
					(b) => b.clientId === selId || parents.includes(b.clientId)
				);
			}
			return { innerBlocks: blocks, selectedChildIndex: idx };
		},
		[clientId]
	);
	const {
		replaceInnerBlocks,
		removeBlock,
		insertBlock,
		moveBlocksToPosition,
		updateBlockAttributes,
	} = useDispatch("core/block-editor");

	// Selecting something inside a tab (e.g. from the List View) shows that tab.
	useEffect(() => {
		if (selectedChildIndex >= 0) setActiveIndex(selectedChildIndex);
	}, [selectedChildIndex]);

	// Keep the number of Tab child blocks equal to the number of tab titles.
	useEffect(() => {
		const target = Math.max(1, tabs.length);
		const current = innerBlocks.length;
		if (current === target) return;
		const next = innerBlocks.slice(0, target);
		for (let i = current; i < target; i++) {
			next.push(
				createBlock(CHILD, { tabKey: tabs[i] && tabs[i].key }, [
					createBlock("core/paragraph"),
				])
			);
		}
		replaceInnerBlocks(clientId, next, false);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [tabs.length, innerBlocks.length]);

	// Keep tab titles / icons in the same order as the Tab blocks. Each tab entry
	// and its Tab block share a key, so dragging a Tab in the List View (or
	// moving it any other way) also reorders its title and icon.
	useEffect(() => {
		if (innerBlocks.length !== tabs.length || !tabs.length) return;

		// 1. Every tab entry needs a key.
		if (tabs.some((t) => !t.key)) {
			setAttributes({ tabs: tabs.map((t) => (t.key ? t : { ...t, key: newKey() })) });
			return;
		}

		// 2. Every Tab block needs a unique key that belongs to a tab entry.
		const tabKeys = tabs.map((t) => t.key);
		const claimed = new Set();
		const invalid = [];
		innerBlocks.forEach((blk) => {
			const k = blk.attributes && blk.attributes.tabKey;
			if (k && tabKeys.includes(k) && !claimed.has(k)) claimed.add(k);
			else invalid.push(blk);
		});
		if (invalid.length) {
			const free = tabKeys.filter((k) => !claimed.has(k));
			invalid.forEach((blk, n) => {
				if (free[n]) updateBlockAttributes(blk.clientId, { tabKey: free[n] });
			});
			return;
		}

		// 3. Order differs -> reorder the tab entries to follow the blocks.
		const byKey = {};
		tabs.forEach((t) => (byKey[t.key] = t));
		const ordered = innerBlocks.map((blk) => byKey[blk.attributes.tabKey]);
		if (ordered.some((t, i) => t !== tabs[i])) {
			setAttributes({ tabs: ordered });
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [innerBlocks, tabs]);

	const updateTitle = (i, title) => {
		const next = tabs.map((t, idx) => (idx === i ? { ...t, title } : t));
		setAttributes({ tabs: next });
	};

	const addTab = () => {
		if (tabs.length >= MAX_TABS) return;
		setAttributes({
			tabs: [...tabs, { title: `Tab ${tabs.length + 1}`, icon: "", key: newKey() }],
		});
		setActiveIndex(tabs.length);
	};

	const deleteTab = () => {
		if (tabs.length <= 1 || !innerBlocks[active]) return;
		setAttributes({ tabs: tabs.filter((_, i) => i !== active) });
		removeBlock(innerBlocks[active].clientId, false);
		setActiveIndex(Math.max(0, active - 1));
	};

	const duplicateTab = () => {
		if (tabs.length >= MAX_TABS || !innerBlocks[active]) return;
		const next = [...tabs];
		const key = newKey();
		next.splice(active + 1, 0, { ...tabs[active], key });
		setAttributes({ tabs: next });
		// Fresh uniqueId so the copy gets its own scoped CSS, and its own key.
		insertBlock(
			cloneBlock(innerBlocks[active], { uniqueId: "", tabKey: key }),
			active + 1,
			clientId,
			false
		);
		setActiveIndex(active + 1);
	};

	const moveTab = (dir) => {
		const to = active + dir;
		if (to < 0 || to >= tabs.length || !innerBlocks[active]) return;
		// Only the block is moved; the sync effect reorders title + icon to match.
		moveBlocksToPosition(
			[innerBlocks[active].clientId],
			clientId,
			clientId,
			to
		);
		setActiveIndex(to);
	};

	const blockProps = useBlockProps({
		className: getTabsClassNames(attributes, device),
	});
	const panelsProps = useInnerBlocksProps(
		{ className: "skt-tabs__panels" },
		{
			allowedBlocks: [CHILD],
			template: [
				[CHILD, {}, [["core/paragraph", { placeholder: "Tab content…" }]]],
				[CHILD, {}, [["core/paragraph", { placeholder: "Tab content…" }]]],
				[CHILD, {}, [["core/paragraph", { placeholder: "Tab content…" }]]],
			],
			templateLock: false,
			renderAppender: false,
		}
	);

	const dynamicCSS = getTabsEditorCSS(attributes, active, device);

	return (
		<Fragment>
			<BlockControls>
				<ToolbarGroup>
					<ToolbarButton
						label={__("Add Tab", "skt-blocks")}
						text={__("Add Tab", "skt-blocks")}
						onClick={addTab}
						disabled={tabs.length >= MAX_TABS}
					/>
					<ToolbarButton
						label={__("Duplicate Tab", "skt-blocks")}
						text={__("Duplicate", "skt-blocks")}
						onClick={duplicateTab}
						disabled={tabs.length >= MAX_TABS}
					/>
					<ToolbarButton
						label={__("Move Tab Left/Up", "skt-blocks")}
						text="←"
						onClick={() => moveTab(-1)}
						disabled={active === 0}
					/>
					<ToolbarButton
						label={__("Move Tab Right/Down", "skt-blocks")}
						text="→"
						onClick={() => moveTab(1)}
						disabled={active >= tabs.length - 1}
					/>
					<ToolbarButton
						label={__("Delete Tab", "skt-blocks")}
						text={__("Delete", "skt-blocks")}
						onClick={deleteTab}
						disabled={tabs.length <= 1}
					/>
				</ToolbarGroup>
			</BlockControls>
			<Inspector
				{...props}
				activeIndex={active}
				setActiveIndex={setActiveIndex}
			/>
			<div {...blockProps}>
				<div className="skt-tabs__nav" role="tablist">
					{tabs.map((tab, i) => (
						<div
							key={tab.key || i}
							role="tab"
							className={`skt-tabs__tab${i === active ? " is-active" : ""}`}
							onClick={() => setActiveIndex(i)}
						>
							{tab.icon ? (
								<span className="skt-tabs__icon" aria-hidden="true">
									{renderSVG(tab.icon)}
								</span>
							) : null}
							<RichText
								tagName="span"
								className="skt-tabs__title"
								value={tab.title}
								onChange={(v) => updateTitle(i, v)}
								allowedFormats={[]}
								placeholder={__("Tab title", "skt-blocks")}
							/>
						</div>
					))}
					{tabs.length < MAX_TABS && (
						<button
							type="button"
							className="skt-tabs__add"
							aria-label={__("Add tab", "skt-blocks")}
							onClick={addTab}
						>
							+
						</button>
					)}
				</div>
				<div {...panelsProps} />
				{getTabsFontURL(attributes) && (
					<link rel="stylesheet" href={getTabsFontURL(attributes)} />
				)}
				{dynamicCSS && <style>{dynamicCSS}</style>}
			</div>
		</Fragment>
	);
}
