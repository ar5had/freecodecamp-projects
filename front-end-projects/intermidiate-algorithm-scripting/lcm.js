const hcf = (a, b) => {
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
  
  // LCM of zero is undefined
  if(min < 1) {
    return console.log("Range should start from positive integer!");
  }
  
  let final_lcm = min;

  for(let i = min + 1; i <= max; i++) {
    final_lcm = final_lcm = lcm(final_lcm, i);
  }

  return final_lcm;
};

smallestCommons([1,5]);
