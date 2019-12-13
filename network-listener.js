if (chrome) {
  browser = chrome;
}
const KEY_URLS = "grapql_request_viewer_urls";
let variablesCodeMirror = {};
let responseCodeMirror = {};
let queryCodeMirror = {};
let traceSourceCodeMirror = {};
let traceList = [];

// https://gist.github.com/Chalarangelo/99e7cbee0de3c94f0077bb7555110767#file-copytoclipboard-js
const copyToClipboard = str => {
  const el = document.createElement("textarea");
  el.value = str;
  el.setAttribute("readonly", "");
  el.style.position = "absolute";
  el.style.left = "-9999px";
  document.body.appendChild(el);
  el.select();
  document.execCommand("copy");
  document.body.removeChild(el);
};
const renderUrlList = () => {
  const urls = localStorage.getItem(KEY_URLS);
  if (urls == null) return;

  document.getElementById("savedUrlsList").innerHTML = "";
  urls.split(",").forEach(url => {
    const liEl = document.createElement("li");
    liEl.classList.add("list-group-item");

    const urlTextNode = document.createTextNode(url);
    liEl.appendChild(urlTextNode);
    document.getElementById("savedUrlsList").prepend(liEl);
  });
};
const searchKibana = async transactionId => {
  const search = async url => {
    return await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        query: {
          bool: {
            must: {
              match: {
                transactionId: transactionId
              }
            },
            filter: {
              range: {
                "@timestamp": {
                  gte: "now-12h",
                  lte: "now"
                }
              }
            }
          }
        }
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(async response => {
        const res = await response.json();
        const hits = res.hits ? res.hits.hits : [];
        return hits.filter(hit => hit._source.transactionId === transactionId);
      })
      .catch(async error => {
        console.log(error);
      });
  };
  document.querySelector("#traceList").innerHTML = "";
  const savedUrls = localStorage.getItem(KEY_URLS);
  const searchUrls = savedUrls != null ? savedUrls.split(",").filter(url => url.includes("http")) : [];
  const hits = await Promise.all(searchUrls.map(url => search(url)));
  const filteredHits = hits.filter(x => Boolean(x) && x.length);
  filteredHits
    .flat()
    .sort((a, b) => (a._source["@timestamp"] > b._source["@timestamp"] ? 1 : -1))
    .forEach(hit => {
      const source = hit._source;
      const applicationName = source.application || "no application";
      const anchorEl = document.createElement("a");
      anchorEl.classList.add("list-group-item");
      anchorEl.href = "#";
      anchorEl.onclick = function(e) {
        e.preventDefault();
        const jsonMessage = Object.keys(source).find(key => key.includes("msg"));
        let message = jsonMessage ? { ...source, message: JSON.parse(source[jsonMessage]) } : source;

        traceSourceCodeMirror.setValue(JSON.stringify(message, null, 2));
        document.querySelector("#transactionTimestamp").innerHTML = source["@timestamp"];
      };
      const applicationNameTextNode = document.createTextNode(applicationName);
      anchorEl.appendChild(applicationNameTextNode);
      document.querySelector("#traceList").prepend(anchorEl);
      console.log(hit._source);
    });
};
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
  traceSourceCodeMirror = CodeMirror(document.getElementById("traceSource"), {
    mode: "javascript",
    lineWrapping: true,
    lineNumbers: true,
    readOnly: true,
    foldGutter: true,
    gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"]
  });
  document.addEventListener("click", function(e) {
    if (e.target && e.target.parentElement && e.target.parentElement.id === "requestList" && e.target.tagName === "A") {
      const requestList = document.querySelectorAll("#requestList a");
      requestList.forEach(anchor => {
        anchor.classList.remove("active");
      });
      e.target.classList.add("active");
    } else if (e.target && e.target.dataset.copy != null) {
      const copyFrom = e.target.dataset.copy;
      let codeText = "";
      switch (copyFrom) {
        case "variables":
          // We transform the variables to a key:value format
          const variablesText = variablesCodeMirror.doc.getValue();
          try {
            const raw = JSON.parse(variablesText);
            const mapped = Object.entries(raw).reduce((acc, [key, val]) => {
              acc[key] = val.value;
              return acc;
            }, {});

            codeText = JSON.stringify(mapped, null, 2);
          } catch (ex) {
            codeText = variablesCodeMirror.doc.getValue();
          }
          break;
        case "query":
          codeText = queryCodeMirror.doc.getValue();
          break;
        case "response":
          codeText = responseCodeMirror.doc.getValue();
          break;
        default:
          break;
      }
      if (codeText !== "") {
        copyToClipboard(codeText);
      }
    }
  });
  $('a[data-toggle="tab"]').on("shown.bs.tab", async function(e) {
    // refresh b/c hidden codeMirrors is not updating until invoked
    variablesCodeMirror.refresh();
    responseCodeMirror.refresh();
    queryCodeMirror.refresh();
    traceSourceCodeMirror.refresh();
    document.querySelector("#transactionTimestamp").innerHTML = "";
    if (e.target.id === "navSettings") {
      renderUrlList();
    }

    if (e.target.id !== "navTrace") {
      document.querySelector("#traceList").innerHTML = "";
      traceSourceCodeMirror.setValue("");
      return;
    }

    const reqList = document.querySelector("#requestList");
    const currentReqIndex = Array.from(reqList.children).indexOf(document.querySelector("#requestList a.active"));
    const transactionId = [...traceList].reverse()[currentReqIndex];
    if (transactionId == null) return;

    document.querySelector("#transactionId").value = transactionId;
    await searchKibana(transactionId);
  });
  document.getElementById("btnAddUrl").addEventListener(
    "click",
    async () => {
      const savedUrls = localStorage.getItem(KEY_URLS);
      const url = document.getElementById("searchUrlsInput").value;
      const urls = savedUrls != null ? `${savedUrls},${url}` : url;
      localStorage.setItem(KEY_URLS, urls);

      renderUrlList();
    },
    false
  );
  document.getElementById("btnSearch").addEventListener(
    "click",
    async () => {
      await searchKibana(document.getElementById("transactionId").value);
    },
    false
  );
  document.getElementById("clearRequestList").addEventListener(
    "click",
    () => {
      document.getElementById("requestList").innerHTML = "";
      queryCodeMirror.setValue("");
      responseCodeMirror.setValue("");
      variablesCodeMirror.setValue("");
      traceList = [];
      document.querySelector("#traceList").innerHTML = "";
      traceSourceCodeMirror.setValue("");
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
  $('a[href="#graphql"]').tab("show");
  queryCodeMirror.setValue(query);
  responseCodeMirror.setValue(JSON.stringify(JSON.parse(response), null, 2));
  variablesCodeMirror.setValue(JSON.stringify(JSON.parse(variables), null, 2));
}

function createNetworkListener() {
  browser.devtools.network.onRequestFinished.addListener(event => {
    event.getContent(body => {
      if (event.request && event.request.url) {
        if (event.request.url.includes("graphql") && event.request.method === "POST") {
          let operationName, query, variables;
          if (event.request.postData.params == null || event.request.postData.params.length === 0) {
            // Firefox does not parse the multipart body like chrome, need to do it manually
            const rawData = event.request.postData.text.split(event.request.postData.mimeType.split("boundary=")[1]);
            operationName = rawData[1]
              .replace('Content-Disposition: form-data; name="operationName"', "")
              .replace("--", "")
              .trim();
            query = rawData[2]
              .replace('Content-Disposition: form-data; name="query"', "")
              .replace("--", "")
              .trim();
            variables = rawData[3]
              .replace('Content-Disposition: form-data; name="variables"', "")
              .replace("--", "")
              .trim();
            if (operationName == null) {
              return;
            }
          } else {
            operationName = event.request.postData.params.find(x => x.name === "operationName").value;
            query = event.request.postData.params.find(x => x.name === "query").value;
            variables = event.request.postData.params.find(x => x.name === "variables").value;
          }

          const anchorEl = document.createElement("a");
          anchorEl.classList.add("list-group-item");
          anchorEl.href = "#";
          anchorEl.onclick = function(e) {
            e.preventDefault();
            setDataInDetailsView(query, variables, body);
          };
          const operationNameValue = document.createTextNode(operationName);
          anchorEl.appendChild(operationNameValue);
          document.querySelector("#requestList").prepend(anchorEl);

          const transactionId = event.request.headers.find(x => x.name === "x-dooer-transaction-id");
          if (transactionId) {
            traceList.push(transactionId.value);
          }
        }
      }
    });
  });
}
