//Note- split, reverse, join methods return modified values so they need to be assigned back to a variable.
function reverseString(str) {
  //splits string into individual chars. ex- "asd khn" -> ['a','s','d',' ','k','h','n']
  var arr = str.split("");
   //reverses string -> ['n','h','k',' ','d','s','a']
  arr = arr.reverse();
  //joins them -> "nhk dsa"
  arr = arr.join("");
  
  return arr;
}

reverseString("hello");

