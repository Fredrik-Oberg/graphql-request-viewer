import uuid from "uuid";
import { Request } from "har-format";
import { ParsedRequest } from "../App";

const prettifyJson = (val = "") => {
  return JSON.stringify(JSON.parse(val), null, 2);
};
interface ParseRequestReturn {
  request: Request;
  operationName?: string;
  query?: string;
  variables?: string;
  response?: string;
}
const returnFn = ({ request, operationName, query, variables, response }: ParseRequestReturn) => {
  // TODO validate before return
  console.debug("Parsed request", { operationName, query, variables, response });
  return {
    id: uuid.v4(),
    rawRequest: request,
    operationName,
    query,
    variables: prettifyJson(variables),
    response: prettifyJson(response),
  };
};

export default function parseRequest(request: Request, response: string): ParsedRequest | null {
  const id = uuid.v4();
  let operationName, query, variables;
  console.debug("Incoming request", request);
  // Apollo style, I think.
  if (request?.postData?.params != null && request.postData.params.length) {
    operationName = request.postData.params.find((x) => x.name === "operationName")?.value;
    query = request.postData.params.find((x) => x.name === "query")?.value;
    variables = request.postData.params.find((x) => x.name === "variables")?.value;
    return returnFn({ request, operationName, query, variables, response });
  }

  if (request?.postData?.text == null) {
    console.debug("No request.postData.text");
    console.debug(request?.postData);

    return null;
  }

  // Firefox parsing?
  const rawData = request.postData.text.split(request.postData.mimeType.split("boundary=")[1]);
  if (rawData.length === 1) {
    const parsed = JSON.parse(rawData[0]);
    query = parsed.query;
    variables = JSON.stringify(parsed.variables);
    return returnFn({ request, operationName, query, variables, response });
  }

  operationName = rawData[1]
    .replace('Content-Disposition: form-data; name="operationName"', "")
    .replace("--", "")
    .trim();
  query = rawData[2].replace('Content-Disposition: form-data; name="query"', "").replace("--", "").trim();
  variables = rawData[3].replace('Content-Disposition: form-data; name="variables"', "").replace("--", "").trim();

  return returnFn({ request, operationName, query, variables, response });
}
