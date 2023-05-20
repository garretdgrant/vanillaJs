"use strict";

// Function that animates the main image to the clicked image
const changeMainImage = e => {
        // prevent default action when clicked
        e.preventDefault();
        
        // Get the url of the clicked book
        const aTag = e.currentTarget;
        const imgUrl = aTag.getAttribute("href");
       
        // Assign and animate the new image to the main image
        const mainImg = $("#image");
        mainImg.animate({opacity: 0, marginLeft: "-=205"},
        { duration:1000,
            complete: ()=> {
                mainImg.attr("src", imgUrl);
                mainImg.animate({opacity: 1, marginLeft: "+=205"}, 1000);
            }});
}

// handles click of left arrow button
const handleLeftClick = (e, shiftCheck) => {
    e.preventDefault();
    if(shiftCheck.shift == 4){
        return;
    }
    shiftCheck.shift += 1;
    // shift carousel left
    $("a").animate(
        {marginLeft: "-=205"}
    )
}

// handles click of right arrow button 
const handleRightClick = (e, shiftCheck) => {
    e.preventDefault();
    if (!shiftCheck.shift){ // dont want to allow rShift if lShift has not occured
        return;
    }
    //shift carousel right
    shiftCheck.shift -= 1;
    $("a").animate(
        {marginLeft: "+=205"}
    )
}

// event listener for dom ready
$(document).ready( () => {
    const shiftCheck = {'shift': 0}; // variable for checking shift position
    $("a").click(e => changeMainImage(e)); // listener for all a tags
    // left and right button listeners
    $("#left_button").click( e => handleLeftClick(e, shiftCheck)); 
    $("#right_button").click( e => handleRightClick(e, shiftCheck));
});