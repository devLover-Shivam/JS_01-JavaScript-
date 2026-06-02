let email = document.querySelector("#email");
let password = document.querySelector("#password");
let form  = document.querySelector("#form");

form.addEventListener("submit", function(dets){
    dets.preventDefault();

    //pichla agar kuch dikh raha hoga to wo hat jaaega.
    document.querySelector("#emailError").textContent = "";
    document.querySelector("#passwordError").textContent = "";



    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    let emailAns = emailRegex.test(email.value);
    let passwordAns = passwordRegex.test(password.value);

    let isValid = true;


    if(!emailAns){
        document.querySelector("#emailError").textContent = "Email is incorrect."
        document.querySelector("#emailError").style.display = "initial";
        isValid = false;
    }
    if(!passwordAns){
        document.querySelector("#passwordError").textContent = "Password is incorrect."
        document.querySelector("#passwordError").style.display = "initial";
        isValid = false
    }

    if(isValid){
        document.querySelector("button").style.backgroundColor = "green";
        document.querySelector("button").textContent = "VALIDATED!";
    } else {
        document.querySelector("button").style.backgroundColor = "red";
        document.querySelector("button").textContent = "RETRY!";
    }
    



});