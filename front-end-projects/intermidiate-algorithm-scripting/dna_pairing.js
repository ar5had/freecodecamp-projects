const pairElement = 
  (str, pairs = {'A': 'T', 'T': 'A', 'C': 'G', 'G': 'C'}) =>
  str.split``.map(e => [e, pairs[e]])
