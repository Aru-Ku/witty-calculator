var inputs = document.getElementById("inputsBox");
var result = document.getElementById("resultBox");
var cal = {
  insertValue: function(data) {
    inputs.value += data;
  },
  clearResultBox: function() {
    inputs.value = "";
    result.value = "";
  },
  computeResult: function() {
    
  },
  percentage: function(symbol) {
    inputs.value += symbol;
    result.value = parseInt(inputs.value)/100;
  },
  signed: function() {
  
  },
  decimal: function() {
    if (inputs.value.includes(".")) {
      inputs.value = inputs.value;
    } else {
      inputs.value += '.';
    }
  },
  insertBrackets: function() {
    
  },
  operation: function(symbol) {
    
  }
};
