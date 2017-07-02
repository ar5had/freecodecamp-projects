$(document).ready(function(){
  var on = false;
  var start = false;
  var strict = false;
  var score = 1;
  var count = 0;
  var glowButtonClickable = false;
  var clickCount = 0;
  var glowButtons = [], clickedButtons = [];
  var timeout, timeout1, timeout2, timeout3, timeout4;
  
  var audio = document.getElementById("audio");
    
  $(".onOff").click(function(){
    if(!on){
      $('.button').addClass('offButton');
      $(".strict").removeClass("unclickable");
      $(".start").removeClass("unclickable");
      on = true;
      $(this).text("off");
      $(".count").text("Welcome !!!");
      $(".display > h5").css({'padding-top': "0"});
    }
    else{
      clearGame();
      clearTimeout(timeout);
      clearTimeout(timeout1);
      clearTimeout(timeout2);
      clearTimeout(timeout3);
      on = false;
      $(this).text("On");
      $(".display > h5").css({'padding-top': "30rem"});
      $(".count").text("");
      $(".score").text("");
      $(".strict").text("strict");
      strict = false;
      $(".start").text("start");
      start = false;
      $(".strict").addClass("unclickable");
      $(".start").addClass("unclickable");
      pattern = [];
    }
  });
  
  $(".start").click(function(){
    if(on){
      if(!start){
        updateScore();
        $(this).text("Stop");
        $(".strict").addClass("unclickable");
        start = true;
        setTimeout(function(){startGame();},800);
      }
      else{
        glowButtonClickable = false;
        clearGame();
        clearTimeout(timeout);
        clearTimeout(timeout1);
        clearTimeout(timeout2);
        clearTimeout(timeout3);
        clearTimeout(timeout4);
        updateScore();
        $(".strict").removeClass("unclickable");
        $(this).text("Start");
        start = false;
        $(".strict").text("strict");
        strict = false;
      }
    }
  });
  
  $(".strict").click(function(){
    if(!strict && !start && on){
      $(this).text("Easy");
      strict = true;
    }
    else if(strict && !start && on){
      $(this).text("Strict");
      strict = false;
      pattern = [];
    }
  });

  function startGame(){
    glowButtons.push( String((Math.floor(Math.random()* 10 + 1) % 4) + 1 ) );
    if(on && start)
      glow();    
  }

  function glow(){
      var str = ".button" + glowButtons[count];
      audio.play();
      $(str).addClass("glow").delay(800).queue(function(){
        count++;
        $(this).removeClass("glow").dequeue();
        if(count < glowButtons.length){
          timeout1 = setTimeout(function(){
              if(on && start)
                glow();
          },800);
        }
        else{
          count = 0;
          glowButtonClickable = true;   
        }
      });   
  }
  
  $(".button").click(function(){
    if(glowButtonClickable && on && start){
      clickCount++;
      glowOnly((".button"+String($(this).attr('data-pos'))));
      clickedButtons.push($(this).attr('data-pos'));
      var no = String($(this).attr('data-pos'));
      audio.play();
      if(clickedButtons[clickCount-1] !== glowButtons[clickCount-1]){
        mistakeHappened();
        giveAnotherChance();
        return;
      }
      if(clickedButtons.length === glowButtons.length){
        glowButtonClickable = false;
        clickCount = 0;
        clickedButtons = [];
        if(score !== 20){
          timeout4 = setTimeout(function(){
            score++;
            updateScore();
          }, 1300);
          timeout = setTimeout(function(){
            startGame();
          }, 1800);
        }
        else
          showVictory();
      }
    }
  });
  
  function clearGame(){
    glowButtonClickable = false;
    clickCount = 0;
    score = 1;
    count = 0;
    glowButtons = [];
    clickedButtons = [];
    $(".start").text("start");
    $(".button").removeClass('offButton');
    start = false;
    updateScore();
  }
  
  function giveAnotherChance(){
    glowButtonClickable = false;
    clickCount = 0;
    clickedButtons = [];
    if(strict){
      glowButtonClickable = false;
      clickCount = 0;
      score = 1;
      count = 0;
      glowButtons = [];
      clickedButtons = [];
      timeout2 = setTimeout(function(){
      updateScore();
      startGame();
      },1500);
    }
    else{
      timeout2 = setTimeout(function(){
        glow();
      },1800);
    }
  }
  
  function mistakeHappened(){
    $(".count").text("Bad BTN !!!").css({color:"red"});
    $(".score").text("");
    timeout3 = setTimeout(function(){
      $(".count").text("Count : ").css({color:"#EEE"});
      $(".score").text(score);
    },1200);
  }
  
  function updateScore(){
    
    $(".count").text("Count : ").css({color:"#EEE"});
    $(".score").text(score);
    
  }
  
  function showVictory(){
      $(".score").text("");
      $(".count").text("You Win !!!").css({color:"#69b669"});
      setTimeout(function(){clearGame();}, 3000);
  }
  
  function glowOnly(btn){
      $(btn).addClass("glow").delay(800).queue(function(){
        $(this).removeClass("glow").dequeue();
      });
  }
});
