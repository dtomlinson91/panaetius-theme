import "./scss/styles.scss";
import(/* webpackChunkName: "bootstrap" */ "bootstrap");

window.addEventListener("DOMContentLoaded", async (event) => {
  const { default: App } = await import(
    /* webpackChunkName: "app" */ "./js/App"
  );
  App.bootstrapify();
  App.lazyload();
  App.loadFontAwesome();
  // App.navbarFade();
  App.aos();
  App.scrollBar();
  App.syntaxHighlight();
  App.bootstrapTOC();
});
