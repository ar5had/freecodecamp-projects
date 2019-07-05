const palindrome = str => {
    // replaces all the non-alphanumeric chars
    let alphaStr = str.toLowerCase().replace(/\W|_/g, '');
    return alphaStr === alphaStr.split``.reverse().join``
};

// probably very efficient for long strings
const palindrome_loop = str => {
    // replaces all the non-alphanumeric chars
    let alphaStr = str.toLowerCase().replace(/\W|_/g, '');
    const len = alphaStr.length;

    for(let i = 0; i <= parseInt(len / 2); i++) {
      if(alphaStr[i] !== alphaStr[len - i - 1]) return false;
    }

    return true;
};

palindrome("eye");