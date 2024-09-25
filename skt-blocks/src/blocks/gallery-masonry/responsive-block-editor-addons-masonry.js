import jQuery from "jquery";

(function ($) {
  "use strict";

  const container = $(
    ".wp-block-skt-blocks-gallery-masonry ul"
  );

  $(document).ready(function () {
    container.imagesLoaded(function () {
      container.masonry({
        itemSelector: ".skt-blocks-gallery--item",
        transitionDuration: "0",
        percentPosition: true,
      });
    });
  });
})(jQuery);
