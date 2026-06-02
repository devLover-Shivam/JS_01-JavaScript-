//this project counts the number of characters entered in the input section

let inp = document.querySelector("input");
let span = document.querySelector("span");
inp.addEventListener("input",function(){
    let left = 20 - inp.value.length; 
    if(left<0){
        span.textContent = left;
        span.style.color = "red";
    } else {
        span.style.color = "black";
        span.textContent = left;
    }
});
