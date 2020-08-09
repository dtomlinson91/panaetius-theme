export function animatedToc() {
  $(window)
    .scroll(function () {
      var windScroll = $(this).scrollTop();
      if (windScroll) {
        $(".content > h2, h3, h4").each(function () {
          if ($(this).position().top <= windScroll - 400) {
            var activeHeader = $(".toc-contents").find(
              '[href="#' + $(this).attr("id") + '"]'
            );
            if (activeHeader.length) {
              $("#TableOfContents").find("a").removeClass("visible");
              activeHeader.addClass("visible");
            }
          }
        });
      }
    })
    .scroll();
}
