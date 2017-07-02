
function bouncer(arr) {
  arr = arr.filter(function(elem){
    if(elem)
      return elem;
  });
  return arr;
}

bouncer([7, "ate", "", false, 9]);
