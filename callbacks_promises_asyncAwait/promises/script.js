//promises
//aap ek promise banaate ho jo ki do states me se ek state me jaa sakta hai and wo yaa to resolve hoga ya to reject hoga, ab wo kya hoga yeh waqt bataega, par hume code dono conditions ke liye likhna hoga

let pr = new Promise(function(resolve,reject){
    setTimeout(() => {
        let rn = Math.floor(Math.random()*10);
        if(rn>5){
            resolve(rn);
        }else reject(rn);
    }, 3000);
})
//agar promise resolve hua to then chalega
//agar promise reject hua to catch chalega

pr
.then(function(val){
    console.log("Promise Resolved");
    console.log(val);
})
.catch(function(){
    console.log("Promise Rejected");
    console.log(val);
})