
function whereAreYou(collection, source) {
  // What's in a name?
  var arr = [];
  // Only change code below this line
  collection.forEach(function(obj){
    var haveAll = true;
    var keys = Object.keys(source);
    keys.forEach(function(key){
      if(!obj.hasOwnProperty(key) || obj[key] !== source[key]){
       haveAll = false;
      }
    });
    if(haveAll)
      arr.push(obj);
  });

  // Only change code above this line
  return arr;
}

whereAreYou([{ first: "Romeo", last: "Montague" }, { first: "Mercutio", last: null }, { first: "Tybalt", last: "Capulet" }], { last: "Capulet" });
