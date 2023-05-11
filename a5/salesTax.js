/*
 *	Script that calculates the sales tax from user input
 *	Date: 5/5/2023
 *	Created by: Garret Grant 
 */

"use strict";

const $ = selector => document.querySelector(selector);

/**
 * processEntry is an event handler for both the calculate
 * and clear buttons. The action parameter is the value
 * of the button clicked (Calculate or Clear). When action
 * is Clear the function clears all boxes and sets focus
 * on Subtotal box. If action is Calculate the function
 * checks validity of user input. If not valid the function
 * recursively calls itself with action = "Clear". If valid
 * The function calculates and displays the results  
 */
const processEntry = (event, action) => {
    const subTotalBox = $("#subTotal");
    const taxRateBox = $("#taxRate");
    const salesTaxBox = $("#salesTax");
    const totalBox = $("#total");
    const values = [subTotalBox, taxRateBox, salesTaxBox, totalBox];

    if (action == "Clear"){
        for (let valueBox of values) valueBox.value = null; // clear all boxes
        subTotalBox.focus(); // focus cursor on subTotalBox
        return; // return to break recursive call
    } else { // action must be calculate
        const subTotal = parseFloat(subTotalBox.value);
        const taxRate = parseFloat(taxRateBox.value/100);
        const isValid = (subTotal > 0 && subTotal < 10000 && taxRate > 0 &&
            taxRate < .12); // user input validity check
        
        if (isValid){ 
            salesTaxBox.value =  "$" + (subTotal * taxRate).toFixed(2);
            totalBox.value = "$" + (subTotal * taxRate + subTotal).toFixed(2); 
            return; // return to break recursive call
        };

        // alert user entry is not valid
        alert("Subtotal must be > 0 and < 10000\n" +
            "Tax Rate must be > 0 and < 12"); 
        processEntry(null, "Clear"); // recursive call to clear invalid entries
    };
};

// event listener for dom loading that invokes anonomys function
document.addEventListener("DOMContentLoaded", () => {
    $("#subTotal").focus(); // focus on subtotal box
    
    // event listener for the calculate button that invokes
    // the process entry button
    $("#calculate").addEventListener("click", 
        (e) => processEntry(e, $("#calculate").value));
    
    // same functionality with clear button
    $("#clear").addEventListener("click",
        (e) => processEntry(e, $("#clear").value));
});