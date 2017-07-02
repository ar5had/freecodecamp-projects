
function palindrome(str) {

  str = str.toLowerCase();

  // a-z represents aphabets, 0-9 represents digits
  // we want to remove everything that is not digit or alphabet
  // [^a-z0-9] represents everything that is not digit or alphabet
  // "^" in [] acts like a NOT operator for strings in between square brackets.

  str = str.replace(/[^a-z0-9]/g,"");

  for(var i = 0; i <= str.length/2-1; i++){

    if(str[i] !== str[str.length-1-i])
      return false;

  }
  return true;
}



console.log(palindrome("eye"));
