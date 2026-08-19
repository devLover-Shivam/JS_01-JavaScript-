//debounce -> ek delay bataoge tum utna delay jab bhi aayega tumhe action ka reaction milega.

//throttle -> interal par chalunga, action agar hota raha aur aapne ek interval bataya to utne interval me aapka event chalega.

let input  =  document.querySelector("input");

function throttle(fnc, delay){
    let timer =0;
    return function (...args){
        let now = Date.now();
        if(now-timer >= delay)
        {
            timer = now;
            fnc(...args);
        }
    };   
}
input.addEventListener("input",throttle(function (){
    console.log("throttling in every 1s")
},1000));