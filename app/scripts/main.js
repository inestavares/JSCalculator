/* jshint devel:true */
var Calculator = (function() {
var calcOperations = {
  // things that do not exist in math object:
  factorial: function(n1) {
    var cur = 1;
    for(var i=1; i <= n1; i++) {
      cur = cur * i;  
    }
    return cur;
  },
  // js Math trig methods take radians by default 
  toRadians: function(n) {
    return n * (Math.PI / 180);
  },
  applyMode: function(x) {
    if(calcValues.mode === 'Deg') {
      return calcOperations.toRadians(x);
    } else {
      return x;
    }
  },
  toggleDegRad: function() {
    if ($(this).text() === 'Rad') {
      calcValues.mode = 'Rad';
      $(this).text('Deg');
    } else if ($(this).text() === 'Deg') {
      calcValues.mode = 'Deg';
      $(this).text('Rad'); 
    }
  },
  isFloat: function(n) {
    for(var i=0; i < n.length; i++) {
      if(n.charAt(i) === '.') {
        return true;
     }
    }
  },
  doubleOperand: function() { // for methods that take two params 
    if(calcValues.lastInput === 'number') {
      calcValues.n2 = parseFloat($('#visor').text());
    } else {
      calcValues.n1 = calcValues.result;
    }
      switch(calcValues.operator) {
        case '+':
          calcValues.result = calcValues.n1 + calcValues.n2;
          break;
        case '-':
          calcValues.result = calcValues.n1 - calcValues.n2;
          break;
        case '*':
          calcValues.result = calcValues.n1 * calcValues.n2;
          break;
        case '/':
          calcValues.result = calcValues.n1 / calcValues.n2;
          break;
          case 'y^x':
          calcValues.result = Math.pow(calcValues.n1, calcValues.n2);
          break;
      }
      $('#visor').text(calcValues.result);
      calcValues.lastInput = 'equal';
      calcValues.n1 = calcValues.result;
  },
  singleOperand: function() { // for methods that take one param
    // a bit of hackiness - saving the old operator in a var so it can be reapplied in the end
    var prevOperator = calcValues.operator;
    calcValues.operator = $(this).data('operator');
    var result;
    var n = parseFloat($('#visor').text());
    switch(calcValues.operator) {
      case '+-':
      result = -n;
      break;
      case '%':
      result = n / 100;
      break;
      case '1/x':
      result = 1 / n;
      break;
      case 'x^2':
      result = n * n;
      break;
      case 'x^3': 
      result = n * n * n;
      break;
      case 'x!':
      result = calcOperations.factorial(n);
      break;
      case 'squareroot':
      result = Math.sqrt(n);
      break;
      case 'log2':
      result = Math.log2(n);
      break;
      case 'log10':
      result = Math.log10(n);
      break;
      case 'ln':
      result = Math.log(n);
      break;
      case 'sin':
      result = Math.sin(calcOperations.applyMode(n));
      break;
      case 'cos':
      result = Math.cos(calcOperations.applyMode(n));
      break;
      case 'tan':
      result = Math.tan(calcOperations.applyMode(n));
      break;
      case 'sinh':
      result = Math.sinh(n);
      break;
      case 'cosh':
      result = Math.cosh(n);
      break;
      case 'tanh':
      result = Math.tanh(n);
      break;

    }
    if(calcValues.n1) {
      calcValues.n2 = result;
      $('#visor').text(calcValues.n2);
      calcValues.operator = prevOperator;
    } else {
      calcValues.result = result;
      $('#visor').text(calcValues.result);
    }
  },
  constants: function(str) { // for constants
    var n;
    switch(str) {
      case 'pi':
        n = Math.PI;
        break;
       case 'E':
        n = Math.E;
        break;
       case 'rand':
        n =  Math.random();
        break;
    }
    return n;
  }
}

// calculator storage values

calcValues = {
  mode: 'Deg', // default 
  n1: 0,
  n2: 0,
  operator: false, 
  lastInput: false,
  result: 0,
  reset: function() {
     $('#visor').text('0');
     calcValues.operator = false;
     calcValues.lastInput = false;
     calcValues.result = 0;
  },
  visorControls: function(n, cur) {
    if (cur === '0' || (calcValues.operator && calcValues.lastInput === 'operator')) {
      calcValues.lastInput = 'number';
      $('#visor').text(n);
     } else if (calcValues.lastInput === 'equal') {
      $('#visor').text(n);
     } else {
      $('#visor').text(cur+n);
    }
  },
  switchModes: function(e) {
    e.stopPropagation();
    $('.tab').toggleClass('inactive');
    $('.container').toggleClass('basic-width'); 
    if($(this).hasClass('bs')) {
      $('.scientific').addClass('hidden');
    } else {
      $('.container').one('transitionend.width', function(e) { 
        $('.scientific').removeClass('hidden').find('button').removeClass('invisible'); 
      });
    }
    
    },
    insertNumber: function() {
        var n = $(this).text();
        var cur = $('#visor').text();
        calcValues.visorControls(n, cur);
    },
    insertConstant: function() {
        var n;
        var number = $(this).data('number');
        n = calcOperations.constants(number);
        calcValues.visorControls(n, 0);
    },
    insertOperator: function() {
      calcValues.n1 = parseFloat($('#visor').text());
      calcValues.operator = $(this).data('operator');
      calcValues.lastInput = 'operator';
    },

    floatPoint: function() {
      var cur = $('#visor').text();
      if(!calcOperations.isFloat(cur)) {
      $('#visor').text(cur+'.');
       }
    }
}

$('.constants').on('click.constant', calcValues.insertConstant);
$('.numbers').on('click.number', calcValues.insertNumber);
$('.float').on('click.float', calcValues.floatPoint);
$('.operator').on('click.operator', calcValues.insertOperator);
$('#reset').on('click.reset', calcValues.reset );
$('.single-operator').on('click.singleOperand', calcOperations.singleOperand);
$('.constants').on('click.constants', calcOperations.constants);
$('.degrad').on('click.degrad', calcOperations.toggleDegRad);
$('.equals').on('click.equal', calcOperations.doubleOperand );
$('.tabs').on('click.tab', '.inactive', calcValues.switchModes );

})();