function myReplace(str, before, after) {
  return str.replace(
    before,
    before[0] === before[0].toUpperCase() ? after[0].toUpperCase() + after.slice(1).toLowerCase() : after.toLowerCase()
  );
}

myReplace("A quick brown fox jumped over the lazy dog", "jumped", "leaped");
