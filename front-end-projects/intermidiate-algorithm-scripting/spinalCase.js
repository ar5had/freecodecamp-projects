
function spinalCase(str) {
  // "It's such a fine line between stupid, and clever."
  // --David St. Hubbins

  //upperCaseLetters have all the capital letter used in str, will use it later with indexOf
  var index = 0;
  var upperCaseLetters = str.match(/[A-Z]/g);
  //replaces all spaces and underscore with dash
  str = str.replace(/_|\s/g,"-");
  for(var i = 0; i <= upperCaseLetters.length; i++){
    while(str.indexOf(upperCaseLetters[i]) > 0){
      index = str.indexOf(upperCaseLetters[i]);
      str = str.substring(0,index) + "-" + str[index].toLowerCase() + str.substring(index + 1);
     }
  }
  str = str.toLowerCase();
  str = str.replace(/--/g,"-");
  return str;
}

spinalCase('This Is Spinal Tap');
