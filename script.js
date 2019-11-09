var input = document.getElementById("inputBox");
var result = document.getElementById("resultBox");
var trigger = false;
var operators = ['+', '-', '*', '/'];

var cal = {
  insertValue: function(data) {
    if (trigger) {
      input.value = "";
      trigger = false;
    }
    input.value += data;
    this.evaluate();
  },
  insertSymbol: function(symbol) {
    input.value += symbol;
    trigger = false;
    this.evaluate();
  },
  clear: function() {
    input.value = "";
    result.value = "";
  },
  decimal: function() {
    input.value += '.';
  },
  compute: function() {
    if (input.value != "") {
      input.value = eval(input.value);
      result.value = "";
      trigger = true;
    }
  },
  evaluate: function() {
    try {
        result.value = eval(input.value);
    } catch (e) {
      result.value = "";
    }
  },
  percentage: function(symbol) {
    input.value += symbol;
    result.value = parseFloat(input.value) / 100;
  },
  backspace: function() {
    input.value = input.value.slice(0, -1);
    result.value = "";
  }
};
