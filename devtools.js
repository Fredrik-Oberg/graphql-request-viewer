if (chrome) {
  browser = chrome;
}
browser.devtools.panels.create("Graphql request viewer", "", "panel.html");
