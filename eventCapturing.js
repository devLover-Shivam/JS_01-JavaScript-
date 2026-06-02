let a = document.querySelector(".a");
let b = document.querySelector(".b");
let c = document.querySelector(".c");
let btn = document.querySelector("button");
//this is an example of event bubbling which is by default that js does
btn.addEventListener("click",function(){
    console.log("button clicked");
},true)
c.addEventListener("click",function(){
    console.log("c clicked");
},true)

//jab bhi aap click karte ho ya koi bhi event raise karte ho to aapka jo event flow hai wo do phases me chalta hai:

//phase 1: event top level element se neeche ki taraf aayega !

//phase 2: event raised element ki taraf se parent ki taraf jaayega !

//aur pehle phase 1 chalti hai ! par by deault off rehti hai, agar hum usey on kar de to pehle phase 1 ka answer milega.

// pehele capture phase chalta hai jo by default activated nhi hota so , eventCapturing nhi ho raha hota , yani phase 1 ka answer nhi dikhta.

//then bubbling phase chalta hai jo by default activated hota hai so eventBubbling k answers hume dikhte hai!

//capture phase on karne k liye bas last me true likhna hota hai at the end of the eventListener function

b.addEventListener("click",function(){
    console.log("b clicked")
    },
    true//capture phase on
);
a.addEventListener("click",function(){
    console.log("a clicked")
    },
    true//capture phase on
);
