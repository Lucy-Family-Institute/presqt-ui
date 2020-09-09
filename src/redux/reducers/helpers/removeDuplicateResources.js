export default function removeDuplicateResources(array1, array2) {
  let newArray1 = [...array1];
  let newArray2 = [...array2];
  // Join the two arrays together
  var newArray = newArray1.concat(newArray2);

  // Make sure all entries are unique
  const uniqueArray = newArray.filter(
    (resource, index) =>
      index === newArray.findIndex((obj) => obj["id"] === resource["id"])
  );

  return uniqueArray;
}
