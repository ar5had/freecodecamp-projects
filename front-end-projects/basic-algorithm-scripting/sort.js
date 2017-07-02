
function getIndexToIns(arr, num) {

  arr.push(num);

  arr.sort(function(a,b){
    if(a < b) return -1;
    else return 1;

  });

  return arr.indexOf(num);
}

getIndexToIns([40, 60], 50);
