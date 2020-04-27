/** @jsx jsx */
import {jsx} from "@emotion/core";
import {useSelector, useDispatch} from "react-redux";
import {useEffect, Fragment, useState} from "react";
import {actionCreators} from "../redux/actionCreators";
import text from "../styles/text";
import colors from "../styles/colors";
import {basicFadeIn} from "../styles/animations";
import mainStyles from "../styles/main";
import getError from "../utils/getError";

/**
 * This component displays the various targets that a user can connect with.
 * It's responsible for switching targets, handing off resource loading, displaying the token modal.
 */
export default function AvailableConnections() {
  const dispatch = useDispatch();

  const pendingAPIResponse = useSelector((state) => state.pendingAPIResponse);
  const apiTokens = useSelector((state) => state.apiTokens);
  const selectedTarget = useSelector((state) => state.selectedTarget);
  const availableTargets = useSelector((state) => state.available);
  const apiOperationErrors = useSelector((state) => state.apiOperationErrors);
  const downloadStatus = useSelector((state) => state.downloadStatus);
  const uploadStatus = useSelector((state) => state.uploadStatus);

  const collectionError = getError(actionCreators.resources.loadFromTarget);
  const tokenError = collectionError && collectionError.status === 401;

  const status_status = useSelector((state) => state.statuses);

  const [count, setCount] = useState(0);

  // Split the list into groups of 4 to display on different lines
  const outerList = [];
  let newList = [];
  for (let i = 0; i < availableTargets.length; i++) {
    newList.push(availableTargets[i]);
    if ((i + 1) % 4 === 0 || i + 1 === availableTargets.length) {
      outerList.push(newList);
      newList = [];
    }
  }

  /**
   * Dispatch load action on page-load.
   * Dispatch load services on page-load.
   */
  useEffect(() => {
    dispatch(actionCreators.targets.load());
    dispatch(actionCreators.services.loadServices());
    dispatch(actionCreators.statuses.loadStatuses());
  }, [dispatch]);

  /**
   * Watch for a change in apiOperationErrors.
   * If a exists in apiOperationErrors then display the modal.
   **/
  useEffect(() => {
    if (apiOperationErrors.length > 0 && tokenError) {
      dispatch(actionCreators.authorization.displayTokenModal());
    }
  }, [apiOperationErrors]);

  useEffect( () => {
      const interval = setInterval(() => {
        var d = new Date();
        var n = d.toISOString();
        console.log(n);
        setCount( oldCount => oldCount + 1);
      }, 30*1000);
      return () => clearInterval(interval);
    }, []
  );

  // setInterval(() => {
  //   console.log(n)}, 1000);
  /**
   * Set the selected target as the source target.
   * If a connection already exists with the target then dispatch loadFromTarget action.
   * Else display the modal.
   */
  const handleSwitchTarget = (connection) => {
    dispatch(actionCreators.resources.clearResources());

    dispatch(
      actionCreators.resources.removeFromErrorList(
        actionCreators.resources.loadFromTarget.toString()
      )
    );
    dispatch(
      actionCreators.resources.removeFromErrorList(
        actionCreators.resources.loadFromTargetSearch.toString()
      )
    );

    dispatch(actionCreators.targets.switchTarget(connection));

    if (connection.name in apiTokens) {
      dispatch(
        actionCreators.resources.loadFromTarget(
          connection,
          apiTokens[connection.name]
        )
      );
    } else {
      setTimeout(
        () => dispatch(actionCreators.authorization.displayTokenModal()),
        500
      );
    }
  };

  return (
    <div
      css={{
        gridArea: "availableConnections",
        paddingLeft: 50,
      }}
    >
      <span css={text.mediumHeader}>Available Connections</span>
      {outerList.map((innerListItem, index) => (
        <div key={index} css={{display: "flex", flexDirection: "row", paddingTop: 10}}>
          {innerListItem.map(connection => (
          <button
            key={connection.name}
            css={[
              {
                backgroundColor: "white",
                border: "none",
                paddingLeft: 5,
                paddingRight: 10,
                cursor: "pointer",
              },
              pendingAPIResponse ||
              downloadStatus === "pending" ||
              uploadStatus === "pending"
                ? {cursor: "not-allowed", opacity: 0.5}
                : mainStyles.hoverOrFocusTransform,
            ]}
            onClick={() => handleSwitchTarget(connection)}
            disabled={
              pendingAPIResponse ||
              downloadStatus === "pending" ||
              uploadStatus === "pending"
            }
          >
            <img
              src={require(`../images/available_connections/${connection.name}.png`)}
              alt={connection.readable_name}
            />
            {selectedTarget && selectedTarget.name === connection.name ? (
              <div
                css={{
                  minHeight: 5,
                  marginTop: 5,
                  backgroundColor: colors.presqtOrange,
                  animation: `${basicFadeIn} 1s`,
                }}
              ></div>
            ) : null}
          </button>
          ))}
        </div>

      ))}
      <p>{count}</p>
      <p>{JSON.stringify(status_status)}</p>
    </div>
  );
}
