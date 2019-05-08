let variablesCodeMirror = {};
let responseCodeMirror = {};
let queryCodeMirror = {};
(function() {
  createNetworkListener();
  responseCodeMirror = CodeMirror(document.getElementById("response"), {
    mode: "javascript",
    lineNumbers: true,
    lineWrapping: true,
    foldGutter: true,
    gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"]
  });
  variablesCodeMirror = CodeMirror(document.getElementById("variables"), {
    mode: "javascript",
    lineWrapping: true,
    lineNumbers: true,
    readOnly: true,
    foldGutter: true,
    gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"]
  });
  queryCodeMirror = CodeMirror(document.getElementById("query"), {
    mode: "javascript",
    lineWrapping: true,
    lineNumbers: true,
    readOnly: true,
    foldGutter: true,
    gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"]
  });

  document.addEventListener("click", function(e) {
    if (
      e.target &&
      e.target.parentElement &&
      e.target.parentElement.id === "requestList" &&
      e.target.tagName === "LI"
    ) {
      const requestList = document.querySelectorAll("#requestList li");
      requestList.forEach(li => {
        li.classList.remove("active");
      });
      e.target.classList.add("active");
    }
  });
  document.getElementById("clearRequestList").addEventListener(
    "click",
    () => {
      document.querySelector("#requestList").innerHTML = "";
    },
    false
  );
})();
function setDataInDetailsView(query, variables, response) {
  queryCodeMirror.setValue(query);
  responseCodeMirror.setValue(JSON.stringify(JSON.parse(response), null, 2));
  variablesCodeMirror.setValue(JSON.stringify(JSON.parse(variables), null, 2));
}

function createNetworkListener() {
  chrome.devtools.network.onRequestFinished.addListener(request => {
    request.getContent(body => {
      if (request.request && request.request.url) {
        if (request.request.url.includes("graphql") && request.request.method === "POST") {
          const operationName = request.request.postData.params.find(x => x.name === "operationName");
          const query = request.request.postData.params.find(x => x.name === "query");
          const variables = request.request.postData.params.find(x => x.name === "variables");
          const liEl = document.createElement("li");
          liEl.onclick = function(e) {
            setDataInDetailsView(query.value, variables.value, body);
          };
          const operationNameValue = document.createTextNode(operationName.value);
          liEl.appendChild(operationNameValue);
          document.querySelector("#requestList").prepend(liEl);
        }
      }
    });
  });
}
