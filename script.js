const inputBox = document.getElementById("inputBox");
const resultBox = document.getElementById("resultBox");
var inputs = []; // stores the inputs from the keys
var value = ""; // stores 
var l1 = 0, l2 = 0;

var cal = {
  insertValue: function(data) {
    value += data;
    this.updateInputBox(data);
  },
  insertOperator: function(op) {
    if(value != "") {
      inputs.push(parseFloat(value));
      value = "";
    }
    l1 = inputs.length;
    if((inputs[l1-1] == '+') || (inputs[l1-1] == '-') || (inputs[l1-1] == '*') ||
       (inputs[l1-1] == '/') || (inputs[l1-1] == '%') || (inputs[l1-1] == '.')) {
      inputs[l1-1] = op;
      this.updateInputBox('?');
    } else {
      inputs.push(op); 
    }
    this.updateInputBox(op);
  },
  insertDecimal: function() {
    if(!value.includes('.')) {
      value += '.';
    }
    this.updateInputBox('.');
  },
  backspace: function() {
    l1 = inputs.length;
    l2 = value.length;
    resultBox.value = "";
    if((inputs[l1-1] == '+') || (inputs[l1-1] == '-') || (inputs[l1-1] == '*') ||
       (inputs[l1-1] == '/') || (inputs[l1-1] == '%') || (inputs[l1-1] == '.')) {
      value += inputs[l1-2];
      inputs = inputs.splice(0, l1-2);
    } else {
      value = value.substring(0, l2-1);
    }
    this.updateInputBox('?');
  },
  finalExe: function() {
    if(value != "") { inputs.push(parseFloat(value)); }
    resultBox.value = evaluate(inputs);
    value = "";
    value += inputs[0];
    inputs = [];
  },
  clear: function() {
    inputBox.value = "";
    resultBox.value = "";
    inputs = [];
    value = [];
  },
  updateInputBox: function(str) {
    if(str == '?') {
      console.log(inputBox.value);
      inputBox.value = inputBox.value.substring(0, inputBox.value.length-1);
    } else {
      inputBox.value += str;
    }
  }
};


function evaluate(inputs) {
  var operatorIndex, operation;
  Object.keys(calOperation).forEach(function(pre) {
    while(inputs.includes(pre)) {
      operatorIndex = inputs.indexOf(pre);
      if(pre == '%') {
    		var arg = Number(inputs[operatorIndex - 1])
    		var total = calOperation[pre](arg);
    		inputs.splice((operatorIndex-1),2, total);
    		continue;
    	}
      inputs = calSequence(pre, operatorIndex, inputs);
    }
  });
  return inputs;
}

const calOperation = {
  '%': (arg1) => arg1 / 100,
  '*': (arg1, arg2) => arg1 * arg2,
  '/': (arg1, arg2) => arg1 / arg2,
  '+': (arg1, arg2) => arg1 + arg2,
  '-': (arg1, arg2) => arg1 - arg2,
};

const inputIndex = (index, inputs) => {
  const arg1 = Number(inputs[index - 1]);
  const arg2 = Number(inputs[index + 1]);
  return [arg1, arg2];
};

const reduced = (index, newInputs, inputs) => {
  inputs.splice((index-1),3,newInputs);
  return inputs;
};

const calSequence = (op, operatorIndex, inputs) => {
  const argument = inputIndex(operatorIndex, inputs);
  const total = calOperation[op](argument[0], argument[1]);
  const final = reduced(operatorIndex, total, inputs);
  return final;
};