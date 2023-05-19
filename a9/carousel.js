"use strict";

$(document).ready( () => {
    $("a").click( e => {
        // prevent default action when clicked
        e.preventDefault();
        
        // Get the url of the clicked book
        const aTag = e.currentTarget;
        const imgUrl = aTag.getAttribute("href");
       
        // Assign and animate the new image to the main image
        const mainImg = $("#image");
        mainImg.animate({
            opacity: 0,
            marginLeft: "-=205"
        },
        {
            duration:1000,
            complete: ()=>{
                mainImg.attr("src", imgUrl);
                mainImg.animate({
                    opacity: 1,
                    marginLeft: "+=205"
                }, 1000);
            }});

    });
});