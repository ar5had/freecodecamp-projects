
function mutation(arr) {
  arr[0] = arr[0].toLowerCase();
  arr[1] = arr[1].toLowerCase();
  for(var elem in arr[1]){
 	if(arr[0].indexOf(arr[1][elem]) < 0)
      return false;
  }
  return true;
}

console.log(mutation(["hello", "hey"]) );
