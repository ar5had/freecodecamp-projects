const hcf = (a, b) => {
  if(a === 0) return b;
  if(b === 0) return a;

  let no1 = Math.abs(a);
  let no2 = Math.abs(b);

  while(no2 !== 0) {
    const rem = no1 % no2;
    no1 = no2;
    no2 = rem;
  }

  return no1;
}

const lcm = (a, b) => (a * b) / hcf(a, b);

const smallestCommons = ([min, max]) => {
  if(min > max) {
    [min, max] = [max, min];
  }

  let final_lcm = min;

  for(let i = min + 1; i <= max; i++) {
    final_lcm = final_lcm = lcm(final_lcm, i);
  }

  return final_lcm;
};

smallestCommons([1,5]);
