import React from "react";
import { ListItem, ListItemText } from "@material-ui/core";
import { ParsedRequest } from "../../App";
import extractQueryName from "../../lib/extract-query-name";

interface EventProps {
  request: ParsedRequest;
  selectedRequestId: string | null | undefined;
  handleOnClick: (req: ParsedRequest) => void;
}

function Event({ request, selectedRequestId, handleOnClick }: EventProps) {
  const { id, query, operationName } = request;
  let text = id;
  if (operationName) {
    text = operationName;
  }
  if (query) {
    text = extractQueryName(query);
  }

  return (
    <ListItem button divider onClick={() => handleOnClick(request)} selected={request.id === selectedRequestId}>
      <ListItemText primary={text} secondary={request.rawRequest.url} />
    </ListItem>
  );
}
export default Event;
