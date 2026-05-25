//since the actual input field for choosing a file is hidden we created a custom input button and now we want that when we select that custom button the actual input field should be selected.

let btn  = document.querySelector("#btn");
let fileinp = document.querySelector("#fileinp");

btn.addEventListener("click",function(){
    fileinp.click();//so when we click on our function this function make them actually click on the input field.
})

// now we want to reflect the name of the actual file that's selected after clicking on "UPLOAD FILE" instead of "UPLOAD FILE".
fileinp.addEventListener("change",function(dets){
    //console.log(dets.target.files[0].name);
    const file = dets.target.files[0];
    if(file){
        btn.textContent =file.name;
    }
});
