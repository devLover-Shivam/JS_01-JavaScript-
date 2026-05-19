//DOM - Document Object Model. DOM represents the HTML structure as a tree of nodes, including how to manipulate elements, attributes, and styles dynamically in JavaScript. It represents the entire HTML document as a tree-like structure of nodes. Everything you see on a website—elements like , , ``, text, and even comments—exists as a node in this tree.

// DOM MANIPULATION:- This is the core skill of building interactive websites. It involves using JavaScript to select, change, add, or remove these nodes to update the page content dynamically without reloading the entire page.

// SELECTING ELEMENTS:- Before you can manipulate a part of your page, you must select it. The modern standard is to use:
    /* querySelector(): To select a single specific element 
    querySelectorAll(): To select multiple elements that match a selector, returning a list-like object */



/* TO SELECT A ELEMENT USING ITS ID
let abcd = document.getElementById("abcd");
console.dir(abcd);// to get all the details of the element
console.log(abcd);
 */

/* TO SELECT A ELEMENT USING ITS CLASS
let abcd = document.getElementsByClassName("abcd");
console.log(abcd) */

/* QUERY SELECTOR(MOSTLY USED IN MODERN TIMES): IT SELECTS ONLY FIRST ELEMENT IF MULTIPLE ELEMENTS ARE PRESENT */
/* let abcd = document.querySelector("h1");
console.log(abcd); */

/* QUERY SELECTOR ALL: IT SELECTS ALL ELEMENTS IF MULTIPLE ELEMENTS ARE PRESENT IN AN ARRAY LIKE STRUCTURE BUT NOT EXACTLY AN ARRAY */


// CHANGING ELEMENTS:- Once you've selected an element, you can change its properties and content.

//Modifying Content: You can update the content of an element using properties like:
/* .innerText and .textContent: To update or get plain text inside an element .
.innerHTML: To insert actual HTML tags, allowing you to change the structure inside the element. */ 

/* let h1 = document.querySelector("h1");
h1.textContent = "Hello World!";
h1.innerText = "Hello World";
h1.innerHTML = "<i> HEy Shivam</>"; */ //To insert actual HTML tags, allowing you to change the structure inside the element.
//console.dir(h1);

//Modifying Attributes: You can update the attributes of an element using properties like:
/* .getAttribute(): To get the value of an attribute.
.setAttribute(): To set the value of an attribute. 

You can control attributes (like links or classes) dynamically using:
.setAttribute(): To set a value.
.getAttribute(): To retrieve a value.
.removeAttribute(): To remove an attribute entirely */

/* let a = document.querySelector("a");
console.dir(a);
a.href = "https://www.facebook.com";
a.setAttribute("href","https://www.google.com"); */

/* let img = document.querySelector("img");
img.setAttribute("src","https://plus.unsplash.com/premium_photo-1686843679750-73b03c230cb2?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDF8Ym84alFLVGFFMFl8fGVufDB8fHx8fA%3D%3D"); */

/* let a = document.querySelector("a");
console.log(a.getAttribute("href"));
a.removeAttribute("href");
console.log(a.getAttribute("href")); */


/* Dynamic Creation: You can go beyond modifying existing tags by creating new elements from scratch using document.createElement() and then attaching them to the page using methods like .append() or .prepend() */
//create element
//append/prepend karo jaha bhi element chahiye.
/* let h1 = document.createElement("h1");
h1.textContent= "hello shivam";
document.body.prepend(h1); *///adds element before script.js
//append -> adds element after script.js

/* let h1 = document.createElement("h1");
h1.textContent = "HEY MAI BAHAR SE AAYA HU!";
document.querySelector("div").appendChild(h1); */

//CHANGING STYLES OF ELEMENTS IN HTML THROUGH JS.
/* let h1 = document.querySelector("h1");
h1.textContent = "kamal khil gaya"
console.dir(h1);
h1.style.color="orange";
h1.style.backgroundColor="pink" */

//preferred method is to add a class or remove a class for adding or removing a style to an element.

let h2 = document.querySelector("h1");
h2.classList.add("hulu")
h2.classList.remove("hulu") // to obviously remove class
h2.classList.toggle("hulu") // agar hati hui hai koi class to toggle usko laga deti hai , aur agar hati hui hai to laga deti hai.



//q1. select all list elements and print their text using a loop.
let lis = document.querySelectorAll("li");
for(let i=0;i<lis.length;i++){
    console.log(lis[i].textContent);
}