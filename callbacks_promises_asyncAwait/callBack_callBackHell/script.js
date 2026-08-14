function kuchDerBaadChalunga(fnc){
    setTimeout(fnc, Math.floor(Math.random()*10)*1000);
}

/* kuchDerBaadChalunga(function () {
    console.log("hey");
}); */


//ek function ko agar aap ek aur function bhej de rahe ho parameter me to wo parameter wala function kehlata hai callback.


//CALLBACK HELL
function profileLekarAao(username,cb){
    console.log("Fetching Profile Data...")
    setTimeout(() => {
        console.log(`profile fetched of ${username}`);
        cb({_id:12123,username, age:27,email:"huihui@hui.com"});
    }, 2000);
}
function saarePostLekarAao(id,cb){
    console.log("Fetching All Posts...");
    setTimeout(() => {
        cb({_id: id,posts: ["hey","hello","good morning"]})
    }, 3000);
}

function savedPostsNikaalo(id,cb){
    console.log("Fetching Saved Posts...")
    setTimeout(() => {
        cb({_id: id, saved: [1,2,3,4,5,6]});
    }, 4000);
}
profileLekarAao("harsh", function(data){
    console.log(data);
    saarePostLekarAao(data._id,function(posts){
        console.log(posts);
        savedPostsNikaalo(data._id,function(saved){
            console.log(saved);
        })
    })
});