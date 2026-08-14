// fetch is promise based
fetch("https://randomuser.me/api/?results=5")
.then((rawData) =>{
    return rawData.json();
})
.then((data)=>{
    data.results.forEach(function (user) {
        console.log(user.name);
    });
})
.catch((err) => {
    console.log(err)
})