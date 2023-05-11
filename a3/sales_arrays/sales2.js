"use strict";

const MIN_VALUE = 1000;
const MAX_VALUE = 5000;

const region1 = [0,0,0,0];
const region2 = [0,0,0,0];

const salesByQuarter = [0,0,0,0];
const salesByRegion = [0,0];
let totalSales = 0;

// Helper function to determine user input validity
const isValid = (value) => {
 return MIN_VALUE <= value && value <= MAX_VALUE
}

let dataPoint = 0;
while (dataPoint < 8){
    let userInput;
    if (dataPoint <= 3){
        userInput = parseInt(prompt(
            `Please enter sales data for region 1 Q${dataPoint + 1}: `
            + "$(1000-5000)"));
    } else {
        userInput = parseInt(
        prompt(`Please enter sales data for region 2 Q${(dataPoint - 3)}: `
         + "$(1000-5000)"));
    }

    // Used for testing to easily break out of loop
    if (userInput === -1){
        break;
    }

    // If not valid loop restarts without moving on to next data point
    if (!isValid(userInput)){
        alert("Invalid entry, please try again");
        continue;
    }
   
    if (dataPoint <= 3){
        region1[dataPoint] = userInput;
    } else {
        region2[dataPoint % 4] = userInput;
    }
    dataPoint++;
}

// For loop to make all necessary calculation for phase 2
for (let i = 0; i < region1.length; i++){
    salesByQuarter[i] = region1[i] + region2[i];
    totalSales += salesByQuarter[i];
    salesByRegion[0] += region1[i];
    salesByRegion[1] += region2[i];
}

 // Write the quarterly sales
document.write("<h2>Sales by Quarter</h2>")
for(let i = 0; i < salesByQuarter.length; i++){
    document.write(`Q${i + 1}: \$${salesByQuarter[i]}` + "<br>");
}

// Write the total yearly sales by region
document.write("<h2>Sales by Region</h2>")
for(let i = 0; i < salesByRegion.length; i++){
    document.write(`Region ${i + 1}: \$${salesByRegion[i]}` + "<br>");
}

// Write the total yearly sales for all regions
document.write("<h2>Total Sales</h2>" + "$" + totalSales)
