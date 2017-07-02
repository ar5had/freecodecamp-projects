
function orbitalPeriod(arr) {
  var GM = 398600.4418;
  var earthRadius = 6367.4447;
  for(var i = 0; i < arr.length; i++){
    var a = earthRadius + arr[i].avgAlt;
    delete arr[i].avgAlt;
    arr[i].orbitalPeriod = Math.round(2 * 3.1415926 * Math.sqrt( a * a * a / GM) );
  }
  return arr;
}

orbitalPeriod([{name : "sputnik", avgAlt : 35873.5553}]);
