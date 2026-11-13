/**
 * SKT Tabs — front-end behaviour.
 *
 * Markup (from the block's save output):
 *   .skt-tabs[data-initial]
 *     > .skt-tabs__nav[role=tablist] > button.skt-tabs__tab
 *     > .skt-tabs__panels > .skt-tabs__panel (one per tab)
 *
 * Switches tabs on click, supports arrow/Home/End keys, wires up ARIA ids and
 * adds `is-init` once ready (the block's CSS then relies on `.is-active`).
 * Only direct children are used, so tabs nested inside tabs stay independent.
 *
 * Plain ES5, no dependencies.
 */
(function () {
	var counter = 0;

	function childrenWithClass(parent, cls) {
		var out = [];
		for (var i = 0; i < parent.children.length; i++) {
			if (parent.children[i].classList.contains(cls)) {
				out.push(parent.children[i]);
			}
		}
		return out;
	}

	function init(root) {
		if (root.classList.contains("is-init")) return;

		var nav = childrenWithClass(root, "skt-tabs__nav")[0];
		var wrap = childrenWithClass(root, "skt-tabs__panels")[0];
		if (!nav || !wrap) return;

		var tabs = childrenWithClass(nav, "skt-tabs__tab");
		var panels = childrenWithClass(wrap, "skt-tabs__panel");
		if (!tabs.length || !panels.length) return;

		var uid = "skt-tabs-" + ++counter;

		tabs.forEach(function (tab, i) {
			tab.id = uid + "-tab-" + i;
			tab.setAttribute("aria-controls", uid + "-panel-" + i);
			if (panels[i]) {
				panels[i].id = uid + "-panel-" + i;
				panels[i].setAttribute("role", "tabpanel");
				panels[i].setAttribute("aria-labelledby", tab.id);
			}
		});

		function activate(index, focus) {
			if (index < 0) index = tabs.length - 1;
			if (index >= tabs.length) index = 0;
			tabs.forEach(function (tab, i) {
				var on = i === index;
				tab.classList.toggle("is-active", on);
				tab.setAttribute("aria-selected", on ? "true" : "false");
				tab.setAttribute("tabindex", on ? "0" : "-1");
				if (panels[i]) {
					panels[i].classList.toggle("is-active", on);
					if (on) panels[i].removeAttribute("hidden");
					else panels[i].setAttribute("hidden", "");
				}
			});
			if (focus) tabs[index].focus();
		}

		tabs.forEach(function (tab, i) {
			tab.addEventListener("click", function () {
				activate(i, false);
			});
			tab.addEventListener("keydown", function (e) {
				// Orientation follows the current device style (CSS), not a fixed class.
				var vertical = window.getComputedStyle(nav).flexDirection === "column";
				var prev = vertical ? "ArrowUp" : "ArrowLeft";
				var next = vertical ? "ArrowDown" : "ArrowRight";
				if (e.key === next) {
					e.preventDefault();
					activate(i + 1, true);
				} else if (e.key === prev) {
					e.preventDefault();
					activate(i - 1, true);
				} else if (e.key === "Home") {
					e.preventDefault();
					activate(0, true);
				} else if (e.key === "End") {
					e.preventDefault();
					activate(tabs.length - 1, true);
				}
			});
		});

		var initial = (parseInt(root.getAttribute("data-initial"), 10) || 1) - 1;
		activate(Math.min(Math.max(initial, 0), tabs.length - 1), false);
		root.classList.add("is-init");
	}

	function initAll() {
		var roots = document.querySelectorAll(".skt-tabs");
		for (var i = 0; i < roots.length; i++) init(roots[i]);
	}

	if (document.readyState === "loading") {
		document.addEventListener("DOMContentLoaded", initAll);
	} else {
		initAll();
	}
})();
