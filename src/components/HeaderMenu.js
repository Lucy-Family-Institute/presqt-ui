/** @jsx jsx */
import { jsx, css } from "@emotion/core";

import textStyles from "../styles/text";

const imageHoverStyle = css({
  transform: 'scale(1.1)'
});

const imageHoverOrFocus = css({
  ":hover": imageHoverStyle
});

export default function HeaderMenu() {
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
        href="https://github.com/ndlib/presqt-ui/issues/new"
        target="_blank"
        rel="noopener noreferrer"
      >
        Submit Feedback
      </a>
    </div>
  );
}
