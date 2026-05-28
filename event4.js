//we want to add a mouseover event, so when the mouse enters the red region the color of the box changes to yellow.

let abcd = document.querySelector("#abcd");
abcd.addEventListener("mouseover",function(){
    abcd.style.backgroundColor = "yellow";
});
//when the mouse moves out of the card region it again comes back to it's original color that's red.
abcd.addEventListener("mouseout",function(){
    abcd.style.backgroundColor = "red";
});


//mousemove-function
/* window.addEventListener("mousemove",function(dets){
    console.log(dets);
}) */
// now with this mousemove event we want to build something where the card moves according to our mouse movement

window.addEventListener("mousemove",function(dets){
    /* console.log(dets.clientX,dets.clientY); */
    abcd.style.top = dets.clientY + "px";
    abcd.style.left = dets.clientX + "px";
})

//untill now our mouse was at the top left corner of the box, but we want it to be at the center of the card. so there's some mathematics in that.
