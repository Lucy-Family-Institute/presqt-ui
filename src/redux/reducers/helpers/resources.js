/**
 * Augment a `possibleParent` object with it's children in `unsortedChildren`.
 */
function findUnsortedChildren(openLeftResources, unsortedChildren, possibleParent) {
  unsortedChildren.forEach((possibleChild, index) => {
    if (possibleChild.container === possibleParent.id) {
      if (possibleChild.kind === 'container') {
        possibleChild.open = openLeftResources.indexOf(possibleChild.id) > -1;
      }

      possibleParent.children
        ? possibleParent.children.push(possibleChild)
        : (possibleParent.children = [possibleChild]);

      possibleParent.count = possibleParent.children.length;
      const addedObj = unsortedChildren.splice(index, 1);
      findUnsortedChildren(openLeftResources, unsortedChildren, addedObj[0]);
    }
  });
}

/**
 * Attempt to find a resource's parent, and if found, augment the parent
 * resource's `children` array with `child`.
 */
function associateWithParentResource(openLeftResources, possibleParents, child) {
  let found = false;

  possibleParents.forEach(possibleParent => {
    if (possibleParent.id === child.container) {
      found = true;

      if (child.kind === 'container') {
        child.open = openLeftResources.indexOf(child.id) > -1;
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
      found = associateWithParentResource(openLeftResources, possibleParent.children, child);
  });

  return found;
}

/**
 * Sort the target's resources into their proper hierarchy
 **/
export default function buildResourceHierarchy(state, data) {

  let resourceHierarchy = [];
  if (data.length > 0) {
    resourceHierarchy = data.reduce(
      (initial, resource, index, original) => {
        if (state.selectedLeftResource && resource.id === state.selectedLeftResource.id) {
          resource.active = true;
        }

        if (resource.container === null) {
          /* Root Level Containers */

          // Check if there is anything already in the
          // unsorted array that should be attached
          // to this container.
          findUnsortedChildren(state.openLeftResources, initial.unsorted, resource);

          resource.open = state.openLeftResources.indexOf(resource.id) > -1;

          // Push onto the hierarchy object
          initial.sorted.push(resource);
        } else {
          const parentFound = associateWithParentResource(state.openLeftResources, initial.sorted, resource);

          if (parentFound) {
            findUnsortedChildren(state.openLeftResources, initial.unsorted, resource);
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