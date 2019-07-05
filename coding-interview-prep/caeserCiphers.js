const rotate = char => {
    const startCharCode = char === char.toUpperCase() ? 'A'.charCodeAt(0) : 'a'.charCodeAt(0);
    const offset = 13;
    
    const rotatedCharCode = startCharCode + (char.charCodeAt(0) - startCharCode + 13) % 26
    return String.fromCharCode(rotatedCharCode);
}

const rot13 = str => str.replace(/[A-Z]/ig, rotate);

console.log(rot13("SERR PBQR PNZC"));