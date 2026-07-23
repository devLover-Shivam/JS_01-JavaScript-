//closures hote hai functions jo ki kisi parent function ke andar ho au r andar wala function return ho raha ho, and returning function use kare parent function ka koi variable.

function abcd(){
    let a  =12;
    return function (){
        console.log(a);
    }
}

//variables ko private kar skte hai
//global pollution ko reduce kar skte hai

//ye sach hai function k khatm hone par aapka function and uske variables khatm ho jaate hai, par jab bhi closure banta hai to aapka function aur uske variables ka ek backlink banaya jata hai aur uska naam hota hai [[enviornment]].
