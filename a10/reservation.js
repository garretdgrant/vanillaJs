"use strict";

// validates gerneral info and displays errors
const validateGeneral = () => {
    let isValid = true;
    const nights = parseInt($("#nights").val());
    if (isNaN(nights) || nights < 1){ // check if input was valid 
        const nightErrorSpan = $("#nights_error")
        nightErrorSpan.text("Must be a positive integer");
        isValid = false;
    }
    return isValid;
};



const validatePhoneNumber = () => {
    let isValid = true;

        // validate the phone number
    // helper function
    const checkNum = (num, lBound, uBound) => {
        return num >= lBound && num <= uBound;
    }

    // attaching custome error message
    const enterPhoneError = (error) => {
        $("#phone_error").text(error)
    }
    
    // checking correct format
    const phoneNumberArray = $("#phone").val().split("-");
    if (phoneNumberArray.length != 3){
        isValid = false;
        enterPhoneError("Please follow ###-###-#### format!");
        return isValid;
    }

    // checking to make sure all entries are numbers
    const [first, second, third] = phoneNumberArray;
    if (isNaN(first) || isNaN(second) || isNaN(third)){
        isValid = false;
        enterPhoneError("Please make sure only digits and - were entered");
        return isValid;
    }


    phoneNumberArray.forEach( (num, i) => {
        if( i == 2){
            isValid = num.length == 4 && checkNum(parseInt(num), 0, 9999)
        } else {
            isValid = num.length == 3 && checkNum(parseInt(num), 0, 999)
        }
        if (!isValid){
            enterPhoneError("Please make sure number is valid");
        }
    })
    
    return isValid;
}

//regex snippet found on stack overflow
const validateEmail = () => {
    const email = $("#email").val()
    const isValid =  email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
    if (!isValid){ // attach the error if not valid email
        $("#email_error").text("Please enter a valid email");
    }
    return isValid;
  };

const  validateContact = () => {
    let isValid = true;
    // Validate the name
    const name = $("#name")
    if(!name.val() || name.val().split(" ").length < 2){
        $("#name_error").text("Must enter at least two names");
        isValid = false;
    }

    isValid = validatePhoneNumber() && isValid;
    isValid = validateEmail() && isValid;
    return isValid;
}

const clearErrors = () => {
    $("span").text(" ")
}

const validateForm = () => {
    const validGeneral = validateGeneral();
    const validContact = validateContact();
    return validGeneral && validContact;
};

// event listener for loaded dom
$(document).ready( () => {
    // event listener on button
    $(".submit").click(e => {
        e.preventDefault();
        clearErrors(); // Clear old errors on each submission attempt
        if (validateForm()){ // if form is valid, redirect
            window.location.href = "/thank-you.html";
        }
    });
});