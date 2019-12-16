/** @jsx jsx */
import { jsx, css } from "@emotion/core";

import textStyles from "../styles/text";
import { whileStatement } from "@babel/types";

const imageHoverStyle = css({
  fontSize: 17
});

const imageHoverOrFocus = css({
  ":hover,:focus": imageHoverStyle
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
      >
        About PresQT
      </a>
    </div>
  );
}
