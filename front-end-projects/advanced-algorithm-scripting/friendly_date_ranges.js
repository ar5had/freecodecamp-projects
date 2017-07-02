
function makeFriendlyDates(arr) {
 var months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
   arr[0] = arr[0].split("-");
   arr[1] = arr[1].split("-");

 var date1 = parseInt(arr[0][2]);
 var date2 = parseInt(arr[1][2]);
 for(var i = 0; i < arr.length; i++){
   switch(parseInt(arr[i][2], 10)){
     case 1:
         arr[i][2] = "1st";
         break;
     case 2:
         arr[i][2] = "2nd";
         break;
     case 3:
         arr[i][2] = "3rd";
         break;
     default :
         arr[i][2] = parseInt(arr[i][2]) +"th";

   }
 }
   console.log(  (parseInt(arr[1][0]) - parseInt(arr[0][0]) === 1)  && (parseInt(arr[1][1]) - parseInt(arr[0][1]) === 0) && (date1 - date2 > 0) );
 if(parseInt(arr[1][0]) - parseInt(arr[0][0]) > 0 &&
    (!( (parseInt(arr[1][0]) - parseInt(arr[0][0]) === 1)  && (parseInt(arr[1][1]) - parseInt(arr[0][1]) <= 0) )) &&
    (!( (parseInt(arr[1][0]) - parseInt(arr[0][0]) === 1)  && (parseInt(arr[1][1]) - parseInt(arr[0][1]) === 0) && (date1 - date2 > 0) ))
   ){

   arr[0] = months[parseInt(arr[0][1]) - 1] + " " +arr[0][2]+ ", " + arr[0][0];
   arr[1] = months[parseInt(arr[1][1]) - 1] + " " +arr[1][2]+ ", " + arr[1][0];

 }
 else if((( (parseInt(arr[1][0]) - parseInt(arr[0][0]) === 1)  && (parseInt(arr[1][1]) - parseInt(arr[0][1]) <= 0) )) &&
    (( (parseInt(arr[1][0]) - parseInt(arr[0][0]) === 1)  && (parseInt(arr[1][1]) - parseInt(arr[0][1]) === 0) && (date1 - date2 > 0) )))
 {


   arr[0] = months[parseInt(arr[0][1]) - 1] + " " + arr[0][2] + (arr[0][0] ? (", "+arr[0][0]) : "");
   arr[1] = months[parseInt(arr[1][1]) - 1] + " " + arr[1][2] ;

 }
 else if(
    (( (parseInt(arr[1][0]) - parseInt(arr[0][0]) === 1)  && (parseInt(arr[1][1]) - parseInt(arr[0][1]) === 0) && (date1 - date2 <= 0) ))){
   arr[0][0] = arr[0][0] === "2016" ? "" : arr[0][0];

   arr[0] = months[parseInt(arr[0][1]) - 1] + " " +arr[0][2]+ ", " + arr[0][0];
   arr[1] = months[parseInt(arr[1][1]) - 1] + " " +arr[1][2]+ ", " + arr[1][0];

 }
 else{
   arr[1][0] = "";
   arr[0][0] = arr[0][0] === "2016" ? "" : arr[0][0];
   if(parseInt(arr[1][1]) - parseInt(arr[0][1]) === 0){
     arr[1][1] = "";
   }


   arr[0] = months[parseInt(arr[0][1]) - 1] + " " + arr[0][2] + (arr[0][0] ? (", "+arr[0][0]) : "");
   if(arr[1][1] === "" && arr[1][0] === "" && date1 === date2)
     arr = [arr[0]];
   else
     arr[1] = (months[parseInt(arr[1][1]) - 1] ? (months[parseInt(arr[1][1]) - 1] + " ") : "") + arr[1][2];


 }

 return arr;
}

console.log( makeFriendlyDates(["2022-09-05", "2023-09-05"]) );
