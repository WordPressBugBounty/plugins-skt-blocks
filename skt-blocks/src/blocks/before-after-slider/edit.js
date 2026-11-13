import { Fragment, useEffect, useState, useRef } from "@wordpress/element";
import { useBlockProps, MediaUpload, MediaUploadCheck } from "@wordpress/block-editor";
import { Button, Placeholder } from "@wordpress/components";
import { __ } from "@wordpress/i18n";
import Inspector from "./inspector";
import { getCompareClassNames, buildCompareCSS } from "./utils";
import { useEditorDevice } from "../../utils/skt-device";

export default function Edit(props) {
	const { attributes: a, setAttributes, clientId } = props;
	const { device } = useEditorDevice();
	const [pos, setPos] = useState(a.position ?? 50);
	const stageRef = useRef(null);
	const dragging = useRef(false);

	useEffect(() => {
		if (!a.uniqueId) setAttributes({ uniqueId: clientId.slice(0, 8) });
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	// Inspector's "Start Position" drives the preview.
	useEffect(() => setPos(a.position ?? 50), [a.position]);

	const blockProps = useBlockProps({ className: getCompareClassNames(a) });
	const vertical = a.orientation === "vertical";

	const move = (e) => {
		const el = stageRef.current;
		if (!el) return;
		const r = el.getBoundingClientRect();
		const p = vertical ? (e.clientY - r.top) / r.height : (e.clientX - r.left) / r.width;
		setPos(Math.max(0, Math.min(100, Math.round(p * 1000) / 10)));
	};

	const picker = (key, label) => (
		<MediaUploadCheck>
			<MediaUpload
				allowedTypes={["image"]}
				value={a[key + "Id"]}
				onSelect={(m) =>
					setAttributes({ [key + "Url"]: m.url, [key + "Id"]: m.id, [key + "Alt"]: a[key + "Alt"] || m.alt || "" })
				}
				render={({ open }) => (
					<Button variant="secondary" onClick={open}>
						{label}
					</Button>
				)}
			/>
		</MediaUploadCheck>
	);

	const css = buildCompareCSS(a, device);

	if (!a.beforeUrl || !a.afterUrl) {
		return (
			<Fragment>
				<Inspector {...props} />
				<div {...blockProps}>
					<Placeholder
						icon="image-flip-horizontal"
						label={__("Before/After Slider", "skt-blocks")}
						instructions={__("Choose the two images to compare.", "skt-blocks")}
					>
						<div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
							{picker("before", a.beforeUrl ? __("Replace Before Image", "skt-blocks") : __("Select Before Image", "skt-blocks"))}
							{picker("after", a.afterUrl ? __("Replace After Image", "skt-blocks") : __("Select After Image", "skt-blocks"))}
						</div>
					</Placeholder>
				</div>
			</Fragment>
		);
	}

	return (
		<Fragment>
			<Inspector {...props} />
			<div {...blockProps} style={{ "--skt-pos": pos + "%" }}>
				<div
					className="skt-compare__stage"
					ref={stageRef}
					onPointerDown={(e) => {
						dragging.current = true;
						e.currentTarget.setPointerCapture(e.pointerId);
						move(e);
					}}
					onPointerMove={(e) => {
						if (dragging.current || a.sliderOnHover) move(e);
					}}
					onPointerUp={() => (dragging.current = false)}
					onPointerCancel={() => (dragging.current = false)}
				>
					<img className="skt-compare__img skt-compare__img--after" src={a.afterUrl} alt="" draggable="false" />
					<img className="skt-compare__img skt-compare__img--before" src={a.beforeUrl} alt="" draggable="false" />
					{a.showLabels && a.beforeLabel && (
						<span className="skt-compare__label skt-compare__label--before">{a.beforeLabel}</span>
					)}
					{a.showLabels && a.afterLabel && (
						<span className="skt-compare__label skt-compare__label--after">{a.afterLabel}</span>
					)}
					<div className="skt-compare__handle" aria-hidden="true">
						<span className="skt-compare__knob"></span>
					</div>
				</div>
				{css && <style>{css}</style>}
			</div>
		</Fragment>
	);
}
