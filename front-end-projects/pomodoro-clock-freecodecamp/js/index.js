$(document).ready(function(){
  var inc = $(".inc");
  var dec = $(".dec");
  var button = $(".session");
  var animationIcon = $(".circ");
  var stime = "", btime = "";
  var reset = $(".glyphicon-refresh");
  var clicked = false;
  var timer, stimeout, btimeout;
  inc.on("click",function(){
    var elem = $(this).prev();
    var value = parseInt(elem.text());
    value = Math.min(99, value+1);
    elem.text(value);
    if(elem.hasClass("sl") && !clicked){
      $("#sesTimer").text(value+" min");
    }
  });

  dec.on("click",function(){
    var elem = $(this).next();
    var value = parseInt(elem.text());
    value = Math.max(0, value-1);
    elem.text(value);
    if(elem.hasClass("sl") && !clicked){
      $("#sesTimer").text(value+" min");
    }
  });

  function startTimer(time,isLast){
      update(time);
      timer = setInterval(function() {
        time--;
        update(time);
        if(time <= 0){
          clearInterval(timer);
          if(!isLast){
            $('.stat').text("Break");
            startTimer(btime,true);
          }
          else{
            $(".glyphicon-refresh").click();
          }
        }
      }, 1000);

  }

  function update(time){

    var min = Math.floor(time / 60);
    var sec = (time % 60) < 10 ? "0" + (time % 60): (time % 60);
    var str = min+":"+sec;
    $("#sesTimer").text(str);
  }

  $(".session").click(function(){

    if(!clicked){
      stime = parseInt($(".sl").text()) * 60;
      btime = parseInt($(".bl").text()) * 60;
      clicked = true;
      startTimer(stime,false);

    }
  });

 $(".glyphicon-refresh").click(function(){
   clearInterval(timer);
   clearTimeout(stimeout);
   clearTimeout(btimeout);
   $(".stat").text("Session");
   $("#sesTimer").text($(".sl").text() +" min");
   clicked = false;
 });


});
