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



//Q1. Select all list elements and print their text using a loop

let lis = document.querySelectorAll("li");

for(let i = 0; i < lis.length; i++){
    console.log(lis[i].textContent);
}

/* Intuition:
First collect all the <li> elements from the page, then visit each element one by one and print the text written inside it.

Code Explanation:

querySelectorAll("li") selects all list items and stores them in a NodeList.
The for loop runs from index 0 to the last element.
textContent extracts only the text inside each <li>.
console.log() prints the text in the console. */

//Q2. Add a highlight class to every even item in a list

let li = document.querySelectorAll("ul li:nth-child(2n)");

console.log(li);

li.forEach(function(elem){
    elem.classList.add("highlight");
});

/* Intuition:
Instead of manually checking which items are even, CSS selector nth-child(2n) directly selects every even list item. Then a class is added to style them.

Code Explanation:

ul li:nth-child(2n) selects all even <li> elements inside a <ul>.
forEach() loops through each selected element.
classList.add("highlight") adds the highlight class to every even item.
This is commonly used for alternating colors or emphasis in lists. */

//Q3. Set the font size of all <p> elements to 18px using style
let p = document.querySelectorAll("p");

console.log(p);

p.forEach(function(elm){
    elm.classList.add("size");
});

/* Intuition:
Select all paragraph elements and apply a common styling to each one so every paragraph gets the same font size.

Code Explanation:

querySelectorAll("p") selects all paragraph elements.
forEach() iterates through every paragraph.
classList.add("size") adds a CSS class named size.
The actual font size (18px) should be defined inside CSS for the .size class.

Example CSS:

.size{
    font-size: 18px;
} */

/* CONFUSION:

innerHTML: This should generally be avoided if you only want to set text. It processes the content as HTML. For example, if you pass an `<i>` tag, it will render the text in italics.
innerText and textContent: These properties are used for text manipulation. If you try to insert an HTML tag using these, the browser will display the literal tag (e.g., `<i>`) on the screen rather than rendering it as formatting.
In short, innerHTML parses HTML content, while innerText and textContent treat the input strictly as plain text.
And innerHTML is comparitively slower than the textContent process.
*/