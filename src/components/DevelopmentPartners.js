/** @jsx jsx */
import { jsx } from '@emotion/core';

import developmentPartners from '../images/headers/developmentPartners.png';

export default function DevelopmentPartners() {
  return (
    <div
      css={{
        gridArea: 'developmentPartners'
      }}
    >
      <img
        src={developmentPartners}
        alt="Available Connections"
        css={{ paddingBottom: 10 }}
      />
      <div
        css={{
          display: 'flex',
          flexDirection: 'row',
          paddingTop: 5
        }}
      >
        <img
          src={require('../images/icons/notreDameAcademicMark.png')}
          alt="Notre Dame Academic Mark"
          css={{ paddingRight: 25 }}
        />
        <img src={require('../images/icons/IMLS.png')} alt="IMLS Logo" />
      </div>
    </div>
  );
};
