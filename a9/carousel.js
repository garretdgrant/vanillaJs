"use strict";

var shiftLeft = 0;

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

const handleLeftClick = (e, shiftCheck) => {
    e.preventDefault();
    if(shiftCheck.shift == 4){
        return;
    }
    shiftCheck.shift += 1;
    // Grab all the a tags and shift left
    $("a").animate(
        {marginLeft: "-=205"}
    )
}

const handleRightClick = (e, shiftCheck) => {
    e.preventDefault();
    if (!shiftCheck.shift){ // dont want to allow rShift if lShift has not occured
        return;
    }
    shiftCheck.shift -= 1;
    $("a").animate(
        {marginLeft: "+=205"}
    )
}

$(document).ready( () => {
    const shiftCheck = {'shift': 0};
    $("a").click((e) => changeMainImage(e))
    $("#left_button").click( e => handleLeftClick(e, shiftCheck));
    $("#right_button").click( e => handleRightClick(e, shiftCheck));
});