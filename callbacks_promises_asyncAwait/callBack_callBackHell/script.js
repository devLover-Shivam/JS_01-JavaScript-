function kuchDerBaadChalunga(fnc){
    setTimeout(fnc, Math.floor(Math.random()*10)*1000);
}

kuchDerBaadChalunga(function () {
    console.log("hey");
});


//ek function ko agar aap ek aur function bhej de rahe ho parameter me to wo parameter wala function kehlata hai callback.