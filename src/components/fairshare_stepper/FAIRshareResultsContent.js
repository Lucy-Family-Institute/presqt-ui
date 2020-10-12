/** @jsx jsx */
import { Fragment, useEffect, useState } from "react";
import { jsx } from "@emotion/core";
import List from "@material-ui/core/List";
import TestListItem from "../widgets/list_items/TestListItem";
import FAIRshareSuccessMessageList from "../widgets/list_items/FAIRshareSuccessMessageList";
import FAIRshareWarningMessageList from "../widgets/list_items/FAIRshareWarningMessageList";
import FAIRshareFailureMessageList from "../widgets/list_items/FAIRshareFailureMessageList";
import { Collapse } from "@material-ui/core";

export default function FAIRshareResultsContent({ testInfo }) {
  const [open, setOpen] = useState(false);

  return (
    <Fragment>
      <List dense={true}>
        <TestListItem
          message={testInfo.test_name}
          link={testInfo.metric_link}
          setOpen={setOpen}
          open={open}
        />
      </List>
      <Collapse in={open}>
        {testInfo.successes.length > 0 ? (
          <FAIRshareSuccessMessageList messages={testInfo.successes} />
        ) : testInfo.failures.length > 0 ? (
          <FAIRshareFailureMessageList messages={testInfo.failures} />
        ) : testInfo.warnings.length > 0 ? (
          <FAIRshareWarningMessageList messages={testInfo.warnings} />
        ) : null}
      </Collapse>
    </Fragment>
  );
}
