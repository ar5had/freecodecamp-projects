// Time complexity - O(nlogn) worst, avg, and best case
// Space compexity - O(1)
// Stable - yes
// algo paradigm - divide and conquer
// inplace sorting - NO
// Merge sort uses additional storage for sorting the auxiliary array.

// In-place means that the input and output occupy the same memory storage space. There is no
// copying of input to output, and the input ceases to exist unless you have made a backup copy.
// This is a property that often requires an imperative language to express, because pure functional
// languages do no have a notion of storage space or overwriting data.

// Merge Sort is useful for sorting linked lists in O(nLogn) time.In the case of linked lists, the
// case is different mainly due to the difference in memory allocation of arrays and linked lists.
// Unlike arrays, linked list nodes may not be adjacent in memory. Unlike an array, in the linked
// list, we can insert items in the middle in O(1) extra space and O(1) time. Therefore merge
// operation of merge sort can be implemented without extra space for linked lists.

// Quick sort better than mergesort??

// Auxiliary Space : Mergesort uses extra space, quicksort requires little space and exhibits good cache locality. Quick sort is an in-place sorting algorithm. In-place sorting means no additional storage space is needed to perform sorting. Merge sort requires a temporary array to merge the sorted arrays and hence it is not in-place giving Quick sort the advantage of space.
// Worst Cases : The worst case of quicksort O(n2) can be avoided by using randomized quicksort. It can be easily avoided with high probability by choosing the right pivot. Obtaining an average case behavior by choosing right pivot element makes it improvise the performance and becoming as efficient as Merge sort.
// Locality of reference : Quicksort is tail recursive i.e tail optimization can be done. Quicksort in particular exhibits good cache locality and this makes it faster than merge sort in many cases like in virtual memory environment.
// Merge sort is better for large data structures: Mergesort is a stable sort, unlike quicksort and heapsort, and can be easily adapted to operate on linked lists and very large lists stored on slow-to-access media such as disk storage or network attached storage.

const merge = (l, r) => {
    const result = [];

    while (l.length && r.length) {
        if (l[0] <= r[0]) {
            result.push(l.shift());
        } else {
            result.push(r.shift());
        }
    }

    while (l.length) {
        result.push(l.shift());
    }

    while (r.length) {
        result.push(r.shift());
    }

    return result;
};

const mergeSort = arr => {
    if (arr.length < 2) {
        return arr;
    }

    const mid = Math.floor(arr.length / 2);
    const left = arr.slice(0, mid);
    const right = arr.slice(mid);

    return merge(mergeSort(left), mergeSort(right));
};

// test array:
console.log(mergeSort([1, 2, 8, 234, 92]));