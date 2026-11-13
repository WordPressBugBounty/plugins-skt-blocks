/**
 * Legacy-markup compatibility shim.
 *
 * Fixes "Attempt Block Recovery" on OLD saved content (2.6 era) whose markup
 * no longer matches the current save output — most importantly the SKT Section
 * block and its children (Column / Info Block), where the background wrapper
 * and/or the outer className changed between versions.
 *
 * It works by registering, for every skt-blocks/* block, extra deprecations
 * that re-use the block's CURRENT save but tolerate:
 *    - a missing outer className  (sktNoClass)
 *    - a missing background wrapper (sktNoBg, only for the BG container blocks)
 * These are APPENDED to any hand-written per-block deprecations, so both
 * mechanisms work together (WordPress tries each until one validates).
 *
 * This is the same shim that shipped in the wordpress.org 2.8 build and must
 * NOT be dropped on rebuilds, or Section-child recovery returns.
 */
(function () {
	var w = window.wp;
	if (!w || !w.hooks || !w.hooks.addFilter) return;
	var BG = {
		"skt-blocks/section": 1,
		"skt-blocks/column": 1,
		"skt-blocks/info-block": 1,
	};
	function wrap(save, noBg, noClass) {
		var f = function (p) {
			return save(noBg ? Object.assign({}, p, { sktNoBg: true }) : p);
		};
		f.sktNoClass = !!noClass;
		return f;
	}
	w.hooks.addFilter(
		"blocks.registerBlockType",
		"skt-blocks/legacy-markup",
		function (s, name) {
			if (typeof name !== "string" || name.indexOf("skt-blocks/") !== 0)
				return s;
			if (!s || typeof s.save !== "function") return s;
			if (arguments.length > 2 && arguments[2]) return s; /* deprecation pass */
			var list = (s.deprecated || []).slice();
			function add(noBg, noClass, attrs) {
				list.push({
					attributes: attrs || s.attributes,
					supports: s.supports,
					save: wrap(s.save, noBg, noClass),
				});
			}
			add(false, true);
			if (BG[name]) {
				add(true, false);
				add(true, true);
			}
			if (name === "skt-blocks/column") {
				add(
					false,
					false,
					Object.assign({}, s.attributes, {
						hoverboxShadowBlur: { type: "number", default: 6 },
						hoverboxShadowSpread: { type: "number", default: 1 },
					})
				);
			}
			return Object.assign({}, s, { deprecated: list });
		},
		10
	);
	w.hooks.addFilter(
		"blocks.getSaveContent.extraProps",
		"skt-blocks/legacy-markup",
		function (props, bt) {
			if (
				bt &&
				bt.save &&
				bt.save.sktNoClass &&
				props &&
				props.className !== undefined
			) {
				props = Object.assign({}, props);
				delete props.className;
			}
			return props;
		},
		1000
	);
})();
