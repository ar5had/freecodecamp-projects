
function repeatStringNumTimes(str, num) {
  var newStr = "";
  if(num <= 0)
    return "";
  while(num !== 0){
    newStr += str;
    num--;
  }
  return newStr;
}

repeatStringNumTimes("abc", 3);
