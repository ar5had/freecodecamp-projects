const convertHTML = str => {
  const htmlEntities = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    '\'': '&apos;',    
  };
  let formattedStr = str;

	for(let key of Object.keys(htmlEntities)) {
    formattedStr = formattedStr.replace(new RegExp(`${key}`, 'g'), htmlEntities[key]);    
  }

  return formattedStr;
}

console.log(convertHTML("Dolce & Gabbana"));
