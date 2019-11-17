var inputBox = document.getElementById("inputBox");
var resultBox = document.getElementById("resultBox");
var inputs = [];
var value = "";

var cal = {
  insertValue: function(data) {
    value += data;
  },
  insertOperator: function(op) {
    if(value != "") { inputs.push(parseInt(value)); }
    value = "";
    inputs.push(op);
  },
  insertDecimal: function() {
    
  },
  finalExe: function() {
    if(value != "") { inputs.push(parseInt(value)); }
    value ="";
    resultBox.value = evaluate(inputs);;
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