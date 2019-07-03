const convertToRoman = n => {
  const romanSymBindings = [
    {no: 1000, sym1: 'M'},
    {no: 100, sym1: 'C', sym5: 'D'},
    {no: 10, sym1: 'X', sym5: 'L'},
    {no: 1, sym1: 'I', sym5: 'V'},
  ];

  let romanStr = '';
  let decNo = n;

  romanSymBindings.forEach(({no, sym1, sym5}, i) => {
    const res = parseInt(decNo / no);
    decNo %= no;

    if(no === 1000) {
      romanStr += sym1.repeat(res);
    } else if(res === 4) {
      romanStr += sym1 + sym5;
    } else if(res === 9) {
      romanStr += sym1 + romanSymBindings[i - 1].sym1;      
    } else {
      const showSym5 = (res / 5) >= 1;
      const rem5 = res % 5;
      romanStr += (showSym5 ? sym5 : '') + sym1.repeat(rem5);
    }
  });

  return romanStr;
};

console.log(convertToRoman(9500))
