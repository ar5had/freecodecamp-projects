
function truncateString(str, num) {
  if(num < str.length)
  str = num > 3 ? str.substring(0,num-3)+"..." : str.substring(0,num)+"...";

  return str;
}

truncateString("A-tisket a-tasket A green and yellow basket", 11);
