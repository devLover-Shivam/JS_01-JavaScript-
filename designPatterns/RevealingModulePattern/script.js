//REAVEALING MODULE PATTERN


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
        check: checkBalance,
        set: setBalance,
        draw: withDraw,
    };
    
})();


// to overall revealing module pattern me hum functions banate hai iife k andar taaki wo private ho jaae aur return karte hai ek object aur jo jo chiz bahar access karna hai usko us return object k andar daal do aur us return object me hum returning objects ka naam change kar dete hai instead of original function names.

