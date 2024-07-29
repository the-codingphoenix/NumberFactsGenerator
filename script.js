const inputContainer = document.getElementById('input-container');
const form = document.getElementById('factsForm');
const number = document.getElementById('number');
const getFactBtn = document.getElementById('getFact');
const factContainer = document.getElementById('fact-container');
const factDetail = document.getElementById('fact-detail');
const newFactBtn = document.getElementById('newFact');
const errorContainer = document.getElementById('error-container');
const errorDetail = document.getElementById('error');
const errorBtn = document.getElementById('retry');

let fact = '';

// check number entered to ensure it is positive and less than or equal to 1000
function isValidNumber(value) {
    const num = parseInt(value, 10);
    return Number.isInteger(num) && num > 0 && num <= 1000;
}


async function getNumberFact(e) {
    e.preventDefault();
    factContainer.hidden = true;
    inputContainer.hidden = true;
    const numberValue = number.value;
    if (!isValidNumber(number.value)) {
        errorContainer.hidden = false;
        errorDetail.textContent = 'Please enter a positive number between 1 and 1000!';
        return;
    }
    try {
        const response = await fetch(`http://numbersapi.com/${number.value}`);
        fact = await response.text();
        showFact();
        number.value='';
    } catch (error) {
        console.error('Error fetching fact:', error);
        errorContainer.hidden = false;
        errorDetail.textContent = 'Unable to retrieve facts right now. Please try again later';
    }
}

// show fact container
function showFact() {
    //hide input and error container
    inputContainer.hidden = true;
    errorContainer.hidden = true;
    //show fact container
    factContainer.hidden = false;
    factDetail.textContent = fact;

}

// show input container
function showInput() {
    // hide fact and error container
    factContainer.hidden = true;
    errorContainer.hidden = true;
    //show input container
    inputContainer.hidden = false;
}

//event listeners
form.addEventListener('submit', getNumberFact);
newFactBtn.addEventListener('click', showInput);
errorBtn.addEventListener('click', showInput);
