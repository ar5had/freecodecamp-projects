
function sym() {
  var helper = arguments[0];
  var symDiff = [];
  for(var i = 1; i <= arguments.length - 1; i++){
    var elem = arguments[i];
    helper = helper.filter(function(a){
      			if(elem.indexOf(a) < 0)
        			return a;
    }).concat(
    	elem.filter(function(a){
      		if(helper.indexOf(a) < 0)
        	return a;
    }) );

  }
  //some redundant elems in helper may be present so now removing them
  for(var pos in helper){
  	if(symDiff.indexOf(helper[pos]) < 0)
      symDiff.push(helper[pos]);

  }
  return symDiff;
}

sym([1, 1, 2, 5], [2, 2, 3, 5], [3, 4, 5, 5]);
