const btn = document.querySelector("button");
btn.addEventListener("click",async function () {
    let heavyFunction = await import("./heavy.js");
    heavyFunction.veryHeavy();
})