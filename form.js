// to validate a form there are certain conditions that needs to be satisfied, else it cant be validated
// for example name should've some character limits
// password should contain atleast 8 characters including special characters
// email like this a@a.a shouldn't get accepted it should be in a proper form
// all the sections should be filled then only the form should get accepted else not.
// and to satisfy these conditions we need to learn form validation.

let nm = document.querySelector("#name");
let form = document.querySelector("form");

/* form.addEventListener("submit", function(dets){
    dets.preventDefault();
    if(nm.value.length <=2){
        document.querySelector("#hide").style.display = "initial";

    }
    else{
      document.querySelector("#hide").style.display = "none";  
    }
}); */

//now we need to know about regex code which is not generally remembered or you know you need to use it through google

form.addEventListener("submit", function(dets){
    dets.preventDefault();
    const regex = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;
   let ans =  regex.test("bh@bh.a");
   console.log(ans);
});