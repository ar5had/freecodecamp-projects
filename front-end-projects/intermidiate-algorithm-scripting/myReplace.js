
function myReplace(str, before, after) {
  after = after.split("");
  var lengthOfLoop = Math.min(after.length, before.length);
  for( var i = 0; i < lengthOfLoop; i++ ){
    if(before[i] === before[i].toUpperCase() )
      after.splice( i,1,after[i].toUpperCase() );
    else
      after.splice( i,1,after[i].toLowerCase() );
  }
  after = after.join("");
  var myRegex = new RegExp(before,"g");
  str = str.replace(myRegex,after);

  return str;
}

myReplace("A quick brown fox jumped over the lazy dog", "jumped", "leaped");
