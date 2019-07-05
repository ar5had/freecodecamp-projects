const symDiff = (a, b) => a.filter(e => !b.includes(e)).concat(b.filter(e => !a.includes(e)));

// efficient symDiff
const effSymDiff = (arr1, arr2) => {
    let diff = [];
    const len = Math.max(arr1.length, arr2.length);

    for (let i = 0; i < len; i++) {
        const a = arr1[i];
        const b = arr2[i];

        // a can be 0 
        // !diff.includes(a) prevents from pushing duplicates
        if (a !== undefined && !arr2.includes(a) && !diff.includes(a)) {
            diff.push(a);
        }

        if (b !== undefined && !arr1.includes(b) && !diff.includes(b)) {
            diff.push(b);
        }
    }

    return diff;
};
const sym = (...args) => args.reduce(symDiff);

console.log(sym([1, 2, 3, 3], [5, 2, 1, 4]));

const symDiffArr = (...arr) => arr.reduce(symDiff);

symDiffArr([1, 3, 4], [1, 3, 5, 6], [2, 5, 6]); // [4]