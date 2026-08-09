// this keyword special(keyword hai yaani special special word), kyuki jaise ki baaki saare keyword ki value ya unka nature same rehta hai this ki value ya nature change ho jaata hai is baat se ki aap usey kahan use kar rhe ho.

//global scope -> this = window
//window hai pradhan mantri - supreme
console.log(this);

//function scope -> this = window
function abcd(){
    console.log(this);
}
abcd();

//method
// function inside object is called a method
//inside object -> this returns the complete object
let obj = {
    name: "shivam",
    sayName: function (){
        //yahan agar normal function k jagah humne arrow function use kiya hota to wahan this apna value change kar leta aur object k jagah fir e window function return karta.
        console.log(this.name);
    },
};
obj.sayName();

//Event Handler
//event handler me this wahi hota hai jis par event listener laga hota hai, jaise is case me h1 par event handler laga hua hai to this = h1;
document.querySelector("h1")
.addEventListener("click",function(){
    console.log(this)
});

//Class

class Abcd{

    constructor(){
        console.log("hey");
        this.a = 12;
    }
}

let val= new Abcd();
console.log(val);


/* OVERALL DIFFERENT VALUE OF THIS SUMMARISED:-

global scope
→ window

normal function called normally
→ window (non-strict browser)

method using normal/ES5 function
→ object

arrow function used as method
→ surrounding this
→ commonly window in this example

normal function inside normal method
→ window (if called normally)

arrow function inside normal method
→ object

event handler using normal function
→ element

class constructor
→ newly created instance/object

*/