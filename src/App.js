/** @jsx jsx */
import { jsx, css } from '@emotion/core';

import './App.css';
import PresQTHeader from './components/PresQTHeader';
import AvailableConnectionsLeft from './components/left_components/AvailableConnectionsLeft';
import TargetResourceBrowserRight from './components/right_components/TargetResourceBrowserRight';
import TargetResourceBrowserLeft from './components/left_components/TargetResourceBrowserLeft';
import TargetActionDetailLeft from './components/TargetActionDetailLeft';
import TargetActionsLeft from './components/TargetActionsLeft';
import HeaderMenu from './components/HeaderMenu';
import DevelopmentPartners from './components/DevelopmentPartners';
import HeaderBackground from './components/HeaderBackground';
import SnackBar from "./components/SnackBar";
import UploadModal from "./components/modals/UploadModal";
import TokenModal from "./components/modals/TokenModal";
import DownloadModal from "./components/modals/DownloadModal";
import TargetActionsRight from "./components/TargetActionsRight";
import TargetActionDetailRight from "./components/TargetActionDetailRight";
import AvailableConnectionsRight from "./components/right_components/AvailableConnectionsRight";
import {Fragment} from "react";

const styles = {
  app: css({
    display: 'grid',
    minHeight: '75vh',
    paddingBottom: 50,
    gridRowGap: 25,
    gridTemplateRows: '150px 125px 1fr 100px',
    gridTemplateColumns: '1fr 150px 400px 400px 150px 1fr',
    gridTemplateAreas: `
        "headerLogo headerMenu headerMenu headerMenu headerMenu headerMenu"
        "targetResourcesLeft targetActionsLeft targetActionsLeft targetActionsRight targetActionsRight targetResourcesRight"
        "targetResourcesLeft targetActionDetailLeft targetActionDetailLeft targetActionDetailRight targetActionDetailRight targetResourcesRight"
        "availableConnectionsLeft . developmentPartners developmentPartners . availableConnectionsRight"
        `
  })
};

function App() {
  return (
    <Fragment>
      <div css={styles.app}>
        <HeaderBackground />
        <PresQTHeader />
        <HeaderMenu />
        <DevelopmentPartners />

        {/* Left Components */}
        <TargetResourceBrowserLeft />
        <TargetActionsLeft />
        <TargetActionDetailLeft />
        <AvailableConnectionsLeft />

        {/* Right Components */}
        <TargetActionsRight />
        <TargetActionDetailRight />
        <TargetResourceBrowserRight />
        <AvailableConnectionsRight />
      </div>

      {/* Hidden Components */}
      <div id="hiddenComponents">
        <SnackBar />
        <UploadModal />
        <TokenModal />
        <DownloadModal />
      </div>
    </Fragment>

  );
}

export default App;
