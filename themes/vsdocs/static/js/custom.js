$(document).ready(function() {
  mediumZoom('[data-zoomable]');


  // https://wicky.nillia.ms/headroom.js/
  (function () {
    const myElement = document.querySelector(".headroom");
    if (myElement) {
      const headroom  = new Headroom(myElement);
      headroom.init();
    }
  }())
});
