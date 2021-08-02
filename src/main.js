import "./scss/styles.scss";


window.addEventListener("DOMContentLoaded", async (event) => {
  const { default: App } = await import(/* webpackChunkName: "app" */ "./js/App");

  App.bootstrapify();
  App.lazyload();
  App.loadFontAwesome();
  App.aos();
  App.scrollBar();
  App.tocbot();
  App.algoliaDocSearch();
  // App.test();
  // App.navbarFade();
});
