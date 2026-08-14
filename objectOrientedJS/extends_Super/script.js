class User{
    constructor(name,address,username,email){
        this.name= name;
        this.address = address;
        this.username = username;
        this.email= email;
        this.role = "user";
    }

    write(text){
        let h1 = document.createElement("h1");
        h1.textContent = `${this.name}`+": "+text;
        document.body.appendChild(h1);
    }

}

//extends
class Admin extends User{
    //ADMIN HAS ALL THE PROPERTIES OF USER
    constructor(name, address, username, email, role){
        super(name,address,username,email);
        this.role='admin';
    }

    remove(){
        document.querySelectorAll("h1").forEach(function(elem){
            elem.remove();
        })
    }
}

let u1 = new User("Harsh","Bhopal","Async123","hey@hey.com");
let u2 = new User("Harshita","indore","Async1345","hey@hlo.com");

let a1 = new Admin("admin1","india","admin123","a1@a.com");