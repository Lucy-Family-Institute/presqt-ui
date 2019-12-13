/**
 * Augment a `possibleParent` object with it's children in `unsortedChildren`.
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

/**
 * Sort the target's resources into their proper hierarchy
 **/
export default function buildResourceHierarchy(action) {
  let resourceHierarchy = [];
  if (action.payload.length > 0) {
    resourceHierarchy = action.payload.reduce(
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
  }
  return resourceHierarchy
}