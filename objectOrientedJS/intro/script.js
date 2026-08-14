//hume sikhna hai factories banana, matlab ki aap ek baar blueprint bana do ki har object kaisa dikhega and hum log naye naye objects with different values bana payenge, yahi upar upar se pura kaam hai oops me

//CONSTRUCTOR FUNCTIONS
function CreatePencil(name, price, color){
    this.name = name;
    this.price= price;
    this.color = color;
    this.write = function (){
        let h1 = document.createElement("h1");
        h1.textContent= name+" "+price+" "+color+" ";
        h1.style.color = color;
        document.body.append(h1)
    }
}

//PROTOTYPES
//agar tumhare constructor function koi fielda apne prototype me attatch karle to us constructor se banne waale sabhi new instances yaani ki objects ke paas wo field automatically chali jaati hai

CreatePencil.prototype.company = "sheryians";


let pencil1 = new CreatePencil("natraj",10,"red");
//usually the value of this is window , but when we use tjhe function with new keyword , it gives a blank object.

let pencil2 = new CreatePencil("doms",10,"green");




let pencil3 = new CreatePencil("linc",10,"blue");