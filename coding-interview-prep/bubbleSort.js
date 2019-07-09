// Worst and Average Case Time Complexity: O(n*n). Worst case occurs when array is reverse sorted.
// n + (n-1) + (n-2) + (n-3) + ... + 1 times. 
// So it is O(n + (n-1) + (n-2) + (n-3) + ... + 1) = O(n(n+1)/2) = O(n^2)

// Best Case Time Complexity: O(n). Best case occurs when array is already sorted.

// Space Complexity is O(1) as the array is being mutated while being sorted so we
// are not using any extra space.

const bubbleSort = arr => {
    for (let i = 0; i < arr.length; i++) {
        let swapInPass = false;
        for (let j = 0; j < arr.length - i; j++) {
            const n1 = arr[j];
            const n2 = arr[j + 1];

            if (n1 > n2) {
                const temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;

                swapInPass = true;
            }
        }

        // if there wasn't any sway in a pass then that means array is already sorted
        if (!swapInPass) {
            break;
        }
    }

    return arr;
};

// test array:
// [1, 4, 2, 8, 345, 123, 43, 32, 5643, 63, 123, 43, 2, 55, 1, 234, 92]
console.log(bubbleSort([6, 5, 1, 2, 3]));