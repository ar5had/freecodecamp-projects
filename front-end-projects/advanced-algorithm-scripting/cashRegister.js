const checkCashRegister = (price, cash, cid) => {
  const currencyUnit = {
    "PENNY": 0.01,
    "NICKEL": 0.05,
    "DIME": 0.1,
    "QUARTER": 0.25,
    "ONE": 1,
    "FIVE": 5,
    "TEN": 10,
    "TWENTY": 20,
    "ONE HUNDRED": 100,
  };
  let change = [];  
  let status = 'OPEN';
  let changeDue = cash - price;
  let isOpen = false;

  for(let i = cid.length - 1; i >= 0; i--) {
    const [curr, availableCurrAmt] = cid[i];
    const currValue = currencyUnit[curr];

    const availableCurrCount = availableCurrAmt / currValue;
    const neededCurrCount = parseInt(changeDue / currValue);
    let changeGiven;

    if(availableCurrCount >= neededCurrCount) {
      changeGiven = neededCurrCount * currValue;
    } else {
      changeGiven = availableCurrCount * currValue;      
    }

    if((availableCurrAmt - changeGiven) > 0) {
      isOpen = true;
    }

    change.push([curr, changeGiven]);
    changeDue = (changeDue - changeGiven).toFixed(2);
  }


  // multiplying by 100 because we can't compare float values
  // ex - 0.25 === 0 // parseInt(.25) is zero so we need to multiply 100
  if(changeDue * 100 !== 0) {
    status = 'INSUFFICIENT_FUNDS';
    change = [];
  } else if(!isOpen) {
    status = 'CLOSED';
    change = change.reverse();
  } else {
    change = change.filter(e => e[1] !== 0);
  }

  return { status, change };
}

// Example cash-in-drawer array:
// [["PENNY", 1.01],
// ["NICKEL", 2.05],
// ["DIME", 3.1],
// ["QUARTER", 4.25],
// ["ONE", 90],
// ["FIVE", 55],
// ["TEN", 20],
// ["TWENTY", 60],
// ["ONE HUNDRED", 100]]

console.log(JSON.stringify(checkCashRegister(19.5, 20, [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]])));
