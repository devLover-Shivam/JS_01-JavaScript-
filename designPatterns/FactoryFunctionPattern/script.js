//FACTORY FUNCTION PATTERN

//ek function banate ho jo objects create karta hai (factory = object banane ki machine)

//factory function pattern ek aisa design pattern hai jisme ek simple function likhte hai jo naye objects banakar return karta hai, bina class ya new keyword use kiye

//is pattern ka main idea hai -> object creation ko ek function ke through control karna.

//har baar jab hum factory function call karte hai, ek naya object milta hai jisme apne methods aur (agar chaho to ) private data ho sakta hai.

// yeh pattern speciall useful hai jab ek hi type k bohot saare objects chahiye, jaise users, products, tasks etc. 

function createProduct(naame, price) {
    let stock = 10;

    return{
        //everything written inside return statement acts like constructors and classes because usually we create object using the constructor and classes but here we're making objects with the help of functions only.
        name,
        price,

        checkStock(){
            console.log(`${stock} pieces are in the stock.`)
        },
        buy(qty){
            if(qty<=stock){
                stock -= qty;
                console.log(`${qty} pieces booked - ${stock} pieces left`);
            } else{
                console.error(`We only have ${stock} pieces left. Please Order Within The Stock Amount`);
            }
        },

        refill(qty){
            stock += qty;
            console.log(`refilled the stock - ${sotck} pieces now`);
        }
    }
}

let iphone = createProduct("iphone17",70000);
iphone.buy(23);

let kitKat = createProduct("KitKat-D",30);
kitKat.buy(9);