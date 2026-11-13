/**
 * Before/After Slider — front-end dragging (plain ES5, no dependencies).
 * Does nothing unless a .skt-compare element is on the page.
 * Pointer / touch / mouse-hover sets --skt-pos on the block; the hidden range
 * input keeps keyboard + screen-reader control (arrow keys, Home, End).
 */
(function () {
	"use strict";

	function init(root) {
		if (root.classList.contains("is-init")) return;
		var stage = root.querySelector(".skt-compare__stage");
		var range = root.querySelector(".skt-compare__range");
		if (!stage) return;

		var vertical = root.classList.contains("skt-compare--vertical");
		var hover = root.classList.contains("skt-compare--hover");
		var dragging = false;

		function set(p) {
			p = Math.max(0, Math.min(100, p));
			root.style.setProperty("--skt-pos", p + "%");
			if (range) range.value = Math.round(p);
		}

		function fromEvent(e) {
			var r = stage.getBoundingClientRect();
			var p = vertical
				? ((e.clientY - r.top) / r.height) * 100
				: ((e.clientX - r.left) / r.width) * 100;
			set(p);
		}

		stage.addEventListener("pointerdown", function (e) {
			dragging = true;
			try {
				stage.setPointerCapture(e.pointerId);
			} catch (err) {}
			fromEvent(e);
		});
		stage.addEventListener("pointermove", function (e) {
			if (dragging || (hover && e.pointerType === "mouse")) fromEvent(e);
		});
		function stop() {
			dragging = false;
		}
		stage.addEventListener("pointerup", stop);
		stage.addEventListener("pointercancel", stop);

		if (range) {
			range.addEventListener("input", function () {
				set(parseFloat(range.value) || 0);
			});
		}
		root.classList.add("is-init");
	}

	function initAll() {
		var roots = document.querySelectorAll(".skt-compare");
		for (var i = 0; i < roots.length; i++) init(roots[i]);
	}

	if (document.readyState === "loading") {
		document.addEventListener("DOMContentLoaded", initAll);
	} else {
		initAll();
	}
})();
