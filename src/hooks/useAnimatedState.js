import { useReducer } from 'react';

const animationReducer = (state, action) => {
  switch (action.type) {
    case 'inTransitionStart':
      return {
        animating: true,
        desiredVisibility: true,
        currentVisibility: false,
        endAnimationCallback: action.callback
      };
    case 'inTransitionEnd':
      return {
        animating: false,
        desiredVisibility: true,
        currentVisibility: true,
        endAnimationCallback: null
      };
    case 'outTransitionStart':
      return {
        animating: true,
        desiredVisibility: false,
        currentVisibility: true,
        endAnimationCallback: action.callback
      };
    case 'outTransitionEnd':
      return {
        animating: false,
        desiredVisibility: false,
        currentVisibility: false
      };
    default:
      throw new Error();
  }
};

const useAnimatedState = () => {
  const [state, dispatch] = useReducer(animationReducer, {
    animating: false,
    desiredVisibility: false,
    currentVisibility: false,
    endAnimationCallback: null
  });

  const transitionIn = (animationEndCallback = null) => {
    dispatch({
      type: 'inTransitionStart',
      callback: animationEndCallback
        ? () => {
            dispatch({ type: 'inTransitionEnd' });
            animationEndCallback();
          }
        : () => dispatch({ type: 'inTransitionEnd' })
    });
  };

  const transitionOut = (animationEndCallback = null) => {
    dispatch({
      type: 'outTransitionStart',
      callback: animationEndCallback
        ? () => {
            dispatch({ type: 'outTransitionEnd' });
            animationEndCallback();
          }
        : () => dispatch({ type: 'outTransitionEnd' })
    });
  };

  return [state, transitionIn, transitionOut];
};

export default useAnimatedState;
