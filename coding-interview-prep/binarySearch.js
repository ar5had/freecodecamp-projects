// we need sorted array as an input

// recursion

const rBinarySearch = (arr, elem, l = 0, r = null) => {
    r = r === null ? arr.length - 1 : r;
    const m = parseInt((r + l) / 2);
    if (r < l) {
        return -1;
    } else if (arr[m] === elem) {
        return m;
    } else if (arr[m] > elem) {
        return binarySearch(arr, elem, l, m - 1);
    } else {
        return binarySearch(arr, elem, m + 1, r);
    }
};

console.log(rBinarySearch([1, 3, 5, 6, 19, 39], 199))

// loop version
const binarySearch = (arr, elem, l = 0, r) => {
    r = arr.length;
    let i = parseInt((l + r) / 2);
    while (r >= l) {
        const midElem = arr[i];
        console.log(l, r, i);
        if (midElem === elem) {
            return i;
        } else if (midElem > elem) {
            r = i - 1;
        } else {
            l = i + 1;
        }

        i = parseInt((l + r) / 2)
    }

    return -1;
};

console.log(binarySearch([1, 3, 5, 6, 19, 39], 19))