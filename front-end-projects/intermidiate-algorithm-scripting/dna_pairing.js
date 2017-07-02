
function pairElement(str) {
  var newStr= [];
  str = str.toUpperCase();
  for(var i = 0; i < str.length; i++){
    switch(str[i]){

      case 'A':
        newStr[i]=[];
        newStr[i].push(str[i]);
        newStr[i].push('T');
        break;
      case 'T':
        newStr[i]=[];
        newStr[i].push(str[i]);
        newStr[i].push('A');
        break;
      case 'G':
        newStr[i]=[];
        newStr[i].push(str[i]);
        newStr[i].push('C');
        break;
      case 'C':
        newStr[i]=[];
        newStr[i].push(str[i]);
        newStr[i].push('G');
        break;
      default :
        return null;
    }
  }
  return newStr;
}

pairElement("GCG");
