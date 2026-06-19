// first thing we're going to learn is to make our website adaptable towards our system theme, if our system/pc/laptop is working on dark theme our website will directly load from dark mode.

function setDarkOrLight() {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches){
    document.body.classList.add("dark");
    document.body.classList.remove("light");
    } else {
    document.body.classList.add("light");
    document.body.classList.remove("dark");
    }
}
setDarkOrLight();

window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change",function(){
    setDarkOrLight();
});