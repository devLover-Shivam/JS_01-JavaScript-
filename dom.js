//DOM - Document Object Model. DOM represents the HTML structure as a tree of nodes, including how to manipulate elements, attributes, and styles dynamically in JavaScript. It represents the entire HTML document as a tree-like structure of nodes. Everything you see on a website—elements like , , ``, text, and even comments—exists as a node in this tree.

// DOM MANIPULATION:- This is the core skill of building interactive websites. It involves using JavaScript to select, change, add, or remove these nodes to update the page content dynamically without reloading the entire page.

// SELECTING ELEMENTS:- Before you can manipulate a part of your page, you must select it. The modern standard is to use:
    /* querySelector(): To select a single specific element 
    querySelectorAll(): To select multiple elements that match a selector, returning a list-like object */

// CHANGING ELEMENTS:- Once you've selected an element, you can change its properties and content.

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