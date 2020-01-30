const input = document.querySelector('.input');
const result = document.querySelector('.result');
const btns = document.querySelectorAll('input');
const errors = [ '++', '+-', '+x', '+÷', '+%',
                 '-+', '--', '-x', '-÷', '-%',
                 'x+', 'x-', 'xx', 'x÷', 'x%',
                 '÷+', '÷-', '÷x', '÷÷', '÷%',
                 '%+', '%-', '%x', '%÷', '%%' ] // possible error occurances

// clears the result box
const clear = () => {
    result.value = 0;
    input.value = 0;
}
// calculate the result
const calculate = () => {
    try {
        result.value = eval(input.value.replace(/÷/g, '/').replace(/x/g, '*'));
    } catch(e) {
        if(errors.some(er => input.value.includes(er)))
            result.value = "⚠ CHECK INPUTS";
    }
}
// backspace function
const backspace = () => {
    input.value = input.value.slice(0, input.value.length - 1);
}
// percentage calculation
const percentage = () => {
    try {
        input.value = eval(input.value.replace(/÷/g, '/').replace(/x/g, '*'))/100;
    } catch(e) {
        result.value = "OOPS!! Error calculating percentage";
    }
}
// Validate input at each entry
const validateAnswer = () => {
    try { calculate(); }
    catch(e) { return; }
}
// pulling data
const gather = (e) => {
    value = e.path[0].value;
    switch(value) {
        case 'C': clear(); break;
        case '=': calculate(); break;
        case '%': percentage(); break;
        case "backspace": backspace(); break;
        default : {
            if(input.value == 0 && !input.value.includes('0.')) {
                input.value = value;
                break;
            } input.value += value;
        }
    }
    validateAnswer();
}
btns.forEach(btn => btn.addEventListener('click', gather));