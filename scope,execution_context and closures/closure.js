//closures hote hai functions jo ki kisi parent function ke andar ho aur andar wala function return ho raha ho, and returning function use kare parent function ka koi variable.

/* function abcd(){
    let a  =12;
    return function (){
        console.log(a);
    }
}

let fnc = abcd();
fnc(); */
//variables ko private kar skte hai
//global pollution ko reduce kar skte hai

//ye sach hai function k khatm hone par aapka function and uske variables khatm ho jaate hai, par jab bhi closure banta hai to aapka function aur uske variables ka ek backlink banaya jata hai aur uska naam hota hai [[environment]].

// private counter

function countForMe(){
    let c  =0;
    return function(){
        c++;
        console.log(c)
    }
}

let fnc = countForMe();
fnc();

//encapsulation
function clickLimiter(){
    let click  = 0;
    return function(){
        
        if(click<5){
            click ++;
            console.log(`clicked: ${click} times`);
        } else {
            console.log("Limit Exceeded, Try after some time")
        }
    }
}

let abc = clickLimiter();
abc()
abc()
abc()

abc()
abc()
abc()

