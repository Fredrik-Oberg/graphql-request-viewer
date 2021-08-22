import React from "react";

import "webextension-polyfill";

import { Box, Button, Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import EventDetails from "./components/EventDetails/index";
import EventList from "./components/EventList/index";
import DeleteIcon from "@material-ui/icons/Delete";

import parseRequest from "./lib/parse-request";
import isGraphQLRequest from "./lib/is-graphql-request";
import { Request } from "har-format";

const useStyles = makeStyles((theme) => ({
  "@global": {
    body: {
      backgroundColor: "white",
    },
  },
}));

export interface ParsedRequest {
  id: string;
  rawRequest: Request;
  query?: string;
  operationName?: string;
  variables?: string;
  response?: string;
}

function App() {
  useStyles();
  const [requests, setRequests] = React.useState<ParsedRequest[]>([]);
  const [selectedRequest, setSelectedRequest] = React.useState<ParsedRequest | null>(null);
  React.useEffect(() => {
    chrome.devtools.network.onRequestFinished.addListener((req) => {
      req.getContent((response) => {
        if (isGraphQLRequest(req.request)) {
          const parsed = parseRequest(req.request, response);
          if (parsed) {
            setRequests([parsed, ...requests]);
          }
        }
      });
    });
  }, [requests, setRequests]);
  const clearRequests = () => {
    setRequests([]);
    setSelectedRequest(null);
  };
  return (
    <Grid container spacing={2} direction="row">
      <Grid item xs={3}>
        <Box padding={1} justifyContent={"space-between"} display="flex">
          <Typography display="inline">GraphQL Viewer</Typography>
          {requests.length ? (
            <Button
              size="small"
              onClick={clearRequests}
              color="secondary"
              variant="outlined"
              startIcon={<DeleteIcon />}
            >
              Clear
            </Button>
          ) : null}
        </Box>
        <EventList
          requests={requests}
          selectedRequestId={selectedRequest?.id}
          handleSelectedRequest={(req: ParsedRequest) => setSelectedRequest(req)}
        />
      </Grid>
      <Grid item xs={9}>
        {selectedRequest && (
          <Box>
            <EventDetails request={selectedRequest}></EventDetails>
          </Box>
        )}
      </Grid>
    </Grid>
  );
}

export default App;
