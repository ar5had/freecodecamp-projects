

function rot13(str) { // LBH QVQ VG!
  str = str.toUpperCase();
  for(var i = 0; i < str.length; i++){
    if(str.charCodeAt(i) >= 65 && str.charCodeAt(i) <= 90){
      var char = String.fromCharCode((str.charCodeAt(i) -65 + 13) % 26 + 65 );
      console.log(char);
      str = str.substring(0, i) + char + str.substring(i+1);
     }
  }
  return str;
}
// Change the inputs below to test
rot13("SERR PBQR PNZC");
