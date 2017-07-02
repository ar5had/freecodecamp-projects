
function convertHTML(str) {
  // &colon;&rpar;
  var htmlChars = str.match(/&|<|>|"|'/gi);
  if(htmlChars){
    for(var i = 0; i < htmlChars.length; i++){
      switch(htmlChars[i]){

        case '"':
          str = str.replace(/"/g,"&quot;");
          break;
        case '&':
          str = str.replace(/&/g,"&amp;");
          break;
        case '<':
          str = str.replace(/</g,"&lt;");
          break;
        case '>':
          str = str.replace(/>/g,"&gt;");
          break;
        default :
          str = str.replace(/'/g,"&apos;");
      }
    }
  }
  return str;
}

convertHTML("Dolce & Gabbana");
