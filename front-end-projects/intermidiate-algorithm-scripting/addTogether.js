const addTogether = (a, b) => {
  if(typeof a !== 'number' || (Boolean(b) && typeof b !== 'number')) {
    return undefined;
  } else if (typeof b === 'number') {
    return a + b;
  } else {
    return (c) => addTogether(c, a);
  }
}
