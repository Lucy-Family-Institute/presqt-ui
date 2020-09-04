

export default function removeDuplicateResources(array1, array2) {
    // Join the two arrays together
    var newArray = array1.concat(array2);
    // Make a set of this new array
    var setArray = new Set(newArray);
    // Make the set back into an array
    var finalArray = Array.from(setArray);

    console.log(finalArray);
    return finalArray;
}