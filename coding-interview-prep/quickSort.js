// Worst case tc = O(n**2 or n squared)
// best and avg case = O(nlogn)

// Why MergeSort is preferred over QuickSort for Linked Lists?

// In case of linked lists the case is different mainly due to difference in memory allocation
// of arrays and linked lists. Unlike arrays, linked list nodes may not be adjacent in memory.
// Unlike array, in linked list, we can insert items in the middle in O(1) extra space and O(1) time.
// Therefore merge operation of merge sort can be implemented without extra space for linked lists.

// Why quicksort is considered better than mergesort?

// 1. Auxiliary Space : Mergesort uses extra space, quicksort requires little space and exhibits good cache locality. 
// 2. Worst Cases : The worst case of quicksort O(n2) can be avoided by using randomized quicksort.
//                  It can be easily avoided with high probability by choosing the right pivot.

// 3. Merge sort is better for large data structures: Mergesort is a stable sort, unlike quicksort
// and heapsort, and can be easily adapted to operate on linked lists and very large lists stored on
// slow-to-access media such as disk storage or network attached storage.

const quickSort = arr => {
    if (arr.length === 0) {
        return arr;
    } else {
        const left = [];
        const right = [];
        const pivot = arr[arr.length - 1]

        for (let i = 0; i < arr.length - 1; i++) {
            if (arr[i] < pivot) {
                left.push(arr[i]);
            } else {
                right.push(arr[i]);
            }
        }

        return [...quickSort(left), pivot, ...quickSort(right)];
    }
}
// test array:
console.log(quickSort([5643, 63, 123, 43]));