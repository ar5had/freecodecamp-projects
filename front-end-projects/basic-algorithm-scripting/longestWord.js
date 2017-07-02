

function findLongestWord(str) {
  var largest = null;

  str = str.split(" ");

  for(var word in str){
    // Note null > (any of digit) is always false
    largest = largest > str[word].length ? largest : str[word].length;

  }

  return largest;
}

findLongestWord("The quick brown fox jumped over the lazy dog");
