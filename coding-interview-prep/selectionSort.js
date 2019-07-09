// Time Complexity: O(n squared or n*n) as there are two nested loops.

// Auxiliary Space: O(1)
// The good thing about selection sort is it never makes more than O(n) swaps and can be useful when memory write is a costly operation
const selectionSort = arr => {
    for (let i = 0; i < arr.length; i++) {
        let minIndex = i;
        for (let j = i; j < arr.length; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }
        let min = arr[minIndex];
        arr[minIndex] = arr[i];
        arr[i] = min;
    }

    return arr;
};
// test array:
console.log(selectionSort([1, 4, 2, 8, 345, 123, 43, 32, 5643, 63, 123, 43, 2, 55, 1, 234, 92]));