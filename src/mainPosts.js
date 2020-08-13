window.addEventListener("DOMContentLoaded", async (event) => {
  const { default: App } = await import(
    /* webpackChunkName: "appPosts" */ "./js/posts/App"
  );
  App.bootstrapToc();
});
