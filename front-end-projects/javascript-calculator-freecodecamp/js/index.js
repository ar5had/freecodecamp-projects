$(document).ready(function(){
  var nos = [];
  var flag = false;
  var operators = [];
  var result = 0;
  var disp = $(".display");
  var operatorButtons = $(".btnOperator");
  var numberButtons = $(".btnNumber");
  var acButton = $(".btnAc");
  var equalButton = $(".btnEqual");
  var normalButtons = $(".btnN");
  var exp = [];
  var no = "";
  var ans = null;
  var precedence = ['*','/','%','+','-'];
  var flag2 = false;
  var count = 0;

  numberButtons.on("click",function(){
    if(flag){
      updateScreen(exp);
      flag = false;
    }
    var btn = $(this);
    no += (btn.text());
    exp[count] = no;
    console.log(no, count, exp);
    updateScreen(disp.val() + btn.text());
    flag2 = true;
  });

  operatorButtons.click(function(){
    console.log("before entering into operatorButton",count);
    if(flag){
      updateScreen(exp);
      flag = false;
    }
    if(flag2){
      count = count +2;
      flag2 = false;
    }
    else
      count++;
    console.log("after entering  ount is",count);
    no = "";
    var txt = $(this).text() === 'MOD' ? '%' : ($(this).text() === 'ANS' ? ans : $(this).text());
    updateExp(txt);
    updateScreen(disp.val() + $(this).text());
  });

  acButton.on("click",function(){
    updateScreen("");
    no = "";
    count = 0;
    exp = [];
    flag2 = false;
  });

  equalButton.click(function(){
    if(exp.length === 1)
      return;
    no = "";
    for(var i = 0; i < precedence.length; i++){
      while(exp.indexOf(precedence[i]) >= 0){
        var pos = exp.indexOf(precedence[i]);
        if(pos === 0){
          if(precedence[i] === '+'){
            exp.splice(0,1);
            console.log(exp);
            continue;
          }
          else if(precedence[i] === '-'){
            console.log(exp.splice(0,1) );
            exp[0] = parseInt(exp[0]) * (-1);
            console.log(exp);
            continue;
          }
          else if(precedence[i] === '*' || precedence[i] === '/'){
            console.log("You did something wrong! Reset using AC button.");
            return;
          }
      }
        var lhs = exp[pos-1]?parseFloat(exp[pos-1]):NaN;
        var rhs = exp[pos+1]?parseFloat(exp[pos+1]):NaN;
        if(!lhs || !rhs){
          return -1;
        }
        console.log("ps lhs rhs",pos,lhs,rhs);
        switch(precedence[i]){
          case '/':
            var result = lhs/rhs;
            break;
          case '*':
            var result = lhs*rhs;
            break;
          case '+':
            var result = lhs+rhs;
            break;
          case '-':
            var result = lhs-rhs;
            break;
          case '%':
            var result = lhs % rhs;
        }

        console.log("before exp is ",exp);
        exp.splice(pos-1,3,String(result));
        console.log("final exp is ",exp);
      }
      updateScreen(exp.join(""));
    }
    ans = exp[0];
    flag = true;
    count = 0;
    flag2 = false;
    exp = [];
  });

  function updateScreen(str){
    disp.val(str);
  }

  function updateExp(str){
    exp.push(str);
    console.log("exp is ",exp);
  }

  function clrscr(){
    disp.val("");
  }
});
