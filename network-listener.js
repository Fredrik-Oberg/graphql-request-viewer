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
      document.getElementById("requestList").innerHTML = "";
    },
    false
  );
  document.getElementById("requestListContainer").addEventListener("keydown", function(event) {
    event.preventDefault();
    const clickFirst = () => {
      const allReq = document.querySelectorAll("#requestList li");
      if (allReq.length > 0) {
        allReq[0].click();
      }
    };
    const clickLast = () => {
      const allReq = document.querySelectorAll("#requestList li");
      if (allReq.length > 0) {
        allReq[allReq.length - 1].click();
      }
    };
    const activeRequest = document.querySelector("#requestList li.active");
    //keydown
    if (event.keyCode === 40) {
      if (activeRequest == null) {
        clickFirst();
      } else {
        const next = activeRequest.nextSibling;
        next ? next.click() : clickFirst();
      }
    }
    //keyup
    if (event.keyCode === 38) {
      if (activeRequest == null) {
        clickFirst();
      } else {
        const prev = activeRequest.previousSibling;
        prev ? prev.click() : clickLast();
      }
    }
  });
})();
function setDataInDetailsView(query, variables, response) {
  queryCodeMirror.setValue(query);
  responseCodeMirror.setValue(JSON.stringify(JSON.parse(response), null, 2));
  variablesCodeMirror.setValue(JSON.stringify(JSON.parse(variables), null, 2));
}

function createNetworkListener() {
  chrome.devtools.network.onRequestFinished.addListener(event => {
    event.getContent(body => {
      if (event.request && event.request.url) {
        if (event.request.url.includes("graphql") && event.request.method === "POST") {
          if (event.request.postData.params == null) {
            return;
          }
          const operationName = event.request.postData.params.find(x => x.name === "operationName");
          const query = event.request.postData.params.find(x => x.name === "query");
          const variables = event.request.postData.params.find(x => x.name === "variables");
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
