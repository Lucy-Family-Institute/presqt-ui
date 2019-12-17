/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { useSelector } from "react-redux";

import { object, number } from "prop-types";
import textStyles from "../styles/text";
import MediumHeader from "./widgets/MediumHeader";
import { actionCreators } from "../redux/actionCreators";
import Spinner from "./widgets/spinner";
import { isTSPropertySignature } from "@babel/types";

/**
 * This component is responsible for displaying the details of a selected resource.
 **/
export default function TargetActionDetail() {
  /** SELECTOR DEFINITIONS
   *  selectedSourceResource : Object of the resource details of the selected resource to display.
   * pendingAPIOperations  : Boolean representing if a pending API operation exists
   **/
  const selectedSourceResource = useSelector(
    state => state.resources.selectedInSource
  );
  const pendingAPIOperations = useSelector(
    state => state.resources.pendingAPIOperations
  );

  /**
   * Filter out resource data points that we don't want to display in the detail panel.
   * We exclude the following keys: ['links', 'open', 'children', 'count']
   */
  const detailsToRender = resource => {
    return Object.entries(resource)
      .filter(resourceDetail => {
        const [key, value] = resourceDetail;
        return !["links", "open", "children", "count"].includes(key);
      })
      .map(resourceDetail => {
        const [key, value] = resourceDetail;
        return [
          key
            .split("_")
            .map(element => element[0].toUpperCase() + element.slice(1))
            .join(" "),
          value
        ];
      });
  };

  /**
   * Render the detail item provided. A 'detail item' is a single detail of the resource such as
   * 'kind' or 'kind_name'.
   *
   * Create the proper element based on the type of item (scalar, object, or null).
   **/
  const renderDetailItem = item => {
    const [key, value] = item;
    let renderer;

    if (["string", "number"].includes(typeof value)) {
      renderer = renderScalarItem;
    } else if (["object"].includes(typeof value)) {
      value !== null ? (renderer = renderObject) : (renderer = renderNull);
    }
    console.log(value);
    return (
      <div
        css={{ display: "flex", flexDirection: "column", paddingBottom: 10 }}
        key={key}
      >
        <span css={[textStyles.body, { fontWeight: 500 }]}>{key}</span>
        {renderer(value)}
      </div>
    );
  };

  /**
   * Define the html of a scalar item to be rendered.
   **/
  const renderScalarItem = value => (
    <span css={[textStyles.body, { fontSize: 12 }]}>{value}</span>
  );

  /**
   * Define the html of an object item to be rendered.
   **/
  const renderObject = value => {
    return Object.entries(value).map((resourceDetailElement, index) => {
      const [key, value] = resourceDetailElement;
      return (
        <div key={index} css={{ display: "flex", flexDirection: "row" }}>
          <div css={{ display: "flex", flexDirection: "row" }}>
            <span css={[textStyles.body, { fontSize: 12, paddingLeft: 5, fontWeight: 500 }]}>
              {`${key}:\u00a0`}
            </span>
            <span css={[textStyles.body, { fontSize: 12 }]}>
              {typeof value === "string" ||
              typeof value === "boolean" ||
              typeof value === "number"
                ? value
                : typeof value === "object"
                ? renderObject(value)
                : ""}
            </span>
          </div>
        </div>
      );
    });
  };

  /**
   * Define the html of an null item to be rendered.
   **/
  const renderNull = () => (
    <span css={[textStyles.body, { fontSize: 12 }]}>null</span>
  );

  return (
    <div
      css={[
        css({
          gridArea: "targetActionDetail",
          borderLeftColor: "#C5C5C5",
          borderLeftWidth: 1,
          borderLeftStyle: "solid",
          paddingLeft: 25
        })
      ]}
    >
      {pendingAPIOperations.includes(
        actionCreators.resources.selectSourceResource.toString()
      ) ||
      pendingAPIOperations.includes(
        actionCreators.resources.loadFromSourceTargetSearch.toString()
      ) ? (
        <Spinner />
      ) : selectedSourceResource ? (
        <div>
          <MediumHeader text="Resource Details" />
          <div css={{ paddingTop: 10 }}>
            {detailsToRender(selectedSourceResource).map(resourceData =>
              renderDetailItem(resourceData)
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}
