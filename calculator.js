
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
    let forwardCarry = [];

    let calcBtns = document.querySelectorAll('.calculator > div');
    calcBtns = Array.from(calcBtns);

    calcBtns.forEach((btn) => {
        btn.addEventListener('click', function(event){
            

            // check for buttons matching the special characters
            // and operators
            if (btn.dataset.rawData.match(/[+\-*/=]/g)) {
                // store the data to be operated on in an array only
                // if the data has been input by user.
                // If not, use the previously computed result
                if (rawData) { operationsArray.push(rawData);}
                else { 
                    // continuing from prev calculation
                    // update display value to indicate the prev value
                    // for better user experience
                    operationsArray.push(forwardCarry.pop());
                    smallDisplayValue = operationsArray[0];
                }

                // Carry out calculations only if the previous data is well formed i.e
                //  - An operator can only come after a valid number
                //  - There should be at least one number preceding an operator
                if (operationsArray.length != 0 && !isNaN(operationsArray.slice(-1).join())){
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
                    if (operationsArray.length == 4) {
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
                            if (Number(num_b) == 0) {
                                populateBigDisplay('Error!');
                                result = '';
                            } else {
                                result = operate(divide, Number(num_a), Number(num_b));
                                operationsArray.unshift(result);
                                populateBigDisplay(result);}

                        }

                        // Handle for the special case when '=' is clicked
                        if (operationsArray.slice(-1).join() == '=') {
                            // remove the '=' sign from operations array
                            operationsArray.pop();
                            // set display to value of calculation
                            smallDisplayValue += operationsArray.join('');
                            populateSmallDisplay(smallDisplayValue);
                            // operationsArray.pop();
                            smallDisplayValue = result;

                        } else {
                            // update small display to contain results of operating on entries so
                            // far, post-pended by the last input operator
                            smallDisplayValue = operationsArray.join('');
                            smallDisplayValue = smallDisplayValue.replace('/', btn.dataset.content);
                            smallDisplayValue = smallDisplayValue.replace('*', btn.dataset.content);
                            
                        }

                    }
                    
                    // display the math expression of the current calculation
                    populateSmallDisplay(smallDisplayValue);
                    
                    // make small display start afresh after clicking '='
                    if (btn.dataset.rawData == '=') { smallDisplayValue = ''; }

                    // if the only value in the array is a number, a calculation has been
                    // done. Carry forward this value to be used for further calculations
                    // unless the user clears everything and starts afresh, a case which is
                    // handled in the next else clause.

                    if (operationsArray.length == 1 && !isNaN(operationsArray[0])){
                        // smallDisplayValue = operationsArray[0];
                        forwardCarry.push(operationsArray.pop());
                    }

                    // Make Big display start displaying values afresh after 
                    // clicking an operator
                    bigDisplayValue = '';

            }

            } else if (btn.dataset.rawData == 'C') {
                // clear everything and start afresh
                bigDisplayValue = '0';
                smallDisplayValue = '0';
                rawData = '';
                operationsArray = [];
                populateSmallDisplay(smallDisplayValue);
                populateBigDisplay(bigDisplayValue);

            } else if (btn.dataset.rawData === '<'){
                rawData = rawData.slice(0, -1);
                smallDisplayValue = operationsArray.join('') + rawData;
                smallDisplayValue = smallDisplayValue.replace('*', '&#215;');
                smallDisplayValue = smallDisplayValue.replace('/', '&#247;');
                bigDisplayValue = rawData;
                populateBigDisplay(bigDisplayValue);
                populateSmallDisplay(smallDisplayValue);
                
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
