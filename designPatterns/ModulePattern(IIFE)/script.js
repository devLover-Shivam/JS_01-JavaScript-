//MODULE PATTERN

//Module Pattern ek design pattern hai jisme hum apna code ek self executing function (IIFE) ke andar likhte hain, taki variables aur functions private rahe.

//Iske andar se hum sirf wahi chizein return karte hain jo bahar use karni hain.

//Is pattern ka main fayda hai data hiding (encapsulation) aur clean structure, taaki code secure, reusable aur manageable ban sake.

//iife(immediately invoked function expression)
//constructing private functions with the help of iife

let Bank = (function(){
    let bankBalance = 12000;

    function checkBalance(){
        console.log(bankBalance);
    }

    function setBalance(val) {
        bankBalance = val;
    }

    function withDraw(val) {
        if(val<= bankBalance){
            bankBalance -= val;
            console.log("balance left:" + bankBalance);
        }
    }
    return {
        //yahan bankbalance access nahi karwaana hai nahi to wo bhi bahar access ho jaaega
        checkBalance,
        setBalance,
        withDraw,
    };
    
})();

Bank.checkBalance();
Bank.withDraw(2000);

// to overall module pattern me hum functions banate hai iife k andar taaki wo privae ho jaae aur return karte hai ek object aur jo jo chiz bahar access karna hai usko us return object k andar daal do.

