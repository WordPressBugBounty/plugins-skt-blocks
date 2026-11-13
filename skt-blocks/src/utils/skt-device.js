/**
 * Editor preview-device sync (Desktop / Tablet / Mobile), shared by new blocks.
 *
 * - useEditorDevice() returns the editor's current preview device
 *   ("desktop" | "tablet" | "mobile") and a setter that switches the REAL
 *   editor preview, so clicking a device in the inspector resizes the canvas
 *   and the block previews live — same behaviour as the Grid / Flex blocks.
 * - DeviceTabs renders the Desktop / Tablet / Mobile row and calls
 *   children({ name }) for the active device.
 */
import { useSelect, useDispatch } from "@wordpress/data";
import { Fragment } from "@wordpress/element";
import { __ } from "@wordpress/i18n";

const WP_NAME = { desktop: "Desktop", tablet: "Tablet", mobile: "Mobile" };

export function useEditorDevice() {
	const deviceType = useSelect((select) => {
		const editor = select("core/editor");
		if (editor && typeof editor.getDeviceType === "function") {
			return editor.getDeviceType();
		}
		const editPost = select("core/edit-post");
		if (
			editPost &&
			typeof editPost.__experimentalGetPreviewDeviceType === "function"
		) {
			return editPost.__experimentalGetPreviewDeviceType();
		}
		if (
			editor &&
			typeof editor.__experimentalGetPreviewDeviceType === "function"
		) {
			return editor.__experimentalGetPreviewDeviceType();
		}
		return "Desktop";
	}, []);
	const editorDispatch = useDispatch("core/editor");
	const editPostDispatch = useDispatch("core/edit-post");

	const setDevice = (name) => {
		const d = WP_NAME[name] || "Desktop";
		if (editorDispatch && editorDispatch.setDeviceType) {
			editorDispatch.setDeviceType(d);
		} else if (
			editPostDispatch &&
			editPostDispatch.__experimentalSetPreviewDeviceType
		) {
			editPostDispatch.__experimentalSetPreviewDeviceType(d);
		} else if (
			editorDispatch &&
			editorDispatch.__experimentalSetPreviewDeviceType
		) {
			editorDispatch.__experimentalSetPreviewDeviceType(d);
		}
	};

	const device =
		deviceType === "Tablet"
			? "tablet"
			: deviceType === "Mobile"
			? "mobile"
			: "desktop";

	return { device, setDevice };
}

export function DeviceTabs({ device, setDevice, children }) {
	return (
		<Fragment>
			<div className="skt-device-tabs">
				{[
					["desktop", __("Desktop", "skt-blocks")],
					["tablet", __("Tablet", "skt-blocks")],
					["mobile", __("Mobile", "skt-blocks")],
				].map(([name, label]) => (
					<button
						key={name}
						type="button"
						className={"skt-device-tab" + (device === name ? " is-active" : "")}
						onClick={() => setDevice(name)}
					>
						{label}
					</button>
				))}
			</div>
			{children({ name: device })}
		</Fragment>
	);
}
