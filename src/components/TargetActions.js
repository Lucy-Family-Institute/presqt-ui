/** @jsx jsx */
import { jsx } from '@emotion/core';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import textStyles from '../styles/text';
import ActionButton from './widgets/ActionButton';

const mapStateToProps = state => {
  return {
    selectedSourceResource: state.resources.selectedInSource
  };
};

const mapDispatchtoProps = (dispatch, ownProps) => {
  return {
    // saveToken: (targetID, token) =>
    //   dispatch(actionCreators.authorization.saveToken(targetID, token)),
    // switchSourceTarget: (sourceTarget, sourceTargetToken) => {
    //   dispatch(
    //     actionCreators.targets.switchSource(sourceTarget, sourceTargetToken)
    //   );
    // },
    // onComponentMount: () => dispatch(actionCreators.targets.load()),
    dispatch
  };
};

const TargetActions = props => {
  const { selectedSourceResource } = props;
  console.log(selectedSourceResource);

  return (
    <div
      css={{
        gridArea: 'targetActions',
        borderLeftColor: '#979797',
        borderLeftWidth: 1,
        borderLeftStyle: 'solid',
        paddingLeft: 25
      }}
    >
      <span
        css={[
          {
            display: 'flex',
            flexDirection: 'row',
            minHeight: 50,
            alignItems: 'center'
          },
          textStyles.largeHeader
        ]}
      >
        Available Actions
      </span>
      <div css={{ display: 'flex', flexDirection: 'row', marginTop: 10 }}>
        {selectedSourceResource &&
          selectedSourceResource.links.map(link => (
            <ActionButton key={link.name} text={link.name} />
          ))}
      </div>
    </div>
  );
};

TargetActions.propTypes = {};

export default connect(
  mapStateToProps,
  mapDispatchtoProps
)(TargetActions);
