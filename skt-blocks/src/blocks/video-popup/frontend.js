/**
 * External dependencies
 */
import BigPicture from "bigpicture";

/**
 * WordPress dependencies
 */
import domReady from "../../../node_modules/@wordpress/dom-ready";
domReady(() => {
  const elems = document.querySelectorAll(
    ".skt-blocks-video-popup[data-video], .skt-blocks-video-popup [data-video]"
  );
  const openVideo = (el) => {
    if (BigPicture) {
      const videoID = el.getAttribute("data-video");
      const args = {
        el,
        noLoader: true,
      };
      if (videoID.match(/^\d+$/g)) {
        args.vimeoSrc = videoID;
      } else if (videoID.match(/^https?:\/\//g)) {
        args.vidSrc = videoID;
      } else {
        args.ytSrc = videoID;
      }
      BigPicture(args);
    }
  };
  elems.forEach((el) => {
    const a = el.querySelector("a");
    a.addEventListener("click", (ev) => {
      ev.preventDefault();
      openVideo(el);
    });
  });
});
