/* This project is an implementation of a simple calculator that contains all
 * of the basic math operations
 */


// Create the calculator
// An array with all the button objects for the calculator
let BUTTONS = [
    {name: 'display' ,content: '', class_:'display', id: 'display'},
    {name: 'zero', content: '&#48;', class_: 'zero num'},
    {name: 'one', content: '&#49;', class_: 'one num'},
    {name: 'two', content: '&#50', class_: 'two num'},
    {name:'three', content: '&#51', class_: 'three num'},
    {name: 'four', content: '&#52', class_: 'four num'},
    {name: 'five', content: '&#53', class_: 'five num'},
    {name: 'six', content: '&#54', class_: 'six num'},
    {name: 'seven', content: '&#55', class_: 'seven num'},
    {name: 'eight', content: '&#56', class_: 'eight num'},
    {name: 'nine', content: '&#57', class_: 'nine num'},
    {name: 'dot', content: '&#8901', class_: 'dot num'},
    {name: 'cancel', content: 'C', class_: 'cancel', id: "cancel"},
    {name: 'add', content: '&#43', class_: 'add', id: "add"},
    {name: 'sub', content: '&#8722', class_: 'sub', id: "sub"},
    {name: 'times', content: '&#215;', class_: 'times', id: "times"},
    {name: 'div', content: '&#247;', class_: 'div', id: "div"},
    {name: 'equal', content: '&#61', class_: 'equal', id: "equal"},
    {name: 'back', content: '&#8594', class_: 'back', id: "back"},
    {name: 'plus-minus', content: '&#177', class_: 'plus-minus', id: "plus-minus"}
]



const calculator = document.querySelector('div.calculator');

BUTTONS.forEach((btn) => {
    let calcBtn = document.createElement('div');
    calcBtn.setAttribute("class", btn.class_);
    calcBtn.setAttribute("id", btn.id || '');
    calcBtn.innerHTML = `<span>${btn.content}</span>`;
    calculator.appendChild(calcBtn);
});


// operator functions
const add = (a, b) => {
    return a + b;
}

const subtract = (a, b) => {
    return a - b;
}

const multiply = (a, b) => {
    return a * b;
}

const divide = (a, b) => {
    return a / b;
}

const operator = (operator, num_a, num_b) => {
    return operator(num_a, num_b);
}

