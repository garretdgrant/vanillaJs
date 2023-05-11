"use strict";

const $ = selector => document.querySelector(selector);

// Determines how many times a denom can go into the value
const countDenomination = (value, denom) => {
    let count = 0;
    while (value >= denom) {
        value -= denom;
        count += 1;
    }
    return count;
}

// helper function for make change to change the values of
// the input boxes
const displayResults = counts => {
    const [qCount, dCount, nCount, pCount] = counts;
    $("#quarters").value = qCount;
    $("#dimes").value = dCount;
    $("#nickels").value = nCount;
    $("#pennies").value = pCount;
}

// helper function for processEntry
const makeChange = value => {
    // counts = [quarterCount, dimeCount, nickelCount, pennyCount]
    const counts = [0,0,0,0];
    const denoms = [25, 10, 5, 1];
    for(let i = 0; i < denoms.length; i++){
        counts[i] = countDenomination(value, denoms[i]);
        value -= (denoms[i] * counts[i]);
    }
    displayResults(counts);
}

const processEntry = () => {
    const value = parseInt($("#changeInput").value);
    const isValid = (0 <= value && value <= 99);
    if (!isValid){
        alert("Please enter a valid value!");
        return;
    }
    makeChange(value);
}

// Once DOM is loded an evenlistener is added to calculate button
// with processEntry as the callback function
document.addEventListener("DOMContentLoaded", () => {
    $("#calculate").addEventListener("click", processEntry);
});

