import { handleActions, combineActions } from 'redux-actions';

import { actionCreators } from './actionCreators';

const initialState = {
  source: null,
  sourceToken: null,
  sourceResources: [],
  target: null,
  targetToken: null,
  targets: []
};

export default handleActions(
  {
    // Targets
    [actionCreators.targets.switchSource]: (state, action) => ({
      ...state,
      source: action.payload.sourceTarget,
      sourceToken: action.payload.sourceTargetToken
    }),
    [actionCreators.targets.loadSuccess]: (state, action) => ({
      ...state,
      targets: action.payload
    }),
    // Resources
    [actionCreators.resources.loadSuccess]: (state, action) => {
      /**
       * Augment a `possibleParent` object with it's children
       * in `unsortedChildren`.
       *
       * @param {Array} unsortedChildren
       * @param {Object} possibleParent
       */
      function findUnsortedChildren(unsortedChildren, possibleParent) {
        unsortedChildren.forEach((possibleChild, index) => {
          if (possibleChild.container === possibleParent.id) {
            if (possibleChild.kind === 'container') {
              possibleChild.open = false;
            }

            possibleParent.children
              ? possibleParent.children.push(possibleChild)
              : (possibleParent.children = [possibleChild]);

            possibleParent.count = possibleParent.children.length;
            const addedObj = unsortedChildren.splice(index, 1);
            findUnsortedChildren(unsortedChildren, addedObj[0]);
          }
        });
      }

      /**
       * Attempt to find a resource's parent, and if found, augment the parent
       * resource's `children` array with `child`.
       *
       * @param {Array} possibleParents
       * @param {Object} child
       */
      function associateWithParentResource(possibleParents, child) {
        let found = false;

        possibleParents.forEach(possibleParent => {
          if (possibleParent.id === child.container) {
            found = true;

            if (child.kind === 'container') {
              child.open = false;
            }

            if (possibleParent.children) {
              possibleParent.children.push(child);
            } else {
              possibleParent.children = [child];
            }

            possibleParent.count = possibleParent.children.length;
            return true;
          } else if (possibleParent.children)
            // Invoke Recursion
            found = associateWithParentResource(possibleParent.children, child);
        });

        return found;
      }

      const resourceHierarchy = action.payload.reduce(
        (initial, resource, index, original) => {
          if (resource.container === null) {
            /* Root Level Containers */

            // Check if there is anything already in the
            // unsorted array that should be attached
            // to this container.
            findUnsortedChildren(initial.unsorted, resource);

            resource.open = false;

            // Push onto the hierarchy object
            initial.sorted.push(resource);
          } else {
            const parentFound = associateWithParentResource(
              initial.sorted,
              resource
            );
            if (parentFound) {
              findUnsortedChildren(initial.unsorted, resource);
            } else {
              // Add the resource to the unsorted array
              // where it will be considered in each future
              // iteration of the loop.
              initial.unsorted.push(resource);
            }
          }
          return index < original.length - 1 ? initial : initial.sorted;
        },
        { sorted: [], unsorted: [] }
      );

      return {
        ...state,
        sourceResources: resourceHierarchy
      };
    },
    // Open/Close Container Resources in UX
    [combineActions(
      actionCreators.resources.openContainer,
      actionCreators.resources.closeContainer
    )]: (state, action) => {
      const searchForResourceInArray = (
        desiredContainer,
        openContainer,
        possibleMatches
      ) => {
        const updatedNode = possibleMatches;

        if (updatedNode.id === desiredContainer.id) {
          return {
            ...updatedNode,
            open: openContainer
          };
        } else if (updatedNode.children) {
          // Somehow we need to consider each of the children...
          const updatedChildren = updatedNode.children.map(childNode =>
            searchForResourceInArray(desiredContainer, openContainer, childNode)
          );
          updatedNode.children = updatedChildren;
        }

        return updatedNode;
      };

      const updatedSourceResources = state.sourceResources.map(topLevelNode => {
        return searchForResourceInArray(
          action.payload.container,
          action.payload.open,
          topLevelNode
        );
      });

      return {
        ...state,
        sourceResources: updatedSourceResources
      };
    }
  },

  initialState
);
