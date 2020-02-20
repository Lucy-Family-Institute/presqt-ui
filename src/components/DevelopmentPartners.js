/** @jsx jsx */
import { jsx, css } from "@emotion/core";

import developmentPartners from "../images/headers/developmentPartners.png";

const imageHoverStyle = css({
  transform: 'scale(1.1)'
});

const imageHoverOrFocus = css({
  ":hover": imageHoverStyle
});

export default function DevelopmentPartners() {
  return (
    <div
      css={{
        display: "grid",
        gridArea: "developmentPartners",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <img
        src={developmentPartners}
        alt="Available Connections"
        css={{ paddingBottom: 10 }}
      />
      <div
        css={{
          display: "flex",
          flexDirection: "row",
          paddingTop: 5
        }}
      >
        <a href="https://www.nd.edu/" target="_blank" rel="noopener noreferrer" css={imageHoverOrFocus}>
          <img
            src={require("../images/development_partners/notreDameAcademicMark.png")}
            alt="Notre Dame Academic Mark"
            css={{ paddingRight: 25 }}
          />
        </a>
        <a
          href="https://www.imls.gov/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={require("../images/development_partners/IMLS.png")} alt="IMLS Logo" css={imageHoverOrFocus}/>
        </a>
      </div>
    </div>
  );
}
