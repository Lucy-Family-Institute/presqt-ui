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
   *
   * We exclude the following keys: ['links', 'open', 'children', 'count']
   */
  const detailsToRender = resource => {
    return Object.entries(resource)
      .filter(resourceDetail => {
        const [key, value] = resourceDetail;
        const isKeyWanted = ['links', 'open', 'children', 'count'].includes(key)
          ? false
          : true;

        return isKeyWanted;
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
    let renderer;
    if (['string', 'number'].includes(typeof value)) {
      renderer = renderScalarItem;
    } else if (['object'].includes(typeof value)) {
      value !== null ? (renderer = renderObject) : (renderer = renderNull);
    }

    return (
      <div
        css={{ display: 'flex', flexDirection: 'column', paddingBottom: 10 }}
        key={key}
      >
        <span css={[textStyles.body, { fontWeight: 500 }]}>{key}</span>
        {renderer(value)}
      </div>
    );
  };

  const renderScalarItem = value => (
    <span css={[textStyles.body, { fontSize: 12 }]}>{value}</span>
  );

  const renderObject = value => {
    return Object.entries(value).map(resourceDetailElement => {
      const [key, value] = resourceDetailElement;
      console.log(key, value);
      return (
        <div css={{ display: 'flex', flexDirection: 'row' }}>
          <span
            css={[
              textStyles.body,
              { fontSize: 12, paddingLeft: 5, fontWeight: 500 }
            ]}
          >
            {`${key}:\u00a0`}
          </span>
          <span css={[textStyles.body, { fontSize: 12 }]}>{`${value}`}</span>
        </div>
      );
    });
  };

  const renderNull = () => (
    <span css={[textStyles.body, { fontSize: 12 }]}>null</span>
  );

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
      ) : null}
    </div>
  );
}
