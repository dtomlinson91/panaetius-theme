"use strict";

export default {
  bootstrapToc: () => {
    require("bootstrap");
    console.log("running new toc");
    // Initialise TOC
    var navSelector = "#toc";
    var $myNav = $(navSelector);
    Toc.init({ $nav: $myNav });
    $("body").scrollspy({
      target: navSelector,
    });
    // Remove duplicate TOC entry
    $("#toc ul").eq(0).remove();
    // Add return to top
  },
};
