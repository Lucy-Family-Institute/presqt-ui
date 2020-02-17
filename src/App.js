/** @jsx jsx */
import { jsx, css } from '@emotion/core';

import './App.css';
import PresQTHeader from './components/PresQTHeader';
import AvailableConnections from './components/AvailableConnections';
import TargetToots from './components/TargetToots';
import TargetResourceBrowser from './components/TargetResourceBrowser';
import TargetActionDetail from './components/TargetActionDetail';
import TargetActions from './components/TargetActions';
import HeaderMenu from './components/HeaderMenu';
import DevelopmentPartners from './components/DevelopmentPartners';
import HeaderBackground from './components/HeaderBackground';
import SnackBar from "./components/SnackBar";
import UploadModal from "./components/modals/UploadModal";
import TokenModal from "./components/modals/TokenModal";
import DownloadModal from "./components/modals/DownloadModal";

const styles = {
  app: css({
    display: 'grid',
    minHeight: '75vh',
    paddingBottom: 50,
    gridRowGap: 25,
    gridTemplateRows: '150px 125px 1fr 100px',
    gridTemplateColumns: '450px 150px 400px 400px 150px 1fr',
    gridTemplateAreas: `
        "headerLogo headerMenu headerMenu headerMenu headerMenu headerMenu"
        "targetResources targetActions targetActions targetActions targetActions targetToots"
        "targetResources targetActionDetail targetActionDetail targetActionDetail targetActionDetail targetToots"
        "availableConnections . developmentPartners . . ."
        `
  })
};

function App() {
  return (
    <div css={styles.app}>
      <HeaderBackground />
      <PresQTHeader />
      <HeaderMenu />
      <TargetResourceBrowser />
      <TargetActions />
      <TargetActionDetail />
      <TargetToots />
      <AvailableConnections />
      <DevelopmentPartners />

      {/* Hidden Components */}
      <SnackBar />
      <UploadModal />
      <TokenModal />
      <DownloadModal />
    </div>
  );
}

export default App;
