import { useBlockProps } from "@wordpress/block-editor";
import { getCompareClassNames, getCompareCSS } from "./utils";

export default function save({ attributes: a }) {
	const blockProps = useBlockProps.save({
		className: getCompareClassNames(a),
		"data-position": a.position ?? 50,
	});
	const css = getCompareCSS(a);
	if (!a.beforeUrl || !a.afterUrl) return null;
	return (
		<div {...blockProps}>
			<div className="skt-compare__stage">
				<img className="skt-compare__img skt-compare__img--after" src={a.afterUrl} alt={a.afterAlt || ""} draggable="false" />
				<img className="skt-compare__img skt-compare__img--before" src={a.beforeUrl} alt={a.beforeAlt || ""} draggable="false" />
				{a.showLabels && a.beforeLabel && (
					<span className="skt-compare__label skt-compare__label--before">{a.beforeLabel}</span>
				)}
				{a.showLabels && a.afterLabel && (
					<span className="skt-compare__label skt-compare__label--after">{a.afterLabel}</span>
				)}
				<div className="skt-compare__handle" aria-hidden="true">
					<span className="skt-compare__knob"></span>
				</div>
				<input
					className="skt-compare__range"
					type="range"
					min="0"
					max="100"
					step="1"
					defaultValue={a.position ?? 50}
					aria-label="Image comparison slider"
				/>
			</div>
			{css && <style>{css}</style>}
		</div>
	);
}
