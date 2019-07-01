function sumFibs(num) {
  let a = 0;
  let b = 1;
  let sum = 0;
  while (b <= num) {
    const t = a + b;
    if (b % 2 === 1) {
      sum += b;
      console.log(b);
    }
    a = b;
    b = t;
  }
  return sum;
}

console.log(sumFibs(5));
