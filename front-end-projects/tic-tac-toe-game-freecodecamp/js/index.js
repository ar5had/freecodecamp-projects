$(document).ready(function(){
  var user = "", comp = "";
  var boxes = [];
  var moves = 0;
  var markedBoxes = [];
  var mmarkedBoxes = [];
  var markedBoxesC = [];
  var mBoxes = [];
  var mBoxesC = [];
  var helperBoxes = [];
  var BoxMarked = function(a, b){
    this.row = a;
    this.col =  b;
  }

  var isClickable = true;

  var BoxValue = function(){
          this.bv = {box00:  {pos:"box00", pref: 2, row: 0, col: 0},
            box01:  {pos:"box01", pref: 1, row: 0, col: 1},
            box02:  {pos:"box02", pref: 2, row: 0, col: 2},
            box10:  {pos:"box10", pref: 1, row: 1, col: 0},
            box11:  {pos:"box11", pref: 3, row: 1, col: 1},
            box12:  {pos:"box12", pref: 1, row: 1, col: 2},
            box20:  {pos:"box20", pref: 2, row: 2, col: 0},
            box21:  {pos:"box21", pref: 1, row: 2, col: 1},
            box22:  {pos:"box22", pref: 2, row: 2, col: 2}};
  };

  var boxValues = new BoxValue().bv;

  fetchingBoxes();

  $(".btn").on("click", function(){
    user = $(this).text();
    if(user === 'X')
      comp = "O";
    else
      comp = "X";
    $(".selection").fadeOut(700,function(){
      $('body').css('background','#5DBD86');
      $(".board").hide().removeClass("hidden").fadeIn(1000);
      computerChance();
        moves++;
    });
  });

  $(".lines").click(function(){
    if($(this).children().text() === "" && isClickable){
      moves++;
      $(this).children().removeClass(comp).addClass(user);
      $(this).children().text(user);
      updateBoxValues("box"+$(this).attr('datarow')+$(this).attr('datacol'),$(this).attr('datarow'),$(this).attr('datacol'),user);
      if(gameStatus())
        return;
      if(moves > 2)
       incPreferenceUser();
      computerChance();
      if(gameStatus())
        return;
      moves++;
      if(moves === 9){
        $("#status").text("Game draw!");
        resetGame();
        return;
      }
    }
  });

  function gameStatus(){
    var winner = checkWin();
    if(winner === user){
      $("#status").text("You win!");
      resetGame();
      return true;
    }
    else if(winner === comp){
      $("#status").text("You loose!");
      resetGame();
      return true;
    }

  }

  function checkWin(){
    //for rows
    for(var i = 0; i < 3; i++){
        var elem = $(".board").find("div[datarow ="+i+"]");
        // empty blocks are equal to each other but NaN is not equal to itself

        var c = $(elem[2]).children().text() || NaN;
        var a = $(elem[0]).children().text() || NaN;
        var b = $(elem[1]).children().text() || NaN;
        if(a === b  && b === c)
          return a;
    }
    //for columns
    for(var i = 0; i < 3; i++){
        var elem = $(".board").find("div[datacol ="+i+"]");
        // empty blocks are equal to each other but NaN is not equal to itself

        var c = $(elem[2]).children().text() || NaN;
        var a = $(elem[0]).children().text() || NaN;
        var b = $(elem[1]).children().text() || NaN;
        if(a === b  && b === c)
          return a;
    }
    //for leftDiagonal
    {

        // empty blocks are equal to each other but NaN is not equal to itself

        var c = $(".board").find("div[datarow =0][datacol = 0]").children().text() || NaN;
        var a = $(".board").find("div[datarow =1][datacol = 1]").children().text() || NaN;
        var b = $(".board").find("div[datarow =2][datacol = 2]").children().text() || NaN;

        if(a === b  && b === c)
          return a;
    }
    //for rightDiagonal
    {

        // empty blocks are equal to each other but NaN is not equal to itself

        var c = $(".board").find("div[datarow =2][datacol = 0]").children().text() || NaN;
        var a = $(".board").find("div[datarow =1][datacol = 1]").children().text() || NaN;
        var b = $(".board").find("div[datarow =0][datacol = 2]").children().text() || NaN;

        if(a === b  && b === c)
          return a;
    }

  }//ends checkWin

  function computerChance(){
    var maxpos = null;
    var max = -3;
    var row,col;
    for(var elem in boxValues){
      if(boxValues[elem].pref > max){
        maxpos = boxValues[elem].pos;
        row = boxValues[elem].row;
        col = boxValues[elem].col;
        max = boxValues[elem].pref;
      }
    }

    updateBoxValues(maxpos, row, col, comp);
    $("."+maxpos).children().removeClass(user).addClass(comp);
    $("."+maxpos).children().text(comp);
  }

  function updateBoxValues(str, row, col, player){
    boxValues[str].pref = -1;
    if(player === user)
      markedBoxes.push(new BoxMarked(parseInt(row), parseInt(col) ));

  else {
      markedBoxesC.push(new BoxMarked(parseInt(row), parseInt(col) ));
    }
  }

  function showPreferences(){
    var str = "box";
    for(var elem in boxValues){
      console.log(elem,boxValues[elem].pref);
    }
  }

  function fetchingBoxes(){
    for(var i = 0; i < 3; i++){
      for(var j = 0; j < 3 ; j++){
        var pos = String(i) + String(j);
        boxes.push($("#box"+pos));
      }
    }
  }

  function resetGame(){
    isClickable = false;
    markedBoxes = [];
    moves = 0;
    setTimeout(function(){
      boxValues = new BoxValue().bv;
      $("#status").text("");
      for(var elem in boxes){
        boxes[elem].children().text("");
      }
      computerChance();
        moves++;
      isClickable = true;

    }, 1500);
  }



  function incPreferenceUser(){
    if(markedBoxes.length < 2)
      return;

      console.log(moves,"moves and i am in incPreferenceUser");
            if(markedBoxes[0].row === markedBoxes[1].row){
               var col = [1,2,0];
               col = col.filter(function(a){
                 if(a !== markedBoxes[0].col && a !== markedBoxes[1].col)
                   return true;
               });
               var row = markedBoxes[0].row;
               boxValues["box"+row+col[0]].pref = boxValues["box"+row+col[0]].pref === -1 ? -1 : 5;
             }
             else if(markedBoxes[0].col === markedBoxes[1].col){
               var row = [1,2,0];
               row = row.filter(function(a){

                 if(a !== markedBoxes[0].row && a !== markedBoxes[1].row)
                   return true;
               });
               var col = markedBoxes[0].col;
               console.log("inc pref is for ",row[0],col);
               boxValues["box"+row[0]+col].pref = boxValues["box"+row[0]+col].pref === -1 ? -1 : 5;
             }

             else if((markedBoxes[0].col + markedBoxes[0].row === 2) && (markedBoxes[1].col + markedBoxes[1].row === 2)){
               var row = [1,2,0];
               var col = [0,1,2];
               row = row.filter(function(a){

                 if(a !== markedBoxes[0].row && a !== markedBoxes[1].row)
                   return true;
               });
               col = col.filter(function(a){

                 if(a !== markedBoxes[0].col && a !== markedBoxes[1].col)
                   return true;
               });
               boxValues["box"+row[0]+col[0]].pref = boxValues["box"+row[0]+col[0]].pref === -1 ? -1 : 5;
             }

             else if((markedBoxes[0].col === markedBoxes[0].row) && (markedBoxes[1].col === markedBoxes[1].row)){
               var row = [1,2,0];
               var col = [0,1,2];
               row = row.filter(function(a){

                 if(a !== markedBoxes[0].row && a !== markedBoxes[1].row)
                   return true;
               });
               boxValues["box"+row[0]+row[0]].pref = boxValues["box"+row[0]+row[0]].pref === -1 ? -1 : 5;
             }



             markedBoxes = [];


   }
/*
   function incPreferenceComp(){

     if(markedBoxesC.length < 2)
        return;
        if(markedBoxesC[0].row === markedBoxesC[1].row){
          var col = [1,2,0];
          col = col.filter(function(a){

            if(a !== markedBoxesC[0].col && a !== markedBoxesC[1].col)
              return true;
          });
          var row = markedBoxesC[0].row;
          boxValues["box"+row+col[0]].pref = boxValues["box"+row+col[0]].pref === -1 ? -1 : 5;
        }
        else if(markedBoxesC[0].col === markedBoxesC[1].col){
          var row = [1,2,0];
          row = row.filter(function(a){

            if(a !== markedBoxesC[0].row && a !== markedBoxesC[1].row)
              return true;
          });
          var col = markedBoxesC[0].col;
          boxValues["box"+row[0]+col].pref = boxValues["box"+row[0]+col].pref === -1 ? -1 : 5;
        }

        else if((markedBoxesC[0].col + markedBoxesC[0].row === 2) && (markedBoxesC[1].col + markedBoxesC[1].row === 2)){
          var row = [1,2,0];
          var col = [0,1,2];
          row = row.filter(function(a){

            if(a !== markedBoxesC[0].row && a !== markedBoxesC[1].row)
              return true;
          });
          col = col.filter(function(a){

            if(a !== markedBoxesC[0].col && a !== markedBoxesC[1].col)
              return true;
          });

          boxValues["box"+row[0]+col[0]].pref = boxValues["box"+row[0]+col[0]].pref === -1 ? -1 : 5;
        }

        else if((markedBoxesC[0].col === markedBoxesC[0].row) && (markedBoxesC[1].col === markedBoxesC[1].row)){
          var row = [1,2,0];
          var col = [0,1,2];
          row = row.filter(function(a){

            if(a !== markedBoxesC[0].row && a !== markedBoxesC[1].row)
              return true;
          });
          boxValues["box"+row[0]+row[0]].pref = boxValues["box"+row[0]+row[0]].pref === -1 ? -1 : 5;
        }
      }
*/

});
