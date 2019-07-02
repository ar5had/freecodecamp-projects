
const steamrollArray =
  arr => 
    arr.reduce(
      (t, e) => Array.isArray(e) ? t.concat(steamrollArray(e)): t.concat(e),
      []
    );

console.log(steamrollArray([1,[3],[[1],3]]))

// Take 2

const flattenArray = (elem, memoArr = []) => {
  // Base case - if elem is not an array then push it on to the memoized array
  if(!Array.isArray(elem)) {
    memoArr.push(elem);
  } else {
    elem.forEach(subElem => {
			flattenArray(subElem, memoArr)
		});
  }
	
	return memoArr;
}

const steamrollArray = arr => {
  let newArr = [];

  arr.forEach(elem => {
    if(Array.isArray(elem)) {
      newArr = [...newArr, ...flattenArray(elem)];
    } else {
      newArr.push(elem);
    }
  });

  return newArr;
};

const results = steamrollArray([1, [2], [3, 5]]);
console.log(JSON.stringify(results));
