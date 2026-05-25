//we want to present every key that we press on the screen.

//approach :- we call the entire screen a window so, we'll add a event listener on window itself first.

//now we've added the event listener on the entire window but now we want to reflect this change on our h1.

let h1 = document.querySelector("h1");

window.addEventListener("keydown",function(dets){
    //h1.textContent = dets.key;
    if(dets.key === " "){
        h1.textContent = "SPC";
    } else {
        h1.textContent = dets.key;
    }
})


