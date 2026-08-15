class YoutubeChannel{
    constructor(name){
        this.name = name;
        this.subscribers = [];
        this.unsubscribers=[];
    }

    subscribe(user){
        this.subscribers.push(user);
        user.update(`${user.name} -You Have Subscribed the Channel`);
    }
    unsubscribe(user){
        this.unsubscribers.push(user);
        this.subscribers=this.subscribers.filter((sub)=> sub !== user);
        user.update(`${user.name}-You Have Unsubscribed the Channel `);
    }
    notify(message){
    this.subscribers.forEach(sub => {
        sub.update(`${this.name}: ${message}`);
    });
}
}

class User{
    constructor(name){
        this.name = name;
    }
    update(data){
        console.log(`${this.name},${data}`);
    }
}

let sheryians =  new YoutubeChannel("Sheryians Coding School");
let user1 = new User("shivam");
let user2 = new User("amit");

sheryians.subscribe(user1);
sheryians.unsubscribe(user2);
sheryians.notify("Uploaded New Video..");
