/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { useSelector } from 'react-redux';

import textStyles from '../styles/text';
import MediumHeader from './widgets/MediumHeader';

export default function TargetActionDetail() {
  const selectedSourceResource = useSelector(
    state => state.resources.selectedInSource
  );

  /**
   * Filter out resource data points that we don't want to
   * display in the detail panel.
   */
  const detailsToRender = resource => {
    return Object.entries(resource)
      .filter(resourceDetail => {
        const [key, value] = resourceDetail;
        const isKeyWanted = ['links', 'open', 'children', 'count'].includes(key)
          ? false
          : true;
        const isValueNotNull = value !== null;

        console.log(key, isKeyWanted, isValueNotNull);

        return isKeyWanted && isValueNotNull;
      })
      .map(resourceDetail => {
        const [key, value] = resourceDetail;
        return [
          key
            .split('_')
            .map(element => element[0].toUpperCase() + element.slice(1))
            .join(' '),
          value
        ];
      });
  };

  const renderDetailItem = item => {
    const [key, value] = item;
    return (
      <div
        css={{ display: 'flex', flexDirection: 'column', paddingBottom: 10 }}
      >
        <span css={[textStyles.body, { fontWeight: 500 }]}>{key}</span>
        {['string', 'number'].includes(typeof value) ? (
          <span css={[textStyles.body, { fontSize: 12 }]}>{value}</span>
        ) : null}
      </div>
    );
  };

  return (
    <div
      css={[
        css({
          gridArea: 'targetActionDetail',
          borderLeftColor: '#C5C5C5',
          borderLeftWidth: 1,
          borderLeftStyle: 'solid',
          paddingLeft: 25
        })
      ]}
    >
      {selectedSourceResource ? (
        <div>
          <MediumHeader text='Resource Details' />
          <div css={{ paddingTop: 10 }}>
            {detailsToRender(selectedSourceResource).map(resourceData =>
              renderDetailItem(resourceData)
            )}
          </div>
        </div>
      ) : (
        `Target Resource Detail Will Go Here`
      )}
    </div>
  );
}
