const symDiff = (a, b) => a.filter(e => !b.includes(e)).concat(b.filter(e => !a.includes(e)));

// efficient symDiff
const effSymDiff = (a, b) => {
    const diff = [];
    for (let i = 0; i < Math.max(a.length, b.length); i++) {
        const aElem = a[i];
        const bElem = b[i];

        if (aElem && !b.includes(aElem)) {
            diff.push(aElem);
        }

        if (bElem && !a.includes(bElem)) {
            diff.push(bElem);
        }
    }
    return diff;
};

const symDiffArr = (...arr) => arr.reduce(symDiff);
