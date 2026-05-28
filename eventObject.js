/* 
Event Object—often referred to as details, e, or evt—as the comprehensive set of information generated whenever an event occurs on a webpage.

Key features of the Event Object:

Accessing Details: When you attach an event listener to an element (like a div or button), the function you pass to it automatically receives this object as an argument. It contains every detail about the interaction that triggered the event.

The target Property: This is one of the most critical parts of the event object. It identifies the exact element that was clicked or interacted with, allowing you to manipulate specific parts of the DOM dynamically.

The type Property: This tells you the specific kind of event that occurred (e.g., 'click', 'submit', 'mouseover'). This is particularly useful if you have a single function that handles multiple different events on the same element, as you can use this to differentiate your logic 

preventDefault(): This method is highlighted as an essential tool for handling forms. By calling details.preventDefault() inside a submit event listener, you can stop the browser's default behavior—which is to reload the page upon form submission—allowing you to process data using JavaScript without losing the current state of the page 

*/