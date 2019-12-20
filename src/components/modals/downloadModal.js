/** @jsx jsx */
import { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { jsx, css } from "@emotion/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWindowClose } from "@fortawesome/free-solid-svg-icons";

import textStyles from "../../styles/text";
import { basicFadeIn, basicFadeOut } from "../../styles/animations";
import useAnimatedState from "../../hooks/useAnimatedState";
import { actionCreators } from "../../redux/actionCreators";
import { useDispatch, useSelector } from "react-redux";
import TokenTextField from "../widgets/TokenTextField";
import ModalSubmitButton from "../widgets/ModalSubmitButton";

const styles = {
  darkenBackground: css({
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 1040,
    width: "100%",
    height: "100%",
    backgroundColor: "#000",
    opacity: 0.5
  }),
  modalContainer: css({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "fixed",
    padding: ".5rem",
    top: 0,
    left: 0,
    zIndex: 1050,
    width: "100%",
    height: "100%"
  }),
  modal: css({
    zIndex: 100,
    background: "white",
    position: "relative",
    borderRadius: 10,
    display: "flex",
    flexDirection: "column",
    width: "50%"
  }),
  modalHeader: css({
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flexBasis: 50,
    padding: 20,
    backgroundColor: "rgba(229, 123, 0,1)",
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5
  }),
  button: css({
    backgroundColor: "rgba(0, 76, 168, 1)",
    color: "white",
    border: "none",
    borderRadius: 5
  }),
  disabledButton: css({
    backgroundColor: "rgba(108, 133, 163, 1)",
    color: "white",
    border: "none",
    borderRadius: 5
  }),
  fadeIn: css({
    animationFillMode: "forwards",
    animationName: `${basicFadeIn}`,
    animationDuration: ".5s"
  }),
  fadeOut: css({
    animationFillMode: "forwards",
    animationName: `${basicFadeOut}`,
    animationDuration: ".5s"
  })
};

export default function DownloadModal({ modalActive, toggleModal }) {
  const sourceDownload = useSelector(state => state.resources.sourceDownload);
  const [state, transitionIn, transitionOut] = useAnimatedState(modalActive);
  const [downloadMessage, setDownloadMessage] = useState("");

  useEffect(() => {
    if (modalActive && !state.desiredVisibility && !state.animating) {
      transitionIn();
    }
  }, [modalActive, state.animating, state.desiredVisibility, transitionIn]);

  useEffect(() => {
    setDownloadMessage(sourceDownload);
  }, [sourceDownload]);

  function utf8_to_b64(str) {
    return window.btoa(unescape(encodeURIComponent(str)));
  }

  const DownloadFile = () => {
    console.log(typeof downloadMessage);
    if (downloadMessage === null) {
      return "The download is being processed on the server.";
    } else {
      console.log("Data Length", downloadMessage.length);
      var bytes = new Uint8Array(downloadMessage.length);
      for (var i = 0; i < downloadMessage.length; i++)
        bytes[i] = downloadMessage.charCodeAt(i);
      
      console.log("Byte Length", bytes.length);
      // var bytes = utf8_to_b64(downloadMessage);
      // var downloadZip = base64ToArrayBuffer(downloadMessage);
      // var blob = new Blob([bytes], { type: "application/zip" });
      // console.log("Blob Length", blob.length);
      console.log(downloadMessage);
      return "Download Complete......now what?";
      // return saveAs(downloadMessage, "PresQT_Download.zip");
    }
  };

  return modalActive
    ? ReactDOM.createPortal(
        <div
          css={
            state.currentVisibility || state.desiredVisibility
              ? { display: "initial" }
              : { display: "none" }
          }
        >
          <div
            css={state.desiredVisibility ? styles.fadeIn : styles.fadeOut}
            onAnimationEnd={() => {
              state.endAnimationCallback();
            }}
          >
            <div css={styles.darkenBackground} />
            <div css={styles.modalContainer} aria-modal aria-hidden>
              <div css={styles.modal}>
                <div css={styles.modalHeader}>
                  <span css={textStyles.modalTitle}>Download request!!</span>
                  <div
                    onClick={() =>
                      transitionOut(() => {
                        toggleModal();
                      })
                    }
                  >
                    <FontAwesomeIcon icon={faWindowClose} inverse size="lg" />
                  </div>
                </div>
                <div
                  css={{
                    padding: 20,
                    display: "flex",
                    flexDirection: "column"
                  }}
                >
                  <p css={textStyles.body}>{DownloadFile()}</p>

                  <div
                    css={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      flexBasis: 35
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )
    : null;
}