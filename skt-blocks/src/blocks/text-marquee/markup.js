import { COPIES, getSeparator } from "./utils";

/** Shared track markup (identical in editor and saved output). */
export default function MarqueeTrack({ attributes }) {
	const items = (attributes.items || []).filter((i) => i && i.text);
	const sep = getSeparator(attributes);
	const groups = [];
	for (let g = 0; g < COPIES; g++) {
		groups.push(
			<ul
				key={g}
				className="skt-marquee__group"
				{...(g > 0 ? { "aria-hidden": "true" } : {})}
			>
				{items.map((it, i) => (
					<li key={i} className="skt-marquee__item">
						<span className="skt-marquee__text">{it.text}</span>
						{sep && (
							<span className="skt-marquee__sep" aria-hidden="true">
								{sep}
							</span>
						)}
					</li>
				))}
			</ul>
		);
	}
	return <div className="skt-marquee__track">{groups}</div>;
}
