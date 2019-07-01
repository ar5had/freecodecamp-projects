function whatIsInAName(collection, source) {
  // What's in a name?
  var arr = [];
  // Only change code below this line
  
  collection.forEach(e => {
    const sourceKeys = Object.keys(source);
    const matchFound = sourceKeys.every(key => e[key] === source[key]);
    if(matchFound) arr.push(e);
  })
  // Only change code above this line
  return arr;
}

whatIsInAName([{ first: "Romeo", last: "Montague" }, { first: "Mercutio", last: null }, { first: "Tybalt", last: "Capulet" }], { last: "Capulet" });
