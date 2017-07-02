
function confirmEnding(str, target) {
  if(str.substring(str.length-target.length) === target)
    return true;
  else
    return false;
}

confirmEnding("Bastian", "n");
