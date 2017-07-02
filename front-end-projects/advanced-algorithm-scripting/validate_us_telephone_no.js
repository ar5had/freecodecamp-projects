
function telephoneCheck(str) {
  // Good luck!
    var check = str.match(/\d/g);

  var noArray= str.split("");
  var len = noArray.length;
  if( (len === 10 || len === 12 || len === 13 || len === 14 || len === 16) && (check.length === 10 || check.length === 11) ){

    if(len === 10)
      return true;

    else if(len === 12){
      if(noArray[3] === '-' && noArray[7] === '-')
        return true;
      else if(noArray[3] === ' ' && noArray[7] === ' ')
        return true;

    }

    else if(len === 13){
      if(noArray[0] === '(' && noArray[4] === ')' && noArray[8] === '-')
        return true;

    }

    else if(len === 14){
      if(noArray[0] === '(' && noArray[4] === ')' && noArray[5] === ' ' && noArray[9] === '-')
        return true;
      else if(noArray[0] === '1' && noArray[1] === ' ' && noArray[5] === ' ' && noArray[9] === ' ')
        return true;
      else if(noArray[0] === '1' && noArray[1] === ' ' && noArray[5] === '-' && noArray[9] === '-')
        return true;
      else if(noArray[0] === '1' && noArray[1] === '(' && noArray[5] === ')' && noArray[9] === '-')
        return true;

    }

    else if(len === 16){
      if(noArray[0] === '1' && noArray[1] === ' ' && noArray[2] === '(' && noArray[6] === ')' &&
        noArray[7] === ' ' && noArray[11] === '-')
        return true;

    }

  }

  return false;
}



telephoneCheck("555-555-5555");
