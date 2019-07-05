// Use this method to find mod of a very big number which can't be stored as a number
// e.g., 100**50
const mod_string = (str, b) => {
    // KEY TAKEAWAY: Modulas property
    // (a + b) % c = a % c + b % c
    // 15 % 4 = 10 % 4 + 5 % 4 = 3

    let res = 0;
    str.split``.forEach(e => res = (res * 10 + Number(e)) %  b);
    return res;
};


console.log(mod_string('123', 4));
console.log(mod_string('1234', 4));
