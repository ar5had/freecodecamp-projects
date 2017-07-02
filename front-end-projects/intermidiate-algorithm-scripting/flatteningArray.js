
function steamrollArray(arr) {
  // I'm a steamroller, baby
  var flattenArray = arr.reduce(function(a,b){
    console.log(a,b);
      if(Array.isArray(b)){
       b = steamrollArray(b);
      }
      return a.concat(b);
  }, []);
  return flattenArray;
}
steamrollArray([1, [2], [3, [[4]]]]);
