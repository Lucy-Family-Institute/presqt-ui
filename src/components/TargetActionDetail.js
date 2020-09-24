/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { useSelector } from "react-redux";
import textStyles from "../styles/text";
import MediumHeader from "./widgets/headers/MediumHeader";
import { actionCreators } from "../redux/actionCreators";
import Spinner from "./widgets/spinners/Spinner";

/**
 * This component is responsible for displaying the details of a selected resource.
 **/
export default function TargetActionDetail() {
  const selectedResource = useSelector(state => state.selectedResource);
  const pendingAPIOperations = useSelector(state => state.pendingAPIOperations);

  /**
   * Filter out resource data points that we don't want to display in the detail panel.
   * We exclude the following keys certain keys.
   */
  const detailsToRender = resource => {
    return Object.entries(resource)
      .filter(resourceDetail => {
        const [key, value] = resourceDetail;
        return !["links", "open", "children", "count", "actions"].includes(key);
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
    return (
      <div
        css={{ display: "flex", flexDirection: "column", paddingBottom: 10, flex: "1 1 45%" }}
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
  const renderObject = obj => {
    return Object.entries(obj).map((resourceDetailElement, index) => {
      const [key, value] = resourceDetailElement;
      return (
        <div key={index} css={{ display: "flex" }}>
          <div css={{ display: "flex", flexDirection: "row" }}>
            <span css={[textStyles.body, { fontSize: 12, paddingLeft: 5, fontWeight: 500 }]}>
            {`${key}:\u00a0`}
            </span>
            <span css={[textStyles.body, { fontSize: 12 }]}>
              {typeof value === "object"
                ? <div>{JSON.stringify(value, null, 2)}</div>
              : value.toString()
            }
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
      {
        pendingAPIOperations.includes(actionCreators.resources.selectResource.toString())
        ? <Spinner />
        : pendingAPIOperations.includes(actionCreators.resources.loadFromTargetSearch.toString())
        ? null
        : selectedResource
        ? (
          <div>
            <MediumHeader text="Resource Details" />
            <div css={{ paddingTop: 10, display: "flex", flexWrap: "wrap", justifyContent: "center", maxWidth: "55%" }}>
              {detailsToRender(selectedResource).map(resourceData =>
                renderDetailItem(resourceData)
              )}
            </div>
          </div>
        )
        : null
      }
    </div>
  );
}
