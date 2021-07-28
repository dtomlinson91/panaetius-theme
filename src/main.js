import "./scss/styles.scss";
import(/* webpackChunkName: "jQuery"*/ "jquery");
import(/* webpackChunkName: "bootstrap" */ "bootstrap");
import(/* webpackChunkName: "lunr" */ "lunr");

window.addEventListener("DOMContentLoaded", async (event) => {
  const { default: App } = await import(/* webpackChunkName: "app" */ "./js/App");
  App.bootstrapify();
  App.lazyload();
  App.loadFontAwesome();
  // App.navbarFade();
  App.aos();
  App.scrollBar();
  App.syntaxHighlight();
  App.tocbot();
  // App.test();
});
