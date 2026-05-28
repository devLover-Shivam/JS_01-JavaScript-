/* 
Event Bubbling:

This is the default behavior in JavaScript.
When an event happens on an element, it first runs the handlers on it, then on its parent, then all the way up to the ancestors (the body, document, and finally the html tag).
The video illustrates this by showing that if you add a click listener to a parent container (like a navigation bar), clicking on a child element (like a button inside that bar) will also trigger the parent's event listener because the event "bubbles up" from the target to the top of the DOM tree

overall jispe event aayega agar uspar lsitener nahi hua to event uske parent par listener dhundega aur aisa karte karte upar ki taraf move karega

html tag
    main div
        nav div
            links
            buttons

event listener will move in upward directions

*/

/* document.querySelector("#nav").addEventListener("click", function(){
    alert("event activated on nav");
}); */

// we want to strike through each fruit name once its selected, but adding a event listener every time we select it or on each fruit will be waste of time. so we'll add a eventlistener on the parent of "li" that is "ul" . so whenever we click on "li" items and ane event isnt found it will check for an event on its parent that is on "ul" hence in this way we'll save our time and space.


/* let ul = document.querySelector("ul");
ul.addEventListener("click", function(dets){
    dets.target.classList.toggle("lt"); // toggle adds an event if it isnt invoked and it removes an event if its already invoked.
}); */

// chain of event bubbling

let btn = document.querySelector("button");
let c = document.querySelector(".c");
let b = document.querySelector(".b");
let a = document.querySelector(".a");

btn.addEventListener("click", function(){
    console.log("button clicked");
})
c.addEventListener("click", function(){
    console.log("c clicked");
})
b.addEventListener("click", function(){
    console.log("b clicked");
})
a.addEventListener("click", function(){
    console.log("a clicked");
})