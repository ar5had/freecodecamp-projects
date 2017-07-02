$(document).ready(function() {
  getRandomJokes();
  $("#next").on("click",function(){
    getRandomJokes();
  });

});//ends document.ready

function getRandomJokes(){
    $.getJSON("http://api.icndb.com/jokes/random",
           function(data){
    $("#writer").html(data["value"].joke);
    $("#quote").html(data["value"].joke);

    var tweetUrl ="https://twitter.com/intent/tweet?text=" + data["value"].joke;
    $("#tweetAnchor").attr("href",tweetUrl);
    getFunnyImage();
  });

}

function getFunnyImage(){

  $.getJSON("http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=chuck+norris", function(data){
     var newImage = new Image();
     newImage.onload = function() {
        var url = "url('"+ data.data["image_url"]+"') no-repeat";
        $("body").css("background",url);
      };
     newImage.src = data.data["image_url"];
  });

}
