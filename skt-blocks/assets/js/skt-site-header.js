/**
 * SKT Site Header — front-end sticky behaviour.
 *
 * Reads config from the header element's data attributes (added by the block's
 * save output when "Sticky" is enabled):
 *   data-sticky="sticky"
 *   data-sticky-on="all|desktop|tablet-mobile|mobile"
 *   data-sticky-threshold="<px>"
 *
 * On scroll past the threshold it adds the `skt-sh-is-stuck` class (the block's
 * scoped CSS styles that state) and inserts a same-height placeholder so the
 * page content does not jump when the header becomes position:fixed.
 *
 * Plain ES5, no dependencies.
 */
(function () {
	function initHeader(header) {
		var threshold = parseInt(header.getAttribute("data-sticky-threshold"), 10) || 0;
		var on = header.getAttribute("data-sticky-on") || "all";
		var placeholder = null;
		var stuck = false;

		function deviceMatches() {
			var w = window.innerWidth;
			if (on === "desktop") return w > 1024;
			if (on === "tablet-mobile") return w <= 1024;
			if (on === "mobile") return w <= 767;
			return true; // "all"
		}

		function stick() {
			if (stuck) return;
			stuck = true;
			placeholder = document.createElement("div");
			placeholder.className = "skt-sh-placeholder";
			placeholder.style.height = header.offsetHeight + "px";
			if (header.parentNode) {
				header.parentNode.insertBefore(placeholder, header.nextSibling);
			}
			header.classList.add("skt-sh-is-stuck");
		}

		function unstick() {
			if (!stuck) return;
			stuck = false;
			header.classList.remove("skt-sh-is-stuck");
			if (placeholder && placeholder.parentNode) {
				placeholder.parentNode.removeChild(placeholder);
			}
			placeholder = null;
		}

		function onScroll() {
			if (!deviceMatches()) {
				unstick();
				return;
			}
			var y = window.pageYOffset || document.documentElement.scrollTop || 0;
			if (y > threshold) {
				stick();
			} else {
				unstick();
			}
		}

		window.addEventListener("scroll", onScroll, { passive: true });
		window.addEventListener("resize", onScroll, { passive: true });
		onScroll();
	}

	function init() {
		var headers = document.querySelectorAll(
			'.skt-site-header[data-sticky="sticky"]'
		);
		for (var i = 0; i < headers.length; i++) {
			initHeader(headers[i]);
		}
	}

	if (document.readyState === "loading") {
		document.addEventListener("DOMContentLoaded", init);
	} else {
		init();
	}
})();
