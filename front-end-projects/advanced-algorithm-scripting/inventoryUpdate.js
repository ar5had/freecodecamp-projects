
function updateInventory(arr1, arr2) {
    // All inventory must be accounted for or you're fired!
    var arr1Elems = arr1.map(function(a){
      return a[1];
    });
    for(var elem = 0; elem < arr2.length; elem++){
      var pos = arr1Elems.indexOf(arr2[elem][1]);
      if(pos < 0){
        arr1.push(arr2[elem]);
      }
      else{
        arr1[pos][0] +=  arr2[elem][0];
      }
    }//inventry updated

    //now sorting
    arr1 = arr1.sort(function(a, b){
      return a[1].localeCompare(b[1]);
    });
    return arr1;
}


// Example inventory lists
var curInv = [
    [21, "Bowling Ball"],
    [2, "Dirty Sock"],
    [1, "Hair Pin"],
    [5, "Microphone"]
];

var newInv = [
    [2, "Hair Pin"],
    [3, "Half-Eaten Apple"],
    [67, "Bowling Ball"],
    [7, "Toothpaste"]
];

updateInventory(curInv, newInv);
