
function translatePigLatin(str) {
  var index = str.search(/a|e|i|o|u/i);
  if(index === 0)
    return str + "way";
  else
    return str.substring(index) + str.substring(0,index) + "ay";
}

translatePigLatin("consonant");
