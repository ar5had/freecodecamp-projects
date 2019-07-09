const isAnagram = (s1, s2) => {
    if (s1.length === s2.length) {
        for (let i of s1) {
            const index = s2.indexOf(i);
            // if letter ${i} wasn't found in s2
            if (index === -1) {
                return false;
            }
            s2 = s2.slice(0, index) + s2.slice(index + 1);
        }

        if (s2 === '') {
            return true;
        }
    }

    return false;
};

console.log(isAnagram("abc", "cab"));