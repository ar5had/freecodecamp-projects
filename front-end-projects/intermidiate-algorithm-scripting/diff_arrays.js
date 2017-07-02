
function diffArray(arr1, arr2) {
   var arr = arr1.filter(function(elem){
     return ( arr2.indexOf(elem) < 0 );
   });
  //need to check in both arrays because some bugs shows up when elements of only smaller arrays is compared. THINK YOURSELF!
  arr = arr.concat(arr2.filter(function(elem){
     return ( arr1.indexOf(elem) < 0 );}));
  return arr;
}

diffArray([1, 2, 3, 5], [1, 2, 3, 4, 5]);
