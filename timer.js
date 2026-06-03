//setTimeout itself is a function which accepts a function and time in milliseconds. (1000 mS = 1 sec)

//setInterval - keeps on running in a given fixed time interval. 

// the only difference between setTimeout and setInterval is that setInterval keeps on running in the fixed interval of time mentioned but setTimeout runs just once after that interval of time.

/* setTimeout(function(){
    console.log("hello shivam");
},5000); */

// clearTimeout mtlb jab koi timer chalne wala hoga to usko clear kar dega! we need to pass a variable in the clearTimeout section , but we need to store that timer function in that variable first which is needed to be cleared.

//in the same way clearInterval works


let tm = setTimeout(function(){
    console.log("hello shivam");
},5000);

clearTimeout(tm);