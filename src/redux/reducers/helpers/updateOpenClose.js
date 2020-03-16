export default function updateOpenClose(openResources, targetResources, action) {
  let newOpenResources = openResources;

  const searchForResourceInArray = (
    desiredContainer,
    openContainer,
    possibleMatches
  ) => {
    const updatedNode = possibleMatches;

    if (updatedNode.id === desiredContainer.id) {
      if (openContainer) {
        newOpenResources.push(desiredContainer.id)
      }
      else{
        newOpenResources = newOpenResources.filter(element => element !== desiredContainer.id)
      }
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

  const updatedSourceResources = targetResources.map(topLevelNode => {
    return searchForResourceInArray(
      action.payload.container,
      action.payload.open,
      topLevelNode
    );
  });

  return [newOpenResources, updatedSourceResources]
}