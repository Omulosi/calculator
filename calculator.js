
/* This project is an implementation of a simple calculator that implements
 * basic math operations
 */


// Create the calculator
// An array with all the button objects for the calculator
let BUTTONS = [
    {name: 'display' ,content: '0', class_:'display', id: 'display'},
    {name: 'zero', content: '&#48;', class_: 'zero num', data: 0},
    {name: 'one', content: '&#49;', class_: 'one num', data: 1},
    {name: 'two', content: '&#50', class_: 'two num', data: 2},
    {name:'three', content: '&#51', class_: 'three num', data: 3},
    {name: 'four', content: '&#52', class_: 'four num', data: 4},
    {name: 'five', content: '&#53', class_: 'five num', data: 5},
    {name: 'six', content: '&#54', class_: 'six num', data: 6},
    {name: 'seven', content: '&#55', class_: 'seven num', data: 7},
    {name: 'eight', content: '&#56', class_: 'eight num', data: 8},
    {name: 'nine', content: '&#57', class_: 'nine num', data: 9},
    {name: 'dot', content: '&#8901', class_: 'dot num', data: '.'},
    {name: 'cancel', content: 'C', class_: 'cancel', id: "cancel", data: 'C'},
    {name: 'add', content: '&#43', class_: 'add op', id: "add", data: '+'},
    {name: 'sub', content: '&#8722', class_: 'sub op', id: "sub", data: '-'},
    {name: 'times', content: '&#215;', class_: 'times op', id: "times", data: '*'},
    {name: 'div', content: '&#247;', class_: 'div op', id: "div", data: '/'},
    {name: 'equal', content: '&#61', class_: 'equal op', id: "equal", data: '='},
    {name: 'back', content: '&#8594', class_: 'back', id: "back", data: '<'},
    {name: 'plus-minus', content: '&#177', class_: 'plus-minus num', id: "plus-minus", data: '+-'}
]

// Build the structure and layout of the calculator

const calculator = document.querySelector('div.calculator');

BUTTONS.forEach((btn) => {
    let calcBtn = document.createElement('div');
    calcBtn.setAttribute("class", btn.class_);
    calcBtn.setAttribute("id", btn.id || '');
    if (btn.name === 'display') {

        let bigDiv = document.createElement('div');
        bigDiv.setAttribute('id', 'big-display');
        bigDiv.textContent = btn.content;

        let smallDiv = document.createElement('div');
        smallDiv.setAttribute('id', 'small-display');
        smallDiv.textContent = btn.content;

        calcBtn.appendChild(bigDiv);
        calcBtn.appendChild(smallDiv);

    } else if (btn.name === 'plus-minus') {
        calcBtn.innerHTML = `<span>${btn.content}</span>`;
        calcBtn.setAttribute('data-content', '&#8722');
        calcBtn.setAttribute('data-raw-data', `${btn.data}`);
    }else {
        calcBtn.innerHTML = `<span>${btn.content}</span>`;
        calcBtn.setAttribute('data-content', `${btn.content}`);
        calcBtn.setAttribute('data-raw-data', `${btn.data}`);

    }

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

const operate = (operator, num_a, num_b) => {
    return operator(num_a, num_b);
}

// functions to populate the display

const populateBigDisplay = (value) => {
    let bigDisplay = document.querySelector('#big-display');
    bigDisplay.innerHTML = value;
}

const populateSmallDisplay = (value) => {
    let smallDisplay = document.querySelector('#small-display');
    smallDisplay.innerHTML = value;
}


// Main logic for carrying out operations using the calculator

const operateCalculator = () => {
    let smallDisplayValue = ""; //stores values to be displayed by the calculator
    let bigDisplayValue = "";
    let operationsArray = [];  // holds data values and the corresponding operations
    let btnValue;
    let rawData = "";

    let calcBtns = document.querySelectorAll('.calculator > div');
    calcBtns = Array.from(calcBtns);

    calcBtns.forEach((btn) => {
        btn.addEventListener('click', function(event){
            
            // check for buttons matching the special characters
            // and operators
            if (btn.dataset.rawData.match(/[+\-*/=]/g)) {
                // store the data to be operated on in an array together
                // with the operator coming after it
                operationsArray.push(rawData);
                operationsArray.push(btn.dataset.rawData);

                // clear raw data storage variable as the data is now
                // stored in the array
                rawData = '';

                // keep a running display of the input history
                // so far - this is shown in the bottom smaller display
                smallDisplayValue += btn.dataset.content;

                // populateSmallDisplay(smallDisplayValue);
                

                // operate on the values accumulated so far if at
                // least three items get stored in the operations array.
                // This is triggered whenever you click on an operator
                // after entering three values - a number, an operator, a number - 
                // in that order.
                if (operationsArray.length >= 3) {
                    let num_a, num_b, operator, result;
                    // get first three entries 
                    num_a = operationsArray.shift();
                    operator = operationsArray.shift();
                    num_b = operationsArray.shift();

                    // operate on numbers using an appropriate operator
                    if (operator == '+') {
                        result = operate(add, Number(num_a), Number(num_b));
                        operationsArray.unshift(result);

                        // display result on the big display
                        populateBigDisplay(result);
                        
                    }

                    if (operator == '-') {
                        result = operate(subtract, Number(num_a), Number(num_b));
                        operationsArray.unshift(result);
                        populateBigDisplay(result);  

                    }

                    if (operator == '*') {
                        result = operate(multiply, Number(num_a), Number(num_b));
                        operationsArray.unshift(result);
                        populateBigDisplay(result);

                    }

                    if (operator == '/') {
                        result = operate(divide, Number(num_a), Number(num_b));
                        operationsArray.unshift(result);
                        populateBigDisplay(result);

                    }

                    // Handle for the special case when '=' is clicked
                    if (btn.dataset.rawData == '=') {
                        // remove the '=' sign from operations array
                        operationsArray.pop();
                        smallDisplayValue += operationsArray.join('');
                        populateSmallDisplay(smallDisplayValue);
                        operationsArray.pop();
                        smallDisplayValue = result;

                    } else {
                        // update small display to contain results of operating on entries so
                        // far, post-pended by the last input operator
                        smallDisplayValue = operationsArray.join('');
                        smallDisplayValue = smallDisplayValue.replace('/', btn.dataset.content);
                        smallDisplayValue = smallDisplayValue.replace('*', btn.dataset.content);
                        
                    }

                }

                // Make Big display start displaying values afresh after 
                // clicking an operator
                bigDisplayValue = '';
                populateSmallDisplay(smallDisplayValue);
                // make small display start afresh after clicking '='
                if (btn.dataset.rawData == '=') { smallDisplayValue = ''; }

            } else if (btn.dataset.rawData == 'C') {
                // clear everything and start afresh
                bigDisplayValue = '0';
                smallDisplayValue = '0';
                rawData = '';
                operationsArray = [];
                populateSmallDisplay(smallDisplayValue);
                populateBigDisplay(bigDisplayValue);

            }

             else {
                btnValue = btn.dataset.content;

                if (btnValue == '0') { btnValue = '' };
                if (smallDisplayValue == '0') {smallDisplayValue = ''};
                if (bigDisplayValue == '0') { bigDisplayValue = ''};

                smallDisplayValue += btnValue;
                bigDisplayValue += btnValue;
                populateBigDisplay(bigDisplayValue);
                populateSmallDisplay(smallDisplayValue);

                rawData += btn.dataset.rawData;
            }
            
        

        });
    });
}


operateCalculator();
