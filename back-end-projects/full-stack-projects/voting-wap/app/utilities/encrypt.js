var characters = "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ";
var base = characters.length; 

function encrypt(no) {
    var encrypt = '';
    while(no) {
        var rem = no % base,
        no = Math.floor(no / base); 
        encrypt = characters[rem].toString() + encrypt;
    }
    return encrypt;
}

module.exports = encrypt;
