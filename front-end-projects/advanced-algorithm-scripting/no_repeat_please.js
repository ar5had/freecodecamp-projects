
var usedChars = [], permArr = [];

function permute(input) {
  var i, ch;
  for (i = 0; i < input.length; i++) {
    ch = input.splice(i, 1)[0];
    usedChars.push(ch);
    if (input.length === 0) {
        permArr.push(usedChars.slice());
    }
    permute(input);
    input.splice(i, 0, ch);
    usedChars.pop();
  }
  return permArr;
}

function permAlone(str) {
  str = str.split("");
  permute(str);
  var regTest = /(.)\1/;
  permArr = permArr.filter(function(elem){
  	elem = elem.join("");
    return (!regTest.test(elem));
  });
  return permArr.length;
}

permAlone('zzz');
