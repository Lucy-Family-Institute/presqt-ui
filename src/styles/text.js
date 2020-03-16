import { css } from "@emotion/core";
import colors from "../styles/colors";

export default {
  body: css({
    fontSize: 14,
    fontFamily: "Roboto"
  }),
  cubsRed: css({
    color:  colors.cubsRed
  }),
  footerTitle: css({
    fontSize: 24,
    fontFamily: "Raleway",
    fontWeight: 300,
    color: "#4E4E4E"
  }),
  listItem: css({
    fontSize: 14,
    fontFamily: "Roboto"
  }),
  selectedTransferListItem: css({
    fontSize: 14,
    fontFamily: "Roboto",
    color: "#181818"
  }),
  globalNav: css({
    fontSize: 16,
    fontFamily: "Raleway",
    color: "white"
  }),
  largeHeader: css({
    fontSize: 32,
    fontFamily: "Raleway",
    fontWeight: 300,
    color: "#4E4E4E"
  }),
  mediumHeader: css({
    fontSize: 24,
    fontFamily: "Raleway",
    fontWeight: 400,
    color: "#4E4E4E"
  }),
  presqtLogo: css({
    fontSize: 68,
    fontFamily: "Raleway",
    fontWeight: 800,
    color: "white",
    marginBottom: -10
  }),
  presqtLogoSubtext: css({
    fontSize: 14,
    fontFamily: "Raleway",
    fontWeight: 400,
    color: "white"
  }),
  modalTitle: css({
    fontSize: 24,
    fontFamily: "Raleway",
    fontWeight: 800,
    color: "white"
  }),
  buttonText: css({
    fontFamily: "Roboto",
    fontWeight: 500,
    fontSize: 13,
    textTransform: "uppercase"
  }),
  selectedResource: css({
    fontFamily: "Roboto",
    fontWeight: 500,
    fontSize: 14,
    color: colors.presqtBlue
  }),
  transferResource: css({
    fontFamily: "Roboto",
    fontWeight: 500,
    fontSize: 14
  }),
};
