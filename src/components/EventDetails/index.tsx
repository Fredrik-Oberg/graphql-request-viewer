import React from "react";

import { Box, Button, Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import FileCopyIcon from "@material-ui/icons/FileCopy";

import { CopyToClipboard } from "react-copy-to-clipboard";
import { ParsedRequest } from "../../App";

import Editor from "../Editor";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .cm-editor .cm-content": {
      height: "100%",
      fontSize: "13px",
    },
  },
}));

interface EventDetailsProps {
  request: ParsedRequest;
}
function EventDetails({ request }: EventDetailsProps) {
  const classes = useStyles();

  const query = request.query || "";
  const variables = request.variables || "";
  const response = request.response || "";

  return (
    <Grid container spacing={2} className={classes.root}>
      <Grid item xs={6}>
        <Box>
          <Box padding={1} display="flex" justifyContent="space-between">
            <Typography>Query</Typography>
            <CopyToClipboard text={query}>
              <Button startIcon={<FileCopyIcon />} size="small" variant="outlined">
                Copy
              </Button>
            </CopyToClipboard>
          </Box>
          <Editor value={query} />
        </Box>
        <Box>
          <Box padding={1} display="flex" justifyContent="space-between">
            <Typography>Variables</Typography>
            <CopyToClipboard text={variables}>
              <Button startIcon={<FileCopyIcon />} size="small" variant="outlined">
                Copy
              </Button>
            </CopyToClipboard>
          </Box>
          <Editor value={variables} />
        </Box>
      </Grid>
      <Grid item xs={6}>
        <Box>
          <Box padding={1} display="flex" justifyContent="space-between">
            <Typography>Response</Typography>
            <CopyToClipboard text={response}>
              <Button startIcon={<FileCopyIcon />} size="small" variant="outlined">
                Copy
              </Button>
            </CopyToClipboard>
          </Box>
          <Editor value={response} />
        </Box>
      </Grid>
    </Grid>
  );
}
export default EventDetails;
