/** @jsx jsx */
import { jsx } from "@emotion/core";
import developmentPartners from "../images/headers/developmentPartners.png";
import mainStyles from "../styles/main";


export default function DevelopmentPartners() {
  return (
    <div css={{gridArea: "developmentPartners"}} >
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
        <a href="https://www.nd.edu/" target="_blank" rel="noopener noreferrer" css={mainStyles.hoverOrFocusTransform}>
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
          <img src={require("../images/development_partners/IMLS.png")} alt="IMLS Logo" css={mainStyles.hoverOrFocusTransform}/>
        </a>
      </div>
    </div>
  );
}
