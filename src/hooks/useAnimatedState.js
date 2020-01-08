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

/**
 * A custom hook used to manage in/out transitions 
 * for components.
 */
export default function useAnimatedState() {
  const [state, dispatch] = useReducer(animationReducer, {
    animating: false,
    desiredVisibility: false,
    currentVisibility: false,
    endAnimationCallback: null
  });

  /**
   * Invoking this function attribute will update the component's 
   * state to indicate that it is currently animating in.
   * 
   * Additionally, it sets the `endAnimationCallback` state attribute
   * which should generally be used by the `onAnimationEnd` event
   * handler to carry out necessary actions after the component 
   * has finished transitioning in.
   * 
   * If the user does not specify a function for `endAnimationCallback`
   * when invoking this function attribute, no custom actions will
   * take place.
   * 
   * @param {Function} endAnimationCallback 
   */
  const transitionIn = (endAnimationCallback = null) => {
    dispatch({
      type: 'inTransitionStart',
      callback: endAnimationCallback
        ? () => {
            dispatch({ type: 'inTransitionEnd' });
            endAnimationCallback();
          }
        : () => dispatch({ type: 'inTransitionEnd' })
    });
  };

  /**
   * Invoking this function attribute will update the component's 
   * state to indicate that it is currently animating out.
   * 
   * Additionally, it sets the `endAnimationCallback` state attribute
   * which should generally be used by the `onAnimationEnd` event
   * handler to carry out necessary actions after the component 
   * has finished transitioning out.
   * 
   * If the user does not specify a function for `endAnimationCallback`
   * when invoking this function attribute, no custom actions will
   * take place.
   * 
   * @param {Function} endAnimationCallback 
   */
  const transitionOut = (endAnimationCallback = null) => {
    dispatch({
      type: 'outTransitionStart',
      callback: endAnimationCallback
        ? () => {
            dispatch({ type: 'outTransitionEnd' });
            endAnimationCallback();
          }
        : () => dispatch({ type: 'outTransitionEnd' })
    });
  };

  return [state, transitionIn, transitionOut];
}