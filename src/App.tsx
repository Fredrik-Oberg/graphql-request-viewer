import * as React from "react";
import "webextension-polyfill";
import { Box, Grid, Typography, Paper, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { UnControlled as CodeMirror } from "react-codemirror2";

import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";

require("codemirror/mode/xml/xml");
require("codemirror/mode/javascript/javascript");
// let browser?: chrome
// if (chrome) {
//   browser = chrome;
// }
// const isGraphQLRequest = (req: chrome.devtools.network.Request) => {
//   const request = req.request;
//   // TODO Remove the need for graphql in url
//   return request.url && request.url.includes("graphql") && request.method === "POST";
// };
const queryExample =
  '{"_initiator":{"type":"script","stack":{"callFrames":[{"functionName":"k","scriptId":"253","url":"https://api.spacex.land/graphql/static/js/main.7ad6a51e.chunk.js","lineNumber":0,"columnNumber":1257},{"functionName":"value","scriptId":"251","url":"https://api.spacex.land/graphql/static/js/1.c995949d.chunk.js","lineNumber":0,"columnNumber":593395},{"functionName":"handleRunQuery","scriptId":"251","url":"https://api.spacex.land/graphql/static/js/1.c995949d.chunk.js","lineNumber":0,"columnNumber":595455},{"functionName":"n._onClick","scriptId":"251","url":"https://api.spacex.land/graphql/static/js/1.c995949d.chunk.js","lineNumber":0,"columnNumber":603166},{"functionName":"","scriptId":"251","url":"https://api.spacex.land/graphql/static/js/1.c995949d.chunk.js","lineNumber":0,"columnNumber":480551},{"functionName":"p","scriptId":"251","url":"https://api.spacex.land/graphql/static/js/1.c995949d.chunk.js","lineNumber":0,"columnNumber":480589},{"functionName":"","scriptId":"251","url":"https://api.spacex.land/graphql/static/js/1.c995949d.chunk.js","lineNumber":0,"columnNumber":481227},{"functionName":"_","scriptId":"251","url":"https://api.spacex.land/graphql/static/js/1.c995949d.chunk.js","lineNumber":0,"columnNumber":481316},{"functionName":"x","scriptId":"251","url":"https://api.spacex.land/graphql/static/js/1.c995949d.chunk.js","lineNumber":0,"columnNumber":481752},{"functionName":"S","scriptId":"251","url":"https://api.spacex.land/graphql/static/js/1.c995949d.chunk.js","lineNumber":0,"columnNumber":481564},{"functionName":"A","scriptId":"251","url":"https://api.spacex.land/graphql/static/js/1.c995949d.chunk.js","lineNumber":0,"columnNumber":482652},{"functionName":"wn","scriptId":"251","url":"https://api.spacex.land/graphql/static/js/1.c995949d.chunk.js","lineNumber":0,"columnNumber":509943},{"functionName":"Pa","scriptId":"251","url":"https://api.spacex.land/graphql/static/js/1.c995949d.chunk.js","lineNumber":0,"columnNumber":571258},{"functionName":"Me","scriptId":"251","url":"https://api.spacex.land/graphql/static/js/1.c995949d.chunk.js","lineNumber":0,"columnNumber":489932},{"functionName":"xn","scriptId":"251","url":"https://api.spacex.land/graphql/static/js/1.c995949d.chunk.js","lineNumber":0,"columnNumber":510424},{"functionName":"Va","scriptId":"251","url":"https://api.spacex.land/graphql/static/js/1.c995949d.chunk.js","lineNumber":0,"columnNumber":571486},{"functionName":"Cn","scriptId":"251","url":"https://api.spacex.land/graphql/static/js/1.c995949d.chunk.js","lineNumber":0,"columnNumber":510166}]}},"_priority":"High","_resourceType":"fetch","cache":{},"connection":"1413408","request":{"method":"POST","url":"https://api.spacex.land/graphql","httpVersion":"HTTP/1.1","headers":[{"name":"Host","value":"api.spacex.land"},{"name":"Connection","value":"keep-alive"},{"name":"Content-Length","value":"609"},{"name":"Pragma","value":"no-cache"},{"name":"Cache-Control","value":"no-cache"},{"name":"sec-ch-ua","value":"\\" Not;A Brand\\";v=\\"99\\", \\"Google Chrome\\";v=\\"91\\", \\"Chromium\\";v=\\"91\\""},{"name":"Accept","value":"application/json"},{"name":"sec-ch-ua-mobile","value":"?0"},{"name":"User-Agent","value":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36"},{"name":"Content-Type","value":"application/json"},{"name":"Origin","value":"https://api.spacex.land"},{"name":"Sec-Fetch-Site","value":"same-origin"},{"name":"Sec-Fetch-Mode","value":"cors"},{"name":"Sec-Fetch-Dest","value":"empty"},{"name":"Referer","value":"https://api.spacex.land/graphql/"},{"name":"Accept-Encoding","value":"gzip, deflate, br"},{"name":"Accept-Language","value":"en-SE,en-US;q=0.9,en-GB;q=0.8,en;q=0.7,sv;q=0.6"}],"queryString":[],"cookies":[],"headersSize":679,"bodySize":609,"postData":{"mimeType":"application/json","text":"{\\"query\\":\\"{\\\\n  launchesPast(limit: 10) {\\\\n    mission_name\\\\n    launch_date_local\\\\n    launch_site {\\\\n      site_name_long\\\\n    }\\\\n    links {\\\\n      article_link\\\\n      video_link\\\\n    }\\\\n    rocket {\\\\n      rocket_name\\\\n      first_stage {\\\\n        cores {\\\\n          flight\\\\n          core {\\\\n            reuse_count\\\\n            status\\\\n          }\\\\n        }\\\\n      }\\\\n      second_stage {\\\\n        payloads {\\\\n          payload_type\\\\n          payload_mass_kg\\\\n          payload_mass_lbs\\\\n        }\\\\n      }\\\\n    }\\\\n    ships {\\\\n      name\\\\n      home_port\\\\n      image\\\\n    }\\\\n  }\\\\n}\\",\\"variables\\":null}"}},"response":{"status":200,"statusText":"OK","httpVersion":"HTTP/1.1","headers":[{"name":"Server","value":"Cowboy"},{"name":"Connection","value":"keep-alive"},{"name":"X-Powered-By","value":"Express"},{"name":"Access-Control-Allow-Origin","value":"*"},{"name":"Content-Type","value":"application/json; charset=utf-8"},{"name":"Content-Length","value":"8227"},{"name":"Etag","value":"W/\\"2023-13QZA8xISxypAXXjkln8ub3qeKc\\""},{"name":"Date","value":"Sun, 18 Jul 2021 11:00:11 GMT"},{"name":"Via","value":"1.1 vegur"}],"cookies":[],"content":{"size":8227,"mimeType":"application/json","compression":0},"redirectURL":"","headersSize":280,"bodySize":8227,"_transferSize":8507,"_error":null},"serverIPAddress":"3.232.242.170","startedDateTime":"2021-07-18T11:00:10.853Z","time":239.39799999061506,"timings":{"blocked":2.7019999900385736,"dns":-1,"ssl":-1,"connect":-1,"send":0.11199999999999988,"wait":233.94599999518599,"receive":2.638000005390495,"_blocked_queueing":1.6039999900385737}}';
const mutationExample =
  '{"_initiator":{"type":"script","stack":{"callFrames":[{"functionName":"k","scriptId":"253","url":"https://api.spacex.land/graphql/static/js/main.7ad6a51e.chunk.js","lineNumber":0,"columnNumber":1257},{"functionName":"value","scriptId":"251","url":"https://api.spacex.land/graphql/static/js/1.c995949d.chunk.js","lineNumber":0,"columnNumber":593395},{"functionName":"handleRunQuery","scriptId":"251","url":"https://api.spacex.land/graphql/static/js/1.c995949d.chunk.js","lineNumber":0,"columnNumber":595455},{"functionName":"n._onOptionSelected","scriptId":"251","url":"https://api.spacex.land/graphql/static/js/1.c995949d.chunk.js","lineNumber":0,"columnNumber":603244},{"functionName":"onMouseUp","scriptId":"251","url":"https://api.spacex.land/graphql/static/js/1.c995949d.chunk.js","lineNumber":0,"columnNumber":604474},{"functionName":"","scriptId":"251","url":"https://api.spacex.land/graphql/static/js/1.c995949d.chunk.js","lineNumber":0,"columnNumber":480551},{"functionName":"p","scriptId":"251","url":"https://api.spacex.land/graphql/static/js/1.c995949d.chunk.js","lineNumber":0,"columnNumber":480589},{"functionName":"","scriptId":"251","url":"https://api.spacex.land/graphql/static/js/1.c995949d.chunk.js","lineNumber":0,"columnNumber":481227},{"functionName":"_","scriptId":"251","url":"https://api.spacex.land/graphql/static/js/1.c995949d.chunk.js","lineNumber":0,"columnNumber":481316},{"functionName":"x","scriptId":"251","url":"https://api.spacex.land/graphql/static/js/1.c995949d.chunk.js","lineNumber":0,"columnNumber":481752},{"functionName":"S","scriptId":"251","url":"https://api.spacex.land/graphql/static/js/1.c995949d.chunk.js","lineNumber":0,"columnNumber":481564},{"functionName":"A","scriptId":"251","url":"https://api.spacex.land/graphql/static/js/1.c995949d.chunk.js","lineNumber":0,"columnNumber":482652},{"functionName":"wn","scriptId":"251","url":"https://api.spacex.land/graphql/static/js/1.c995949d.chunk.js","lineNumber":0,"columnNumber":509943},{"functionName":"Pa","scriptId":"251","url":"https://api.spacex.land/graphql/static/js/1.c995949d.chunk.js","lineNumber":0,"columnNumber":571258},{"functionName":"Me","scriptId":"251","url":"https://api.spacex.land/graphql/static/js/1.c995949d.chunk.js","lineNumber":0,"columnNumber":489932},{"functionName":"xn","scriptId":"251","url":"https://api.spacex.land/graphql/static/js/1.c995949d.chunk.js","lineNumber":0,"columnNumber":510424},{"functionName":"Va","scriptId":"251","url":"https://api.spacex.land/graphql/static/js/1.c995949d.chunk.js","lineNumber":0,"columnNumber":571486},{"functionName":"Cn","scriptId":"251","url":"https://api.spacex.land/graphql/static/js/1.c995949d.chunk.js","lineNumber":0,"columnNumber":510166}]}},"_priority":"High","_resourceType":"fetch","cache":{},"connection":"1415378","request":{"method":"POST","url":"https://api.spacex.land/graphql","httpVersion":"HTTP/1.1","headers":[{"name":"Host","value":"api.spacex.land"},{"name":"Connection","value":"keep-alive"},{"name":"Content-Length","value":"778"},{"name":"Pragma","value":"no-cache"},{"name":"Cache-Control","value":"no-cache"},{"name":"sec-ch-ua","value":"\\" Not;A Brand\\";v=\\"99\\", \\"Google Chrome\\";v=\\"91\\", \\"Chromium\\";v=\\"91\\""},{"name":"Accept","value":"application/json"},{"name":"sec-ch-ua-mobile","value":"?0"},{"name":"User-Agent","value":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36"},{"name":"Content-Type","value":"application/json"},{"name":"Origin","value":"https://api.spacex.land"},{"name":"Sec-Fetch-Site","value":"same-origin"},{"name":"Sec-Fetch-Mode","value":"cors"},{"name":"Sec-Fetch-Dest","value":"empty"},{"name":"Referer","value":"https://api.spacex.land/graphql/"},{"name":"Accept-Encoding","value":"gzip, deflate, br"},{"name":"Accept-Language","value":"en-SE,en-US;q=0.9,en-GB;q=0.8,en;q=0.7,sv;q=0.6"}],"queryString":[],"cookies":[],"headersSize":679,"bodySize":778,"postData":{"mimeType":"application/json","text":"{\\"query\\":\\"mutation asd {\\\\n  delete_users(where: {id: {_eq: \\\\\\"ae0ff17e-8872-49b4-96dd-774785a903fe\\\\\\"}}){\\\\n    returning{\\\\n      timestamp\\\\n    }\\\\n  }\\\\n}\\\\n\\\\n{\\\\n  launchesPast(limit: 10) {\\\\n    mission_name\\\\n    launch_date_local\\\\n    launch_site {\\\\n      site_name_long\\\\n    }\\\\n    links {\\\\n      article_link\\\\n      video_link\\\\n    }\\\\n    rocket {\\\\n      rocket_name\\\\n      first_stage {\\\\n        cores {\\\\n          flight\\\\n          core {\\\\n            reuse_count\\\\n            status\\\\n          }\\\\n        }\\\\n      }\\\\n      second_stage {\\\\n        payloads {\\\\n          payload_type\\\\n          payload_mass_kg\\\\n          payload_mass_lbs\\\\n        }\\\\n      }\\\\n    }\\\\n    ships {\\\\n      name\\\\n      home_port\\\\n      image\\\\n    }\\\\n  }\\\\n}\\\\n\\",\\"variables\\":null,\\"operationName\\":\\"asd\\"}"}},"response":{"status":400,"statusText":"Bad Request","httpVersion":"HTTP/1.1","headers":[{"name":"Server","value":"Cowboy"},{"name":"Connection","value":"keep-alive"},{"name":"X-Powered-By","value":"Express"},{"name":"Access-Control-Allow-Origin","value":"*"},{"name":"Content-Type","value":"application/json; charset=utf-8"},{"name":"Content-Length","value":"174"},{"name":"Etag","value":"W/\\"ae-9BIYuziC68dzA+2+pcbrbXbQiD4\\""},{"name":"Date","value":"Sun, 18 Jul 2021 11:05:59 GMT"},{"name":"Via","value":"1.1 vegur"}],"cookies":[],"content":{"size":174,"mimeType":"application/json","compression":0},"redirectURL":"","headersSize":286,"bodySize":174,"_transferSize":460,"_error":null},"serverIPAddress":"3.232.242.170","startedDateTime":"2021-07-18T11:05:59.381Z","time":447.8750000043921,"timings":{"blocked":2.831000003746711,"dns":65.834,"ssl":102.83200000000002,"connect":267.861,"send":0.24699999999995725,"wait":108.32099999777603,"receive":2.781000002869405,"_blocked_queueing":1.6230000037467107}}';

const parseGraphQLRequest = (req: chrome.devtools.network.Request) => {
  console.log(req.request);
  const request = req.request;
  let operationName, query, variables;
  // Apollo style, I think.
  if (request?.postData?.params != null && request.postData.params.length) {
    operationName = request.postData.params.find((x) => x.name === "operationName")?.value;
    query = request.postData.params.find((x) => x.name === "query")?.value;
    variables = request.postData.params.find((x) => x.name === "variables")?.value;
    // TODO validate
    return { operationName, query, variables };
  }

  if (!request?.postData?.text) return null;
  const postData = JSON.parse(request.postData.text);
  if (postData.query != null) {
    return postData;
  }

  const rawData = request.postData.text.split(request.postData.mimeType.split("boundary=")[1]);
  if (rawData.length === 1) {
    const parsed = JSON.parse(rawData[0]);
    query = parsed.query;
    variables = JSON.stringify(parsed.variables);
  } else {
    operationName = rawData[1]
      .replace('Content-Disposition: form-data; name="operationName"', "")
      .replace("--", "")
      .trim();
    query = rawData[2].replace('Content-Disposition: form-data; name="query"', "").replace("--", "").trim();
    variables = rawData[3].replace('Content-Disposition: form-data; name="variables"', "").replace("--", "").trim();
    if (operationName == null) {
      return null;
    }
  }
  return { operationName, query, variables };
};

const useStyles = makeStyles((theme) => ({
  "@global": {
    body: {
      backgroundColor: "white",
    },
  },
}));
function App() {
  useStyles();
  const [requests, setRequests] = React.useState<chrome.devtools.network.Request[]>([]);
  const [selectedRequest, setSelectedRequest] = React.useState<chrome.devtools.network.Request | null>(null);
  const [buttonClicked, setButtonClicked] = React.useState<Boolean>(false);
  React.useEffect(() => {
    chrome.devtools.network.onRequestFinished.addListener((req) => {
      req.getContent((content, encoding) => {
        console.log(content);
        console.log(req);
        if (buttonClicked) {
          setRequests([...requests, JSON.parse(queryExample), JSON.parse(mutationExample)]);
          setButtonClicked(false);
        }
        // if (isGraphQLRequest(req)) {
        //   setRequests([...requests, req]);
        // }
      });
    });
  }, [requests, setRequests, buttonClicked, setButtonClicked]);
  console.log(requests);
  return (
    <>
      {/* <Button onClick={() => setButtonClicked(true)}>Add req</Button> */}
      <Grid container spacing={2} direction="row">
        <Grid item xs={3}>
          {requests.map((x, i) => (
            <Paper key={x.time + i}>
              <Event request={x} handleOnClick={(req) => setSelectedRequest(req)} />
            </Paper>
          ))}
        </Grid>
        <Grid item xs={9}>
          {selectedRequest && (
            <Box>
              <EventDetails request={selectedRequest}></EventDetails>
            </Box>
          )}
        </Grid>
      </Grid>
    </>
  );
}

export default App;

function Event({
  request,
  handleOnClick,
}: {
  request: chrome.devtools.network.Request;
  handleOnClick: (request: chrome.devtools.network.Request) => void;
}) {
  const parsed = parseGraphQLRequest(request);
  console.log(parsed);
  return (
    <Typography onClick={() => handleOnClick(request)} color={"textSecondary"}>
      {parsed && parsed.operationName
        ? parsed.operationName
        : `${parsed.query.replace("{\n", "").trimStart().substring(0, 15)}...`}
    </Typography>
  );
}
function EventDetails({ request }: { request: chrome.devtools.network.Request }) {
  const parsed = parseGraphQLRequest(request);
  const [response, setResponse] = React.useState<string | null | undefined>("");

  // React.useEffect(() => {
  //   async function getContent() {
  //       setResponse(JSON.stringify(JSON.parse(content), null, 2));
  //     });
  //   }
  //   getContent();
  // }, [response, setResponse]);
  // todo check if parsed operationName
  /*
  // split query on space
    const splitOnSpace = query.split(" ");
    const type = splitOnSpace[0];
    if (type.toLowerCase() != "mutation" && type.toLowerCase() != "query") {
      // return first that is not whitespace or '{'
      const queryName = splitOnSpace.find((x: string) => x.trim() != "{");
      operationName = queryName;
    } else {
      const name = splitOnSpace[1].split("(")[0];
      operationName = `${type}: ${name}`;
    }
  */
  return (
    <Box display={"flex"} flexDirection={"row"}>
      <Box display={"flex"}>
        <CodeMirror
          value={parsed ? parsed.query : ""}
          options={{
            mode: "json",
            theme: "material",
            lineNumbers: true,
          }}
        />
        <CodeMirror
          value={parsed ? parsed.variables : ""}
          options={{
            mode: "json",
            theme: "material",
            lineNumbers: true,
          }}
        />
        {/* color={"textSecondary"}>{}</Typography>; */}
      </Box>
      <Box display={"flex"}>
        <CodeMirror
          value={response ? response : ""}
          options={{
            mode: "json",
            theme: "material",
            lineNumbers: true,
          }}
        />
      </Box>
    </Box>
  );
}
