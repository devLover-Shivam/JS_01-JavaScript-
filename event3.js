//we want to display a profile card once a user enters his details in the form section and submits it.

//the first step is to stop the window from reloading using dom manipulations.
//whenever we submit our form all the changes in JS gets reloaded and its not permanent

let form = document.querySelector("form");
let main = document.querySelector("#main");

/* form.addEventListener("submit",function (params) {
    params.preventDefault();//this prevents window from reloading.
});
 */
// next step is that we need all the inputs and their answers from it. we can do it in two ways:- 
//1st -> select each element through document.queryselector
//2nd -> select all elements at once through document.querySelectorALL and run a forEach loop.
//its better to use 2nd option rather than creating different variables.
let inputs = document.querySelectorAll("input");
form.addEventListener("submit",function(dets){
    dets.preventDefault();
    //console.log(inputs[0].value,inputs[1].value,inputs[2].value,inputs[3].value,inputs[4].value);//this will print all the answers entered in the input field on console.

    //we'll now create a div for card and a div for profile and then we'll concatenate profile div into the card div.

    let card = document.createElement("div");
    card.classList.add("card");

    let profile = document.createElement("div");
    profile.classList.add("profile");

    card.appendChild(profile);
    console.log(card);

    let img = document.createElement("img");
    img.setAttribute("src",inputs[0].value);

    let h3 = document.createElement("h3");
    h3.textContent = inputs[1].value;
    let h5 = document.createElement("h5");
    h5.textContent = inputs[2].value;
    let p = document.createElement("p");
    p.textContent = inputs[3].value;

    profile.appendChild(img);
    card.appendChild(profile);

    card.appendChild(h3);
    card.appendChild(h5);
    card.appendChild(p);

    main.appendChild(card);

    //upto this everything was hardcoded but we want real data and we want a dynamic cada according to the form inputs.

    inputs.forEach(function(inp){
        if(inp.type!=="submit"){
            inp.value = "";
        }
    })

});
