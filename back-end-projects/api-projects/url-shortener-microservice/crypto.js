var characters = "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ";
var base = characters.length; 

function encode(no) {
    var encoded = '';
    while(no) {
        var rem = no % base,
        no = Math.floor(no / base); 
        encoded = characters[rem].toString() + encoded;
    }
    return encoded;
}

function decode(str) {
    var decoded = 0;
    while(str) {
        var charPos = characters.indexOf(str[0]);
        var power = str.length - 1;
        str = str.substring(1);
        decoded += charPos * Math.pow(base, power);
    }
    return decoded;
}

module.exports.encode = encode;
module.exports.decode = decode;