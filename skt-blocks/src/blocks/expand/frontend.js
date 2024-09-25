/**
 * WordPress dependencies
 */
import domReady from "../../../node_modules/@wordpress/dom-ready";

/**
 * Permanently hide the dismissible notification if clicked.
 */

domReady(() => {
  const elems = document.querySelectorAll(
    ".skt-blocks-block-expand"
  );
  elems.forEach((el) => {
    const btn = el.querySelector(
      ".skt-blocks-expand-toggle"
    );

    const clickHandler = (e) => {
      el.classList.toggle("skt-blocks-expand--more");
      const isExpanded = el.classList.contains(
        "skt-blocks-expand--more"
      );
      btn.setAttribute("aria-expanded", isExpanded ? "true" : "false");

      e.preventDefault();
    };
    if (btn) {
      btn.addEventListener("click", clickHandler);
      btn.addEventListener("tapEnd", clickHandler);
    }
  });
});
