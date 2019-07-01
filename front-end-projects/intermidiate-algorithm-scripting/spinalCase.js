const spinalCase = str => {
  // 1. replaces spaces and underscores with dash
  // 2. remove first letter as it has not to be prefixed with dash if it is a cap
  // 3. adds dash in front of every capital letter
  let spinalStr = str.replace(/\s|_/g, '-')
                     .slice(1)
		     .replace(/-?([A-Z])/g, '-$1');

  // Adding first char in lowerCase + rest of the spinalCased string
  return str[0].toLowerCase() + spinalStr.toLowerCase();
};
