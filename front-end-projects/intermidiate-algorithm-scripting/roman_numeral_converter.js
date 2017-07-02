function convertToRoman(num) {
  var thousands = Math.floor(num / 1000);
  num = num % 1000;
  var fiveHundreds = Math.floor(num / 500);
  num = num % 500;
  var hundreds = Math.floor(num / 100);
  num = num % 100;
  var fifties = Math.floor(num / 50);
  num = num % 50;
  var tens = Math.floor(num /10);
  num = num % 10;
  var fives = Math.floor(num /5);
  num = num %  5;
  var ones = num / 1;
  var romanNumeral = "";

  var romanDigits = [ [thousands, 'M'], [fiveHundreds, 'D'], [hundreds, 'C'], [fifties, 'L'], [tens, 'X'], [fives, 'V'], [ones, 'I'] ];
  // solve special cases
   if(romanDigits[1][0] + romanDigits[2][0] === 5){
      romanDigits[1][0] = 0;
      romanDigits[2][0] = 1;
      romanDigits[2][1] = 'CM';
   }
   if(romanDigits[3][0] + romanDigits[4][0] === 5){
      romanDigits[3][0] = 0;
      romanDigits[4][0] = 1;
      romanDigits[4][1] = 'XC';
   }
   if(romanDigits[3][0] !==1 && romanDigits[4][0] === 4){
      romanDigits[4][0] = 1;
      romanDigits[4][1] = 'XL';
   }
   if(romanDigits[5][0] + romanDigits[6][0] === 5){
      romanDigits[5][0] = 0;
      romanDigits[6][0] = 1;
      romanDigits[6][1] = 'IX';
   }
   if(romanDigits[5][0] !== 1 && romanDigits[6][0] === 4){
      romanDigits[6][0] = 1;
      romanDigits[6][1] = 'IV';
   }

  // feeds romanNumeral
  for(var i = 0; i < romanDigits.length; i++){

      while(romanDigits[i][0] > 0){
        romanNumeral += romanDigits[i][1];
        romanDigits[i][0]--;
      }

  }
  return romanNumeral;
}

convertToRoman(36);
