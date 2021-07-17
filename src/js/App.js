"use strict";

import { library, dom } from "@fortawesome/fontawesome-svg-core";
// import AOS from "aos";

import { faBookOpen, faChevronLeft, faChevronRight, faCircle, faClock, faEnvelope, faRss, faTag, faSearch, faFileCode } from "@fortawesome/free-solid-svg-icons";

import {
  faFacebook,
  faFacebookF,
  faGithub,
  faGitlab,
  faInstagram,
  faKeybase,
  faLinkedin,
  faLinkedinIn,
  faMastodon,
  faMedium,
  faPinterest,
  faReddit,
  faRedditAlien,
  faStackOverflow,
  faTwitter,
  faWeibo,
} from "@fortawesome/free-brands-svg-icons";

library.add(
  faBookOpen,
  faChevronLeft,
  faChevronRight,
  faCircle,
  faClock,
  faEnvelope,
  faFacebook,
  faFacebookF,
  faGithub,
  faGitlab,
  faInstagram,
  faKeybase,
  faLinkedin,
  faLinkedinIn,
  faMastodon,
  faMedium,
  faPinterest,
  faReddit,
  faRedditAlien,
  faRss,
  faStackOverflow,
  faTag,
  faTwitter,
  faWeibo,
  faSearch,
  faFileCode
);

export default {
  loadFontAwesome: () => {
    dom.watch();
  },
  bootstrapify: () => {
    $(".content blockquote").addClass("blockquote");
    $(".content table").addClass("table");
    $(".content table").wrap('<div class="table-responsive" />');
    $(".content table thead").addClass("thead-dark");
    $(".content figure > img").addClass("img-fluid");
  },
  lazyload: async () => {
    const { default: LazyLoad } = await import(/* webpackChunkName: "lazyload" */ "vanilla-lazyload");
    new LazyLoad({
      thresholds: "40px 10%",
      load_delay: 100,
    });
  },
  // navbarFade: () => {
  //   let $position = $(window).scrollTop();

  //   $(window).scroll(() => {
  //     const $scroll = $(window).scrollTop();
  //     const $navbarHeight = $("#navbar-main-menu.fixed-top").outerHeight();

  //     $scroll > $position ? $("#navbar-main-menu.fixed-top").css("top", -$navbarHeight) : $("#navbar-main-menu.fixed-top").css("top", 0);

  //     if ($scroll <= 0) {
  //       $("#navbar-main-menu.fixed-top").css("top", 0);
  //     }

  //     $position = $scroll;
  //   });
  // },
  aos: () => {
    var AOS = require("aos");
    AOS.init({ duration: 1000, once: false, useClassNames: true });
  },
  scrollBar: () => {
    $(window).on("load scroll resize", function () {
      let top = $(window).scrollTop();
      let height = $(document).height();
      let windowheight = $(window).height();
      let width = (top / (height - windowheight)) * 100;
      $("#line-scroll").css({
        width: width + "%",
      });
    });
  },
  syntaxHighlight: () => {
    if (!window.Prism) {
      return;
    }
    $("pre").addClass("line-numbers");

    Prism.highlightAll();
    $("pre:has(> code[class*=language-])").removeAttr("style");

    const element = $("pre:has(> code:not([class*=language-]))");

    element.addClass("language-none");
    $("> code", element).addClass("language-none");
  },
  test: () => {
    console.log("testing if webpack loads this on start, or for every page?");
  },
  tocbot: () => {
    console.log("tocbot initalised")
    var tocbot = require("tocbot");
    tocbot.init({
      // Where to render the table of contents.
      tocSelector: ".js-toc",
      // Where to grab the headings to build the table of contents.
      contentSelector: ".js-toc-content",
      // Which headings to grab inside of the contentSelector element.
      headingSelector: "h1, h2, h3",
      // For headings inside relative or absolute positioned containers within content.
      hasInnerContainers: true,
      // Offset so the title is shown.
      headingsOffset: 30,
    });
  },
};
