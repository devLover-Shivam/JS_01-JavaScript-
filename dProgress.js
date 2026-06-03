//we're creating a download progress bar
let count = 0;
let progress = document.querySelector(".progress-bar");
let per  = document.querySelector("#percentage");

let intv = setInterval(function(){
    if(count<=99){
        count++;
        progress.style.width = `${count}%`;
        per.textContent = `${count}%`;
    } else {
        document.querySelector("h2").textContent = "DOWNLOADED!!!";
        clearInterval(intv);
    }
},300);