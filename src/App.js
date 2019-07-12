/** @jsx jsx */
import { css } from 'emotion';
import { jsx } from '@emotion/core';

import './App.css';
import PresQTHeader from './components/PresQTHeader';
import AvailableConnections from './components/AvailableConnections';
import TargetResourceBrowser from './components/TargetResourceBrowser';
import TargetActionDetail from './components/TargetActionDetail';
import TargetActions from './components/TargetActions';
import HeaderMenu from './components/HeaderMenu';
import DevelopmentPartners from './components/DevelopmentPartners';

const styles = {
  app: css({
    display: 'grid',
    gridTemplateRows: '200px 125px 1fr 100px',
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
    <div className={styles.app}>
      <PresQTHeader />
      <HeaderMenu />
      <TargetResourceBrowser />
      <TargetActions />
      <TargetActionDetail />
      <AvailableConnections />
      <DevelopmentPartners />
    </div>
  );
}

export default App;
