
function sumAll(arr) {
  var newArr = [];
  for(var i = Math.min(arr[0], arr[1]); i <= Math.max(arr[0], arr[1]); i++)
    newArr.push(i);
  return newArr.reduce(function(a,b){ return a+b; });
}

sumAll([1, 4]);
