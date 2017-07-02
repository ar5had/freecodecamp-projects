function range(start, stop){
  if(start > stop){
    start = start + stop;
    stop = start - stop;
    start = start - stop;
  }

  var a = [start], b = start;
  while(b <= stop){
    a.push(b);
    b++;
  }
  return a;
}
function smallestCommons(arr) {
  // Range is not predefined
  arr = range(arr[0], arr[1]);
  var newArr = [];
  for(var i = 2; i <= arr[arr.length-1]; i++){
    while(arr.indexOf(i) >= 0){
      var hasFactor = false;
      for(var elem in arr){
        if(arr[elem] % i === 0){
        arr[elem] = arr[elem] / i ;
        hasFactor = true;
        }
      }
      if(hasFactor)
        newArr.push(i);
    }
  }
  newArr = newArr.reduce(function(a, b){
    return a*b;
  });
  return newArr;
}


smallestCommons([1,5]);
