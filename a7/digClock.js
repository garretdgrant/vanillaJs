"use strict";
// Selector function
const $ = selector => document.querySelector(selector);

// global variables
let stopWatchTimer = null;
let elapsedMinutes = 0;
let elapsedSeconds = 0;
let elapsedMilliseconds = 0;
let intervalId = 0;

// Format single digit to padded 2 digit
const padSingleDigit = num =>{
    if (num < 10)
        return num.toString().padStart(2, "0");
    return num.toString();
} 

// function to pad the milliseconds
const padMilliseconds = num => num.toString().padStart(3, "0");

// Stop watch functions 
// Function to tick the stop watch by ten milliseconds
const tickStopWatch = () => {
    const msSpan = $("#s_ms");    // stop watch ms span
    const sSpan = $("#s_seconds"); //stop watch second span
    const mSpan = $("#s_minutes"); // stop watch minute span
    elapsedMilliseconds += 10;
    if (elapsedMilliseconds >= 1000){
        elapsedMilliseconds -= 1000;
        elapsedSeconds += 1;
    }

    if (elapsedSeconds >= 60){
        elapsedSeconds -= 60;
        elapsedMinutes += 1
    }

    msSpan.textContent = padMilliseconds(elapsedMilliseconds);
    sSpan.textContent = padSingleDigit(elapsedSeconds) + ":";
    mSpan.textContent = padSingleDigit(elapsedMinutes) + ":";
};

const startStopWatch = (e) => {
    e.preventDefault;
    intervalId = setInterval(tickStopWatch, 10);
};

const stopStopWatch = (e) => {
    e.preventDefault;
    clearInterval(intervalId);
};

const resetStopWatch = (e) => {
    e.preventDefault;
    elapsedMilliseconds = -10;
    elapsedSeconds = 0;
    elapsedMinutes = 0;
    tickStopWatch();
};
    
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
    $("#Start").addEventListener("click", startStopWatch);
    $("#Stop").addEventListener("click", stopStopWatch);
    $("#Reset").addEventListener("click", resetStopWatch);
});