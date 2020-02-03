/** @jsx jsx */
import { jsx, css } from '@emotion/core';

import './App.css';
import PresQTHeader from './components/PresQTHeader';
import AvailableConnections from './components/AvailableConnections';
import TargetResourceBrowser from './components/TargetResourceBrowser';
import TargetActionDetail from './components/TargetActionDetail';
import TargetActions from './components/TargetActions';
import HeaderMenu from './components/HeaderMenu';
import DevelopmentPartners from './components/DevelopmentPartners';
import HeaderBackground from './components/HeaderBackground';
import SnackBar from "./components/SnackBar";
import UploadModal from "./components/modals/UploadModal";

const styles = {
  app: css({
    display: 'grid',
    minHeight: '75vh',
    paddingBottom: 50,
    gridRowGap: 25,
    gridTemplateRows: '150px 125px 1fr 100px',
    gridTemplateColumns: '450px 150px 1fr',
    gridTemplateAreas: `
        "headerLogo headerMenu headerMenu"
        "targetResources targetActions targetActions"
        "targetResources targetActionDetail targetActionDetail"
        "availableConnections . developmentPartners"
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
      <AvailableConnections />
      <DevelopmentPartners />
      <SnackBar />
      <UploadModal />
    </div>
  );
}

export default App;
