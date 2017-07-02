
function slasher(arr, howMany) {

  arr.splice(0, howMany);// no need to assign back to arr because slice mutates the arr

  return arr;
}

slasher([1, 2, 3], 2);
