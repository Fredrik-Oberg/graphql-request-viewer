if (chrome) {
  browser = chrome;
}
browser.devtools.panels.create("GraphQL viewer", "", "index.html");
