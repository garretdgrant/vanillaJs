"use strict";

const region1 = [1540, 1130, 1580, 1105];
const region2 = [2010, 1168, 2305, 4102];
const region3 = [2450, 1847, 2710, 2391];
const region4 = [1845, 1491, 1284, 1575];
const region5 = [2120, 1767, 1599, 3888];
const salesByQuarter = [0,0,0,0];
const salesByRegion = [0,0,0,0,0];
let totalSales = 0;

// For loop to make all necessary calculation for phase 1
for (let i = 0; i < region1.length; i++){
    salesByQuarter[i] = region1[i] + region2[i] + 
        region3[i] + region4[i] + region5[i];
    totalSales += salesByQuarter[i];
    salesByRegion[0] += region1[i];
    salesByRegion[1] += region2[i];
    salesByRegion[2] += region3[i];
    salesByRegion[3] += region4[i];
    salesByRegion[4] += region5[i];
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
