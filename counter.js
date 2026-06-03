//we're making a backwards counter.
let count = 10;
let interval = setInterval(function () {
    if(count>=0){
        console.log(count);
        count--;
        
    } else{
        clearTimeout(interval);
    }
    
},1000);