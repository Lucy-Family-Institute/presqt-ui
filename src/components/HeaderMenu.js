/** @jsx jsx */
import { jsx } from "@emotion/core";
import textStyles from "../styles/text";
import mainStyles from "../styles/main";
import { actionCreators } from "../redux/actionCreators";
import { useDispatch } from 'react-redux';

export default function HeaderMenu() {
  const dispatch = useDispatch();

  return (
    <div
      css={{
        gridArea: "headerMenu",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-end",
        paddingRight: 50
      }}
    >
      <a
        css={[
          textStyles.globalNav,
          { textDecoration: "none" },
          mainStyles.hoverOrFocusTransform
        ]}
        href="https://presqt.crc.nd.edu"
        target="_blank"
        rel="noopener noreferrer"
      >
        About PresQT
      </a>
      <a
        css={[
          textStyles.globalNav,
          { textDecoration: "none", marginLeft: 25 },
          mainStyles.hoverOrFocusTransform,
        ]}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => dispatch(actionCreators.authorization.displayIssueModal())}
      >
        Submit Feedback
      </a>
    </div>
  );
}
