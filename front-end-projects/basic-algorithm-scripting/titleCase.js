
function titleCase(str) {
  str = str.toLowerCase();
  str = str.split(" ");
  for(var word in str)
    str[word] = str[word][0].toUpperCase() + String(str[word]).substring(1);

  str = str.join(" ");
  return str;
}

titleCase("I'm a little tea pot");
