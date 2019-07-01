const dropElements = (arr, func) => {
  let index;
  for(index in arr) {
    if(func(arr[index])) return arr.slice(index)
  }
  return [];
};

console.log(dropElements([1, 2, 3, 4], function(n) {return n > 5; }));
