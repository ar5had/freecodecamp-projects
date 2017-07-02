
function factorialize(num) {
  var factorial = 1;
  while(num >= 1){
    factorial *= num;
    num--;
  }
  return factorial;
}

factorialize(5);
