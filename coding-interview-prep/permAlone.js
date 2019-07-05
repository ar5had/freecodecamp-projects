const permute = (str, chosen = '', permutations = []) => {
    if (str === '') {
        permutations.push(chosen);
    } else {
        str.split``.forEach((char, i) => {
            // choose
            const newStr = str.slice(0, i) + str.slice(i + 1);
            chosen += char;
            // explore
            permute(newStr, chosen, permutations);
            // unchoose
            chosen = chosen.slice(0, chosen.length - 1);
        });
    }

    return permutations;
};

const permAlone = str => {
    const regex = /(.)\1/i;
    let permutations = permute(str);

    return permutations.filter(e => !regex.test(e)).length;
}

console.log(permAlone('aab'));