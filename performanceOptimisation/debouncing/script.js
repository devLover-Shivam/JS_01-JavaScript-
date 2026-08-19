//debouncing -> aap koi action kar rahe ho aur aap yeh nahi chahte ho ki har action par kuch ho, jab bhi mere actions k beech mein koi specific gap aae to fir action perform hoga.
let input = document.querySelector("input");
//is event listener me agar hum input k saath ek normal function use kar lenge to jaise hi input hoga to wo function turant activate ho jaaega , jo hume nahi chahiye hume chahiye ki wo function thore der baad execute ho , same jaise hum product suggestion milta hai jab hum koi product search karte hai search box me aur thori der rukte hai us k bad suggestions dikhte hai hume.

function debounce(fnc,delay){
    return function(){

    }
}
input.addEventListener("input",debounce(function(){},1000));
//jaise hi humne function k baad koi bracket lagaya hai waise hi wo function run kar chuka hai example debounce() is brackets k wajah se already run ho chuka hai jaise hi js ise read karega wo chal chuka hoga


//jaise hi js load hua , input select ho chuka hai, humare debounce function me function jaa chuka hai , delay of 1000ms bhi jaa chuka hai


//yahan debounce ek function hai jo ek function run karega aur ek particular delay par run karega.