// Debouncing:
// Aap koi action baar-baar kar rahe ho, lekin aap nahi chahte ki har action ke turant baad function execute ho.
// Debouncing mein function tabhi execute hota hai jab user ke actions ke beech ek fixed amount ka gap aa jaaye.
// Example: Search box mein user continuously type kar raha hai, to har key press par API call nahi karni.
// User jab type karna rok dega aur 1 second ka gap aa jaayega, tab function execute hoga.

let input = document.querySelector("input");

// Agar hum input event ke saath directly ek normal function laga dein,
// to jaise hi user input karega, function turant execute ho jaayega.
// Lekin humein har key press par function execute nahi karna hai.
// Humein chahiye ki user thoda rukne ke baad function execute ho.
//
// Real-life example:
// Jab hum kisi e-commerce website ke search box mein "iphone" type karte hain,
// to har letter type karte hi product suggestions ke liye request nahi bhejni chahiye.
// User ke type karna rokne ke baad, maan lo 1 second wait karke,
// tab suggestions ke liye function execute karna better hai.

function debounce(fnc, delay){
    let timer;

    return function(...args){
        // Agar user ne dobara input kiya hai,
//         to pehle se laga hua timer cancel kar do.
//         Matlab purana countdown ab valid nahi hai.
        clearTimeout(timer);

        // Ab user ke latest action ke baad naya timer start karo.
//         Agar delay ke andar user dobara input karta hai,
//         to upar wala clearTimeout() is timer ko bhi cancel kar dega.
        timer = setTimeout(()=>{
            // Agar user ne delay ke poore time tak koi naya input nahi diya,
//             tab actual function execute hoga.
            fnc(...args);
        },delay)
    }
}

// Yahan debounce() ko call karke uske andar actual function aur delay pass kar rahe hain.
// debounce() ek naya function return karega.
// Event listener ko wahi returned function milega.
// Ab har input par actual function directly execute nahi hoga,
// balki debounce ke rules ke according execute hoga.

input.addEventListener("input", debounce(function(){
    console.log("debounced")
},1000));

// Important:
// Jab kisi function ke naam ke baad () lagate hain, to hum us function ko CALL kar rahe hote hain.
// Example: debounce()
// Is case mein debounce() turant execute hoga aur jo function return karega,
// woh returned function addEventListener ko mil jaayega.
//
// Iska matlab yeh nahi hai ki console.log("debounced") turant execute ho gaya.
// Actual console.log wala function debounce ke andar setTimeout ke through 1000ms baad execute hoga.


// Jab JavaScript code load hota hai:
// 1. input element select ho jaata hai.
// 2. debounce() call hota hai.
// 3. debounce ko actual function (fnc) aur 1000ms ka delay mil jaata hai.
// 4. debounce() ek naya function return karta hai.
// 5. addEventListener ko wahi returned function de diya jaata hai.
//
// Abhi console.log("debounced") execute nahi hua hai.
// Woh tab execute hoga jab user input karega aur uske baad 1000ms tak koi naya input nahi karega.


// debounce() se jo function return hota hai,
// wahi function addEventListener ke input event ke saath attach hota hai.
// Isliye jab bhi input event trigger hota hai,
// returned function execute hota hai.
// Returned function pehle purana timer clear karta hai,
// phir latest input ke liye naya timer set karta hai.


// Simple words mein:
// debounce ek aisa function hai jo kisi doosre function ko control karta hai.
// Woh doosre function ko tabhi execute hone deta hai
// jab user ke actions ke beech given delay ka gap aa jaaye.
//
// Is example mein:
// delay = 1000ms
// Matlab user ke last input ke 1 second baad "debounced" print hoga,
// provided ki us 1 second ke andar user ne dobara input na diya ho.