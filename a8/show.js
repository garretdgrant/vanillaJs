"use strict";

$(document).ready( () => {
    //attach event handler for all a tags
    $("a").click(e => {
        // Prevent default action of link 
        e.preventDefault();

        // Grab the clicked a tag
        const a = e.currentTarget;
        
        // Grab the div the link is related to 
        const div = a.previousElementSibling;

        //toggle .hide on div above a tag
        $(div).toggleClass();

        // Show correct text on a tag
        if ($(div).attr("class") !== "hide"){
            a.textContent = "Show less";
        } else {
            a.textContent = "Show more";
        }
    });

});