/* 
In JavaScript, an EVENT is any action or occurrence that happens in the browser, such as a button click, mouse movement, key press, form submission, or page loading. These actions are detected by the browser and can be used to trigger specific functionality in a webpage.

EVENT HANDLING: is the process of responding to these events using JavaScript. It allows developers to attach functions, called EVENT HANDLERS or EVENT LISTENERS, to HTML elements so that a particular action is performed whenever an event occurs.

Learning events and event handling is important because they make web pages INTERACTIVE AND DYNAMIC. Without events, websites would remain static and unable to react to user actions. Features like button clicks, dropdown menus, form validation, image sliders, dark mode toggles, and real-time updates all depend on event handling. It forms the foundation of modern frontend web development and is one of the most essential concepts in JavaScript.

*/

//BROWSER MEIN PAGE PAR KOI BHI HARKAT KARO EVENT RAISE HO JAAEGA.
//KUCH SCREEN PAR HO AUR AAPKO REACTION DENA HO TO US WAQT AAPKO EVENT HANDLE KARNA AANA CHAHIYE!
//EVENT MATLAB HOTA HAI KOI ACTION HUA(eg: click)
//EVENT LISTENER KA MATLAB HAI AAPNE KOI ACTION KA REACTION DIYA.(eg:click hone par screen black se white ho gya)
/* EVENT LISTENER : addEventListener("eventname",function(){})*/
let h1 = document.querySelector("h1");
h1.addEventListener("click",function(){
    h1.style.color = "Red";
});

function dblclick(){
    p1.style.color = "Grey";
    p1.style.fontSize = "18px";
    // Syntax: 'name duration timing-function delay iteration-count direction fill-mode'
    p1.classList.add("animate-me");
};

let p1 = document.querySelector("p");
p1.addEventListener("dblclick", dblclick);
//Removing event listener:
/* p1.removeEventListener("dblclick", dblclick); */
let input = document.querySelector("input");
/* input.addEventListener("input",function(){
    console.log("typed");
}); */
//if you want to print the details of what is getting typed inside the input box we can do that by passing it inside the function.
input.addEventListener("input",function(details){
    //console.log(details.data);//this ".data" prints the actual data that is being enterd into the inout field.
    // for backspace this ".data" = "null" if we dont want to print that we can write the code in this way:
    if(details.data != null){
        console.log(details.data);
    }
});

//

 
