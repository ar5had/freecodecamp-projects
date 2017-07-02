
function addTogether() {
  var length = arguments.length;

  if(length === 2){
    if(arguments[0] !== null && typeof arguments[0] === "number" && arguments[1] !== null && typeof arguments[1] === "number")
      return arguments[0]+arguments[1];
    else
      return undefined;
    }
  else{
    if(arguments[0] !== null && typeof arguments[0] === "number" ){
      var b = arguments[0];
      return function(a){
        if(arguments[0] !== null && typeof arguments[0] === "number")
          return b + a;
        else
          return undefined;
      };
    }
    else
      return undefined;

  }
}

addTogether(2, 3);
