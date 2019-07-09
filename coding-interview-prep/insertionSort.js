// Time Complexity: O(n*2)

// Auxiliary Space: O(1)

// Boundary Cases: Insertion sort takes maximum time to sort if elements are sorted in reverse order. And it takes minimum time (Order of n) when elements are already sorted.

// Uses: Insertion sort is used when number of elements is small. It can also be useful when input array is almost sorted, only few elements are misplaced in complete big array.

const insertionSort = arr => {
    // no need to select first element here
    // as we need to compare the element with all the elements
    // on the left side of the element
    // For the zeroth index element there isn't any element on the left side
    for (let i = 1; i < arr.length; i++) {
        for (let j = 0; j < i; j++) {
            if (arr[j] > arr[i]) {
                let temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
            }
        }
    }

    return arr;
}

// test array:
console.log(insertionSort([1, 4, 9, 2, 8]));