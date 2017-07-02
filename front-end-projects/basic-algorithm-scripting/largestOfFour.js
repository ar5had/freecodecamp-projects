
function largestOfFour(arr) {
  var newArr = [];
  for(var elem in arr){
   // It will be better to use another variable to assign the result because RHS is no and LHS is an object i.e., array.
   //arr[elem] = arr[elem].reduce(function(a, b){ return a > b ? a:b;});

    newArr[elem] = arr[elem].reduce(function(a, b){ return a > b ? a:b;});


  }
  return newArr;
}

largestOfFour([[4, 5, 1, 3], [13, 27, 18, 26], [32, 35, 37, 39], [1000, 1001, 857, 1]]);
