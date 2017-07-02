
function dropElements(arr, func) {
  // Drop them elements.
  var elemStatusInTest = arr.map(func);
  //this will find out the first occurence of test pass
  var index = elemStatusInTest.indexOf(true);
  if(index >= 0)
    return arr.splice(index);
  else
    return [];
}

dropElements([1, 2, 3], function(n) {return n < 3; });
