// non efficient approach, as iterating over no that were not unique in the second filter function
const diffArray = (a, b) => {
  const diff = a.filter(e => !b.includes(e));
  return diff.concat(b.filter(e => !a.includes(e)))
};
diffArray([1, 2, 3, 5], [1, 2, 3, 4, 5]);

// efficient approach

const diffArray = (a, b) => {
  const len = Math.max(a.length, b.length);
  const diff = [];

  for(let i = 0; i < len; i++) {
    const aElem = a[i];
    const bElem = b[i];
   
    if(aElem && !b.includes(aElem)) { 
      diff.push(aElem);
    }

    if(bElem && !a.includes(bElem)) { 
      diff.push(bElem);
    }
  }

  return diff;
};
diffArray([1, 2, 3, 5], [1, 2, 3, 4, 5]);
