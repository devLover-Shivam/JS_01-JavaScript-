//PROTOTYPAL INHERITANCE VS CLASSICAL INHERITANCE

//INHERITANCE = CLASS -> CLASS

/* 
CLASSICAL INHERITANCE:- JAVA CPP sab me hota hai
-> classes bana k usko extend karna

PROTOTYPAL INHERITANCE:- SIRF JS ME AVILABLE HAI
= OBJECT -> OBJECT (object object se inherit karta hai)
ek object hai aap chaho to uski saari props/methods ko inherit kara dete ho dusre object mein
*/
let coffee = {
    color: "dark",
    drink: function(){
        console.log("gut gut gut")
    },
};

let arabiataCoffee = Object.create(coffee);
arabiataCoffee.taste="bitter";
console.log(arabiataCoffee.drink());

