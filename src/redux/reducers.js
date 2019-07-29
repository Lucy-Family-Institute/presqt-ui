import { handleActions } from 'redux-actions';

import { actionCreators } from './actionCreators';

const initialState = {
  source: null,
  sourceToken: null,
  sourceResources: [],
  target: null,
  targetToken: null,
  targets: []
};

// export default (state = initialState, { type, payload }) => {
//   switch (type) {
//     case actionCreators.targets.switchSource.toString():
//       return {
//         ...state,
//         source: payload.sourceTarget,
//         sourceToken: payload.sourceTargetToken
//       };

//     case actionCreators.targets.loadSuccess.toString():
//       return { ...state, targets: payload };

//     // Resources
//     case actionCreators.resources.loadSuccess.toString():
//       console.log(payload);
//       return { ...state, sourceResources: payload };

//     default:
//       return state;
//   }
// };

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
      /** StackOverflow Code 
       * 
       * const flat = [
          { id: 'a2', name: 'Item 1', parentId: 'a' },
          { id: 'b2-2-1', name: 'Item 2-2-1', parentId: 'b2-2'},
          { id: 'a1', name: 'Item 1', parentId: 'a' },
          { id: 'a', name: 'Root 1', parentId: null },
          { id: 'b', name: 'Root 2', parentId: null },
          { id: 'c', name: 'Root 3', parentId: null },
          { id: 'b1', name: 'Item 1', parentId: 'b' },
          { id: 'b2', name: 'Item 2', parentId: 'b' },
          { id: 'b2-1', name: 'Item 2-1', parentId: 'b2' },
          { id: 'b2-2', name: 'Item 2-2', parentId: 'b2' },
          { id: 'b3', name: 'Item 3', parentId: 'b' },
          { id: 'c1', name: 'Item 1', parentId: 'c' },
          { id: 'c2', name: 'Item 2', parentId: 'c' }
      ];

      

      

      */

      function checkLeftOvers(leftOvers, possibleParent) {
        leftOvers.forEach((value, index) => {
          if (value.container === possibleParent.id) {
            // delete value.container;

            possibleParent.children
              ? possibleParent.children.push(value)
              : (possibleParent.children = [value]);

            possibleParent.count = possibleParent.children.length;
            const addedObj = leftOvers.splice(index, 1);
            checkLeftOvers(leftOvers, addedObj[0]);
          }
        });
      }

      function findParent(possibleParents, possibleChild) {
        let found = false;

        possibleParents.forEach(possibleParent => {
          if (possibleParent.id === possibleChild.container) {
            found = true;
            // delete possibleChild.container;

            if (possibleParent.children) {
              possibleParent.children.push(possibleChild);
            } else {
              possibleParent.children = [possibleChild];
            }

            // This is probably unnecessary...
            possibleParent.count = possibleParent.children.length;

            return true;
          } else if (possibleParent.children)
            // Invoke Recursion
            found = findParent(possibleParent.children, possibleChild);
        });

        return found;
      }

      const nested = action.payload.reduce(
        (initial, value, index, original) => {
          // If the item has no parent...
          if (value.container === null) {
            // Check if there is anything already in the
            // unsorted array that should be attached
            // to this container.
            if (initial.unsorted.length) {
              checkLeftOvers(initial.unsorted, value);
            }

            // Not sure if these are necessary.
            // delete value.container;
            // value.root = true;

            // Push onto the hierarchy object
            initial.sorted.push(value);
          } else {
            let parentFound = findParent(initial.sorted, value);
            if (parentFound) {
              checkLeftOvers(initial.unsorted, value);
            } else initial.unsorted.push(value);
          }
          return index < original.length - 1 ? initial : initial.sorted;
        },
        { sorted: [], unsorted: [] }
      );

      console.log(nested);

      // const resourceHierarchy = {};

      // // Identify Top Level Containers
      // action.payload
      //   .filter(element => {
      //     return element.kind === 'container' && element.container === null
      //       ? true
      //       : false;
      //   })
      //   .forEach(
      //     container =>
      //       (resourceHierarchy[container.id] = {
      //         members: [],
      //         name: container.title
      //       })
      //   );

      // const remainingContainers = action.payload.filter(element => {
      //   return element.kind === 'container' && element.container !== null;
      // });

      // console.log(remainingContainers.length);
      // Object.keys();
      // remainingContainers.forEach(container => {
      //   // if Object.keys(resourceHierarchy)
      // });

      return {
        ...state,
        sourceResources: action.payload
      };
    }
  },
  initialState
);
