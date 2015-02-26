var calc = {
  add: function(n1, n2) {
    return n1 + n2;
  },
  subtract: function(n1, n2) {
    return n1 - n2;
  },
  multiply: function(n1, n2) {
    return n1 * n2;
  },
  divide: function(n1, n2) {
    return n1 / n2;
  },
  makeNegative: function(n1) {
    return n1 * -1;
  },
  percentage: function(n1) {
    return n1 / 100;
  },
  fraction: function(n1) {
    return 1 / n1;
  },
  factorial: function(n1) {
    var cur = 1;
    for(var i=1; i <= n1; i++) {
      cur = cur * i;  
    }
    return cur;
  },
  square: function(n1) {
    return n1 * n1;
  },
  cube: function(n1) {
    return n1 * n1 * n1;
  },
  potency: function(n1, n2) {
    var cur = n1;
    while(n2 > 1) {
      cur = cur * n1;
      n2--;
    }
    return cur;
  },
  squareroot: function(n1) {
    return Math.sqrt(n1);
  },
  cuberoot: function(n1) {
    return Math.cbrt(n1);
  },
  log2: function(n1) {
    return Math.log2(n1);
  },
  log10: function(n1) {
    return Math.log10(n1);
  },
  ln: function(n1) {
    return Math.log(n1);
  },
  cos: function(n1) {
    return Math.cos(n1);
  },
  sin: function(n1) {
    return Math.sin(n1);
  },
  tan: function(n1) {
    return Math.tan(n1);
  },
  cosh: function(n1) {
    return Math.cosh(n1);
  },
  sinh: function(n1) {
    return Math.sinh(n1);
  },
  tanh: function(n1) {
    return Math.tanh(n1);
  },
  // special numbers
  rand: Math.random(),
  pi: Math.PI,
  e: Math.E
}