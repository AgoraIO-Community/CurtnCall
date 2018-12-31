// import registerServiceWorker from "./registerServiceWorker";
const renderStart = Date.now();
const startupTime = renderStart - window.performance.timing.responseStart;
console.log(`Create React App startup took: ${startupTime}ms`);
// registerServiceWorker();

async function renderAsync() {
  try {
    const [React, { render }, { default: App }] = await Promise.all([
      import("react"),
      import("react-dom"),
      import("./app/App"),
      import("./app/css/sweetalert-override.css"),
      import("./app/css/date-time-range-picker.css"),
      import("./app/css/pure-css-modal.css"),
      import("./app/css/toggle.css"),
      import("./app/css/twitter-emojis.css"),
      import("./app/css/app.css")
    ]);

    render(<App />, document.getElementById("root"));
  } catch (error) {
    console.log("error", error);
  }
}

renderAsync()
  .then(() => {
    const renderTime = Date.now() - renderStart;
    console.log(`renderAsync took: ${renderTime}ms`);
    console.log(`Total time: ${startupTime + renderTime}ms`);
  })
  .catch(error => {
    console.log("error", error);
  });
