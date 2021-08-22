import React from "react";
import { List, ListItem } from "@material-ui/core";
import { ParsedRequest } from "../../App";
import Event from "../Event";

interface EventListProps {
  requests: ParsedRequest[];
  selectedRequestId: string | null | undefined;
  handleSelectedRequest: (req: ParsedRequest) => void;
}
function EventList({ requests, selectedRequestId, handleSelectedRequest }: EventListProps) {
  return (
    <List dense={true}>
      {requests.map((x) => (
        <Event
          key={x.id}
          request={x}
          selectedRequestId={selectedRequestId}
          handleOnClick={(req: ParsedRequest) => handleSelectedRequest(req)}
        />
      ))}
    </List>
  );
}
export default EventList;
