const telephoneCheck = str => {
  // Regex explained
  // ^  Looks for the starting string
  // (1\s?)? - matches if string is "1 " or "1" [OPTIONAL]
  // ((\(\d{3}\))|\d{3}) - matches if string is "(999)" or "999"
  // (-|\s)? - matches if string is "-" or " " [OPTIONAL]
  // \d{4}$ - matches if ending string is "9999"
  const regex = /^(1\s?)?((\(\d{3}\))|\d{3})(-|\s)?\d{3}(-|\s)?\d{4}$/;
  return regex.test(str)
};

telephoneCheck("1 456 789 4444");
