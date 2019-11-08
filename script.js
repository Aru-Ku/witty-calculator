var input = document.getElementById('inputBox');
var result = document.getElementById('resultBox');
var trigger = false;
var cal = {
  insertValue: function(data) {
    if (trigger) { input.value = ""; trigger = false; }
    input.value += data;
    this.evaluate();
  },
  insertSymbol: function(symbol) {
    input.value += symbol;
    trigger = false;
    this.evaluate();
  },
  insertBracket: function() {
    
  },
  clear: function() {
    input.value = "";
    result.value = "";
  },
  signed: function() {
    
  },
  decimal: function() {
    
  },
  compute: function() {
    var data = input.value;
    if(data == "") {
      input.value = "";
    } else {
      input.value = eval(data);
      result.value = "";
      trigger = true;
    }
  },
  evaluate: function() {
    try {
      result.value = eval(input.value);
    } catch(e) {
      result.value = ""
    }
  },
  percentage: function(symbol) {
    input.value += symbol;
    result.value = parseInt(input.value, 10)/100;
  }
}