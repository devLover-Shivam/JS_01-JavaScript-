console.log("JS FILE CONNECTED");
let form = document.querySelector("form");
let username = document.querySelector("#name");
let role = document.querySelector("#role");
let bio = document.querySelector("#bio");
let photo = document.querySelector("#photo");
const userManager = {

    users : [],
    //init function executes whenever we need to execute something by default
    init: function(){
       form.addEventListener("submit",this.submitForm.bind(this));
    },
    submitForm: function(e){
        e.preventDefault();
        this.addUser();
    },
    addUser: function(){
        this.users.push({
            username : username.value,
            role: role.value,
            bio: bio.value,
            photo: photo.value,
        });

        form.reset();// to reset all the values after submitting 
        this.renderUI();// to render the ui for the submitted form
    },
    renderUI: function(){
        document.querySelector(".profiles-container").innerHTML="";
        this.users.forEach(function(user){
            let card = document.createElement("div");
            card.className = "profile-card";

            let img = document.createElement("img");
            img.src = user.photo;
            img.alt = "User Photo";

            let h2 = document.createElement("h2");
            h2.textContent = user.username;

            let role = document.createElement("p");
            role.className = "role";
            role.textContent = user.role;

            let bio = document.createElement("p");
            bio.className = "bio";
            bio.textContent = user.bio;

            card.appendChild(img);
            card.appendChild(h2);
            card.appendChild(role);
            card.appendChild(bio);

            
            document.querySelector(".profiles-container").appendChild(card);
            })
    },
    removeUser: function(){},

};

userManager.init();