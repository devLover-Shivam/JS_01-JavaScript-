// localStorage -> aapke browser k andar data store karna jo ki browser band hone par bhi delete nhi hoga!

//sessionSotrage -> ye aapka data temporarily store karta hai matlab ki tab band hua aur data gaya!

//cookies -> ye bhi data store karta hai and aapka data browser ke cookies naam ki property mein save hota hai and ye cookie kam data ya light data k liye use hota hai!


// inside localStorage there are 4 things to learn basically:-
// data store kaise kare? - setItem -> agar koi property nhi hai to bana deta hai aur agar property hoti hai to usko overwrite kar deta hai !

// data fetch kaise kare? - getItem
// data remove kaise kare? - 
// data update kaise kare? -

//Store:-
localStorage.setItem("name","shivam");

//Fetch:-
let val = localStorage.getItem("name");
console.log(val);

//Remove:-
localStorage.removeItem("name");

//Update:-
localStorage.setItem("name","gupta ji");
localStorage.setItem("name","shivam kr gupta ji");

localStorage.removeItem("name");

//SESSION STORAGE AND ITS FUNCTIONS ARE ALSO SAME AS THE LOCAL STORAGE THE ONLY DIFFERENCE IN THEM IS THAT SESSION STORAGE LOSES ITS DATA AS THE TAB IS CLOSED, EVEN IF THE TAB IS REFRESHED SESSION STORAGE KEEPS ITS DATA BUT WHENEVER THE TAB IS CLOSED , IT LOOSES ITS DATA.

//COOKIES:- BROWSER ME CHOTA DATA STORE KARNE K LIYE COOKIES KA USE HOTA HAI ~4KB
//cookies me jo bhi data store karoge wo data page reload par automatically server par jaayega.


// use document.cookie = "value"; to set a coookie

// localStorage only accepts strings, it cant store arrays or objects, and if you want to store them we need to convert them into strings we need to use JSON.stringify

localStorage.setItem("friends",JSON.stringify(["shaili", "priyanshu","sumit"]));

//while getting it back we'll get those values in sttrings only, if we want to get back it in it's original form we need to use JSON.parse for that.

let fr  = JSON.parse(localStorage.getItem("friends"));
console.log(fr);