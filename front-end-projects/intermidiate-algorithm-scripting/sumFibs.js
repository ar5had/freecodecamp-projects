
function sumFibs(num) {
  // for sumFibs(0) sum = 0 and for sumFibs(1) sum = 1 else we will start with sum = 0
  var sum = num === 0 || num === 1 ? num : 0;
  var a = 0, b =1, c;
  while(true){
    c = a + b;
    a = b;
    b = c;
    if( a <= num){
    if(a % 2 !== 0)
      sum += a;
  	}
  	else
      break;
   }
  return sum;
}

sumFibs(4);
