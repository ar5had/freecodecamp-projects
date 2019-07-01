const isPrime = num => {
  for(let i = 2; i <= parseInt(num/2); i++) {
    if(num % i === 0) return false;
  }
  return true;
};

const sumPrimes = num => Array(num - 1).fill().map((e, i) => num - i).reduce((t, e) => t + (isPrime(e) ? e : 0), 0)

console.log(sumPrimes(10));
