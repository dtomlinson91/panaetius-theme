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
  navbarFade: () => {
    let $position = $(window).scrollTop();

    $(window).scroll(() => {
      const $scroll = $(window).scrollTop();
      const $navbarHeight = $("#navbar-main-menu.fixed-top").outerHeight();

      $scroll > $position ? $("#navbar-main-menu.fixed-top").css("top", -$navbarHeight) : $("#navbar-main-menu.fixed-top").css("top", 0);

      if ($scroll <= 0) {
        $("#navbar-main-menu.fixed-top").css("top", 0);
      }

      $position = $scroll;
    });
  },
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
  lunr: () => {
    const fs = require("fs").promises;
    const { promisify } = require("util");
    const frontMatterParser = require("parser-front-matter");
    const lunrjs = require("lunr");
    const readdirp = require("readdirp");

    const parse = promisify(frontMatterParser.parse.bind(frontMatterParser));

    async function loadPostsWithFrontMatter(postsDirectoryPath) {
      // We read the content directory, but avoid indexing of these directories:
      // .DS_Store, old.
      const postEntryInfos = await readdirp.promise(postsDirectoryPath, {
        fileFilter: ["!.DS_Store", "!_index.md", "!*.jpg", "!*.svg", "!*.png"],
        directoryFilter: "!old",
      });
      // We take each post and map their paths.
      const postNames = postEntryInfos.map((file) => file.path);
      // To debug index building, un-comment the following line to get a list of
      // postNames. Do NOT keep it un-commented or the search will fail.
      // console.error(postNames);
      const posts = await Promise.all(
        postNames.map(async (fileName) => {
          const fileContent = await fs.readFile(`${postsDirectoryPath}/${fileName}`, "utf8");
          const { content, data } = await parse(fileContent);
          return {
            // we only take a 10,000 character slice of the post to index. this ensures
            // our index doesn't grow too large
            content: content.slice(0, 10000),
            ...data,
          };
        })
      );
      return posts;
    }

    function makeIndex(posts) {
      return lunrjs(function () {
        // list of fields we are gathering from each post. we use the Title as our
        // reference marker (identifying feature)
        this.ref("title");
        this.field("title");
        // this.field('authors');
        // this.field('date');
        this.field("content");
        this.field("tags");
        // this.field('resources.src');
        // this.field('imageDescription')
        posts.forEach((p) => {
          this.add(p);
        });
      });
    }

    async function run() {
      // The following line specifies which directory to use for indexing. See above
      // for excluded directories and filetypes.
      const posts = await loadPostsWithFrontMatter(`${__dirname}/../content/`);
      const index = makeIndex(posts);
      // console.log(JSON.stringify(index));
      return JSON.stringify(index);
    }

    // run()
    //   .then(() => process.exit(0))
    //   .catch((error) => {
    //     console.error(error.stack);
    //     process.exit(1);
    //   });

    exports.run = run;
  },
};
