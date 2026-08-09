//call apply bind
//function ko call karte waqt aap set kar skte ho this ki value kya hogi.

let obj = {
    name:"shivam",

};

function abcd(a, b, c){
    console.log(this, a, b, c);
}
abcd();

abcd.call(obj,1,2,3); // call ka use kar k abcd ko call kiya gaya aur fir usme obj paas kar k this ki value obj set kar di gayi.

// apply bhi use hota hai function call k liye hi, lekin wo kehta hai usme sirf 2 paramters pass ho sakte hai , jo 1,2,3 humne pass kiya use ek array k andar store karna padega apply use karte waq jo dusra parameter hoga aur pehla paramtere humara obj hoga jo value hum set karenge this k liye

abcd.apply(obj,[4,5,6]); // hume function me koi change nhi karna hai parameter pass karne k liye bas apply use karte hue function k parameters ko array me store kar k pass karna hai apply me.
//bohot zyada use nahi karte hai isko.

let fnc = abcd.bind(obj,1,2,3);