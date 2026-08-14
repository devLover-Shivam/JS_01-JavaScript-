//async sync

// aisa code jo line by line chale wo hota hai sync code

//aisa code jo jab chalne k liye ready ho jaae tab chale wo hai asynchronous(async)

function task1() {
    setTimeout(() => {
        console.log("Task 1 completed");
    }, 2000);
}//async function

function task2() {
    console.log("Task 2 completed");
}//sync function

task1();
task2();

console.log("All tasks completed");