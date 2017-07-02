function sumPrimes(num) {
var prime;
var number = 0;
  if (num > 1){
  for (i = 2; i <= num; i++) {

    prime = true;

    for (j = 2; j <= i/2; j ++){

      if (i % j === 0){
        prime = false;
      }

    }
    if (prime === true){
     number = number + i;
    }
  }
  }
  return number;
}

sumPrimes(10);
