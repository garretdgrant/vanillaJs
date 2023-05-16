"use strict";

const $ = (selector) => document.querySelector(selector);

const names = [];
const scores = [];

const isInputValid = (name, score) =>{
    return !!name && 0 <= score && score <= 100;
};

const addScore = () => {
    // select appropriat nodes
    const nameInputNode = $("#Name");
    const scoreInputNode = $("#Score");
    
    // get input values from nodes
    const namevalue = nameInputNode.value;
    const scoreValue = parseInt(scoreInputNode.value);

    if (!isInputValid(namevalue, scoreValue)){
        // get appropriate nodes
        const nameContainer = $("#nameContainer")
        const scoreContainer = $("#scoreContainer")

        // create span elements for error messages
        const nameSpan = document.createElement("span");
        const scoreSpan = document.createElement("span");
        
        // add error messages to spans
        nameSpan.textContent = "Please enter a name";
        scoreSpan.textContent = "Score must be between 0 and 100.";
        
        //Clear error messages if necessary 
        if(nameContainer.lastChild.textContent == nameSpan.textContent){
            nameContainer.lastChild.textContent = "";
            scoreContainer.lastChild.textContent = "";
        };

        // add nodes to appropriate divs
        nameContainer.appendChild(nameSpan);
        scoreContainer.appendChild(scoreSpan);

    } else {
        // input must be good
        // push input to arrays
        names.push(namevalue);
        scores.push(scoreValue);
    }
    // Focus and clear previous inputs
    nameInputNode.focus();
    nameInputNode.value = "";
    scoreInputNode.value = "";
};


const displayResults = () => {
    // if nothing has been entered, do not display
    if(!names.length){
        return;
    }
    
    // Get highScore and person who scored it
    let highScore = -1;
    let person = "";
    for(let i = 0; i < names.length; i++){
        const currentScore = scores[i];
        if (currentScore > highScore){
            highScore = scores[i];
            person = names[i];
        }
    }

    const resultsDiv = $("#results");
    const avg = (scores.reduce((num, a) => num + a, 0)/scores.length).toFixed(2); 
    const display = {highScore, avg, person};
   
    // Clear previous nodes
    resultsDiv.textContent = "";

    // Create title node for results 
    const titleNode = document.createElement("h2");
    titleNode.textContent = "Results";
    
    // Create average score node
    const avgNode = document.createElement("p");
    const avgText = `Average score = ${display.avg}`;
    avgNode.textContent = avgText;

    //Create high score node
    const highScoreNode = document.createElement("p");
    const highScoreText = `High score = ${display.person} with a score of 
                            ${display.highScore}`;
    highScoreNode.textContent = highScoreText;

    // append child nodes to results div
    resultsDiv.appendChild(titleNode);
    resultsDiv.appendChild(avgNode);
    resultsDiv.appendChild(highScoreNode);
};

const displayScores = () => {
    // if no entries, do not display
    if(!names.length){
        return;
    }
    const scoresDiv = $("#scores");
    scoresDiv.textContent = ""; // clear previous nodes

    // create title node
    const titleNode = document.createElement("h2");
    titleNode.textContent = "Scores"
    scoresDiv.appendChild(titleNode);

    for(let i = 0;  i < names.length; i++){
        // create necessary nodes for current score
        const breakNode = document.createElement("br");
        const nameNode = document.createElement("label");
        const scoreNode = document.createElement("label");
                
        nameNode.textContent = names[i];
        scoreNode.textContent = scores[i];
        scoresDiv.appendChild(nameNode);
        scoresDiv.appendChild(scoreNode);
        scoresDiv.appendChild(breakNode);
    }

};

// doucument loaded event listener
document.addEventListener("DOMContentLoaded", () => {
    $("#addButton").addEventListener("click", addScore);
    $("#displayResultsButton").addEventListener("click", displayResults);
    $("#displayScoresButton").addEventListener("click", displayScores);
    $("#Name").focus();
});