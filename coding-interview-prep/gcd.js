// making pure function for gcd
const gcd = (no1, no2) => {
    let a = Math.abs(no1);
    let b = Math.abs(no2);
    while (b != 0) {
        const rem = a % b;
        a = b;
        b = rem;
    }
    return a;
};

// recursion
const rgcd = (no1, no2) => Math.min(no1, no2) ? rgcd(no2, no1 % no2) : Math.abs(no1);

// gcd of a list of numbers
const gcd_list = arr => {
    let result = arr[0];
    arr.slice(1).forEach(e => {
        result = gcd(result, e);
    });
    return result;
};
