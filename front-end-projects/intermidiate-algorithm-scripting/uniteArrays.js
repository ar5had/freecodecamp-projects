
function uniteUnique(arr) {
  var newArr = [];
  arr = [arr];
  for(var i = 1; i < arguments.length; i++){
    arr.push(arguments[i]);
  }
  arr.forEach(function(elem){

    for(var i = 0; i < elem.length; i++){
      if(newArr.indexOf(elem[i]) < 0)
        newArr.push(elem[i]);
    }
  });

  return newArr;
}

uniteUnique([1, 3, 2], [5, 2, 1, 4], [2, 1]);
