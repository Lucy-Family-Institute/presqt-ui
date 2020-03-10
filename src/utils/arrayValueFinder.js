export default function arrayValueFinder(array, value) {
    for (let i = 0; i < array.length; i++) {
        if (array[i] === value) {
            return true;
        }
    }
    return false;
}