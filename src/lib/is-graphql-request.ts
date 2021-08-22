import { Request } from "har-format";

export default function isGraphQLRequest(request: Request) {
  if (request.method !== "POST") return false;
  if (!request.postData?.text) return false;
  let postData: any;
  try {
    postData = JSON.parse(request.postData.text);
  } catch (ex) {
    console.error("Could not parse postData", request.postData.text);
    return false;
  }
  if (!postData.query) return false;
  return true;
}
