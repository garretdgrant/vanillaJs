"use strict";

const $ = selector => document.querySelector(selector);

const padSingleDigit = num =>{
    if (num < 10)
        return num.toString().padStart(2, "0");
    return num.toString();
} 
    
// Format the correct hour
const formatHours = (hour) => {
    hour = parseInt(hour);
    if (hour == 0){ // 12 am
        hour = 12
    } else if (hour > 12) { // pm times
       hour =  hour -12
    } 
    return padSingleDigit(hour);
}

// Display current time to the clock
const displayCurrentTime = () => {
    const hoursSpan = $("#hours");
    const minutesSpan = $("#minutes");
    const secondSpan = $("#seconds");
    const ampmSpan = $("#ampm");
    const currTime = new Date();
    const time = {
        hours: padSingleDigit(currTime.getHours()),
        minutes: padSingleDigit(currTime.getMinutes()),
        seconds: padSingleDigit(currTime.getSeconds()),
        ampm: currTime.getHours() >= 12 ? "PM" : "AM"
    };
    hoursSpan.textContent = formatHours(time.hours) + ": ";
    minutesSpan.textContent = time.minutes + ": ";
    secondSpan.textContent = time.seconds;
    ampmSpan.textContent = " " + time.ampm;
};

// Display time when dom loads
document.addEventListener("DOMContentLoaded", () => {
    displayCurrentTime(); // Display time on launch
    setInterval(displayCurrentTime, 1000);
});