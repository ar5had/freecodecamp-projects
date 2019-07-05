// declarative approach without any loops and recursion
const getSubsets = arr => {
    return arr.reduce((subsets, elem) => {
        return subsets.concat(subsets.map(s => [elem, ...s]));
    }, [[]])
};

// using loop
const getSubsets = str => {
    // it is important to have an empty string/array in start
    // it makes it very easy to add new subset
    let subsets = [''];
    str.split``.forEach(char => {
        let i = 0;
        let oldSubsetsLength = subsets.length;
        while (i < oldSubsetsLength) {
            const subset = subsets[i];
            subsets.push(subset + char);
            i++;
        }
    });

    return subsets;
}

// using loop and without adding an empty string to subsets
const getSubsets = str => {
    let subsets = [];
    str.split``.forEach(char => {
        let i = 0;
        let oldSubsetsLength = subsets.length;
        while (i < oldSubsetsLength) {
            const subset = subsets[i];
            if (subset !== char) {
                subsets.push(subset + char);
            }
            i++;
        }
        // every char is a valid subset
        subsets.push(char);
    });

    return subsets;
}
console.log(getSubsets('abc'));
