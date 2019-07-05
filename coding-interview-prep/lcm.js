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

const lcm = (a, b) => (a * b) / gcd(a, b);