
function fearNotLetter(str) {
  var newStr = '';
  for(var i = str.charCodeAt(0), j = 0; i <= str.charCodeAt(str.length-1); i++){
    console.log(str[j], String.fromCharCode(i));

    if( str[j] !== String.fromCharCode(i) ){
      newStr += String.fromCharCode(i);
    }
    else{
    	j++;
    }
  }
  if(newStr)
    return newStr;
  else
    return undefined;
}

fearNotLetter("abce");
