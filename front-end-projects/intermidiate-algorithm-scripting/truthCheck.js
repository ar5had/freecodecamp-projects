
function truthCheck(collection, pre) {
  // Is everyone being true?
  for(var elem in collection){
    if( !(collection[elem].hasOwnProperty(pre) && Boolean(collection[elem][pre]) ) )
      return false;
  }
  return true;
}

truthCheck([{"user": "Tinky-Winky", "sex": "male"}, {"user": "Dipsy", "sex": "male"}, {"user": "Laa-Laa", "sex": "female"}, {"user": "Po", "sex": "female"}], "sex");
