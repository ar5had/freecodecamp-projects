
function destroyer(arr) {

  for(var i = 1; i < arguments.length; i++){

    var index = arguments[0].indexOf(arguments[i]);

    while(index >= 0){

      arguments[0].splice(index,1);

      index = arguments[0].indexOf(arguments[i]);

    }

  }

  return arr;
}

destroyer([1, 2, 3, 1, 2, 3], 2, 3);
