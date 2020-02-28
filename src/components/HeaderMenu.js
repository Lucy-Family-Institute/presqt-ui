/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { useDispatch } from 'react-redux';
import textStyles from "../styles/text";
import { actionCreators } from "../redux/actionCreators";

const imageHoverStyle = css({
  transform: 'scale(1.1)',
  cursor: "pointer"
});

const imageHoverOrFocus = css({
  ":hover": imageHoverStyle
});

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
          imageHoverOrFocus
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
          imageHoverOrFocus,
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
