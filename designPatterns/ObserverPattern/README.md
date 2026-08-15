# Observer Pattern in JavaScript

## Overview

The **Observer Pattern** is a behavioral design pattern used when one object needs to notify multiple other objects whenever something changes.

It creates a **one-to-many relationship**:

```text
One Subject
     |
     ├── Observer 1
     ├── Observer 2
     ├── Observer 3
     └── Observer 4
```

Whenever something happens to the Subject, all registered Observers can be notified automatically.

A simple real-world example is YouTube:

```text
YouTube Channel
      |
      ├── Subscriber 1
      ├── Subscriber 2
      └── Subscriber 3

New video uploaded
      ↓
Channel notifies subscribers
      ↓
Subscribers receive notification
```

In our code:

```text
YoutubeChannel = Subject
User           = Observer
subscribers    = List of Observers
notify()       = Send update to Observers
```

---

# 1. Why Do We Need the Observer Pattern?

Imagine a YouTube channel has 100,000 subscribers.

Whenever a new video is uploaded, the channel should notify its subscribers.

A poor approach would be to manually write:

```js
user1.notify();
user2.notify();
user3.notify();
user4.notify();
```

This becomes impossible to maintain when the number of users grows.

Instead, the channel maintains a list:

```js
this.subscribers = [];
```

Whenever something happens:

```js
notify(message)
```

the channel simply loops through the list and tells every subscriber.

This gives us:

```text
One event
   ↓
One Subject
   ↓
Many Observers
   ↓
Automatic notification
```

---

# 2. The Two Main Roles

The Observer Pattern usually has two important participants.

## Subject

The object whose state or activity other objects care about.

In this example:

```js
YoutubeChannel
```

The channel knows:

* Who subscribed
* Who unsubscribed
* Who should receive notifications

## Observer

The object that wants to receive updates.

In this example:

```js
User
```

The user provides:

```js
update()
```

which is called when the channel sends a notification.

So:

```text
YoutubeChannel
       |
       | notifies
       ↓
     User
```

---

# 3. Understanding the `YoutubeChannel` Class

Our class starts with:

```js
class YoutubeChannel {
    constructor(name) {
        this.name = name;
        this.subscribers = [];
        this.unsubscribers = [];
    }
}
```

The constructor initializes three pieces of information.

### `this.name`

```js
this.name = name;
```

Stores the channel name.

For example:

```js
let sheryians = new YoutubeChannel("Sheryians Coding School");
```

means:

```text
sheryians.name
      ↓
"Sheryians Coding School"
```

### `this.subscribers`

```js
this.subscribers = [];
```

This is an array that stores all currently subscribed users.

Initially:

```text
subscribers = []
```

After Shivam subscribes:

```text
subscribers = [user1]
```

If Amit also subscribes:

```text
subscribers = [user1, user2]
```

### `this.unsubscribers`

```js
this.unsubscribers = [];
```

This array stores users who have unsubscribed.

It is not strictly required for the basic Observer Pattern, but your code uses it to keep track of unsubscribed users.

---

# 4. Understanding `subscribe()` in the Simplest Way

The method is:

```js
subscribe(user) {
    this.subscribers.push(user);
    user.update(`${user.name} -You Have Subscribed the Channel`);
}
```

At first glance this may look complicated, but it is doing only **two things**:

```text
1. Add the user to subscribers
2. Tell the user that they subscribed
```

Let's break it down.

---

## Step 1: `subscribe(user)`

```js
subscribe(user)
```

The method receives a `User` object.

For example:

```js
let user1 = new User("shivam");
```

When we call:

```js
sheryians.subscribe(user1);
```

inside the method:

```text
user = user1
```

---

## Step 2: Add the User to the Subscriber List

```js
this.subscribers.push(user);
```

Here:

```js
this.subscribers
```

refers to the subscribers of the current channel.

Initially:

```text
[]
```

After:

```js
this.subscribers.push(user1);
```

it becomes:

```text
[user1]
```

So `push()` simply means:

> Put this user into the subscriber list.

You can imagine it like a register:

```text
SUBSCRIBER REGISTER

1. Shivam
2. Amit
3. Rahul
```

Every time somebody subscribes, their object is added to the list.

---

## Step 3: Notify the User

Then:

```js
user.update(
    `${user.name} -You Have Subscribed the Channel`
);
```

We call the user's:

```js
update()
```

method.

For `user1`:

```js
user.name
```

is:

```text
shivam
```

So the message becomes:

```text
shivam - You Have Subscribed the Channel
```

Then:

```js
user.update(...)
```

calls:

```js
update(data) {
    console.log(`${this.name},${data}`);
}
```

So the output becomes:

```text
shivam,shivam - You Have Subscribed the Channel
```

### In simple words

`subscribe()` means:

```text
User wants to subscribe
        ↓
Add user to subscribers array
        ↓
Send confirmation to that user
```

---

# 5. Understanding `unsubscribe()` in the Simplest Way

The method is:

```js
unsubscribe(user) {
    this.unsubscribers.push(user);
    this.subscribers = this.subscribers.filter(
        (sub) => sub !== user
    );
    user.update(`${user.name}-You Have Unsubscribed the Channel`);
}
```

Again, it is doing three things:

```text
1. Add user to unsubscribers
2. Remove user from subscribers
3. Tell the user that they unsubscribed
```

Let's understand each line.

---

## Step 1: Save the Unsubscribed User

```js
this.unsubscribers.push(user);
```

Suppose:

```js
sheryians.unsubscribe(user2);
```

Then `user2` is added to:

```text
unsubscribers
```

So:

```text
unsubscribers = [user2]
```

---

# 6. The Most Important Line: `filter()`

This is probably the most confusing line in your code:

```js
this.subscribers = this.subscribers.filter(
    (sub) => sub !== user
);
```

Let's make it extremely simple.

Suppose:

```text
subscribers = [user1, user2, user3]
```

and:

```text
user = user2
```

We want:

```text
[user1, user3]
```

How does `filter()` do that?

It checks every subscriber one by one.

The callback:

```js
(sub) => sub !== user
```

asks:

> "Is this subscriber different from the user I want to remove?"

---

## Filter Dry Run

Suppose:

```text
subscribers = [user1, user2, user3]
user = user2
```

### First iteration

```text
sub = user1
```

Check:

```text
user1 !== user2
```

`true`

So user1 stays.

---

### Second iteration

```text
sub = user2
```

Check:

```text
user2 !== user2
```

`false`

So user2 is removed.

---

### Third iteration

```text
sub = user3
```

Check:

```text
user3 !== user2
```

`true`

So user3 stays.

Final result:

```text
[user1, user3]
```

Therefore:

```js
this.subscribers = ...
```

replaces the old array with the filtered array.

### In simple words

```text
Keep everyone
EXCEPT
the person who unsubscribed
```

That's all this line is doing.

---

# 7. Why Do We Use `sub !== user`?

Because we want to remove the **exact user object**.

For example:

```js
user1 = new User("shivam");
```

and:

```js
user2 = new User("shivam");
```

may have the same name, but they are still different objects.

JavaScript compares objects by reference.

So:

```js
user1 !== user2
```

is `true`.

That is why our code removes the exact object that was passed to:

```js
unsubscribe(user)
```

---

# 8. Final Step of `unsubscribe()`

After removing the user:

```js
user.update(
    `${user.name}-You Have Unsubscribed the Channel`
);
```

the user receives a confirmation.

For example:

```text
amit,amit-You Have Unsubscribed the Channel
```

So the whole method can be remembered as:

```text
unsubscribe(user)
       ↓
Save user in unsubscriber list
       ↓
Remove user from subscriber list
       ↓
Tell user they unsubscribed
```

---

# 9. Understanding `notify()` in the Simplest Way

This is the most important Observer Pattern method:

```js
notify(message) {
    this.subscribers.forEach(sub => {
        sub.update(`${this.name}: ${message}`);
    });
}
```

Its job is extremely simple:

> Send the same notification to every currently subscribed user.

---

# 10. Breaking Down `notify()`

Suppose:

```text
subscribers = [user1, user2, user3]
```

and we call:

```js
sheryians.notify("Uploaded New Video..");
```

The method receives:

```text
message = "Uploaded New Video.."
```

Now:

```js
this.subscribers.forEach(...)
```

means:

> Go through every subscriber one by one.

---

# 11. Understanding `forEach()`

This:

```js
this.subscribers.forEach(sub => {
```

can be understood as:

```text
Take every subscriber
and call this function for each subscriber.
```

Suppose:

```text
subscribers = [user1, user2, user3]
```

Then:

```text
1st iteration → sub = user1
2nd iteration → sub = user2
3rd iteration → sub = user3
```

---

# 12. Calling `update()`

Inside the loop:

```js
sub.update(`${this.name}: ${message}`);
```

The current subscriber receives the notification.

Because:

```js
this.name
```

is:

```text
Sheryians Coding School
```

and:

```js
message
```

is:

```text
Uploaded New Video..
```

the generated message becomes:

```text
Sheryians Coding School: Uploaded New Video..
```

Then the current user's:

```js
update()
```

method receives that message.

---

# 13. Why Is `update()` in the `User` Class?

The `User` class has:

```js
update(data) {
    console.log(`${this.name},${data}`);
}
```

The channel doesn't care **how** the user handles the notification.

It simply says:

```text
"Hey subscriber, something happened."
```

and calls:

```js
user.update(...)
```

The user decides what to do.

For now:

```js
update(data) {
    console.log(...)
}
```

prints the message.

But in a real application, `update()` could:

```text
Show a browser notification
Send an email
Update UI
Play a sound
Update notification count
Send a push notification
Store notification in database
```

This separation of responsibility is one of the important strengths of the Observer Pattern.

---

# 14. Complete Code Execution Flow

Now let's execute the entire program from beginning to end.

---

## Step 1: Create YouTube Channel

```js
let sheryians = new YoutubeChannel("Sheryians Coding School");
```

The constructor runs:

```js
constructor(name) {
    this.name = name;
    this.subscribers = [];
    this.unsubscribers = [];
}
```

So the object becomes conceptually:

```text
sheryians
│
├── name = "Sheryians Coding School"
├── subscribers = []
└── unsubscribers = []
```

---

# 15. Step 2: Create Users

```js
let user1 = new User("shivam");
let user2 = new User("amit");
```

Now:

```text
user1
└── name = "shivam"

user2
└── name = "amit"
```

---

# 16. Step 3: Shivam Subscribes

```js
sheryians.subscribe(user1);
```

Inside `subscribe()`:

```js
this.subscribers.push(user);
```

Array becomes:

```text
subscribers = [user1]
```

Then:

```js
user.update(...)
```

prints:

```text
shivam,shivam -You Have Subscribed the Channel
```

---

# 17. Step 4: Amit Unsubscribes

```js
sheryians.unsubscribe(user2);
```

First:

```js
this.unsubscribers.push(user2);
```

So:

```text
unsubscribers = [user2]
```

Then:

```js
this.subscribers.filter(...)
```

tries to remove `user2`.

But notice something important:

```text
subscribers = [user1]
```

`user2` was never subscribed.

Therefore there is actually nothing to remove.

The subscriber list remains:

```text
subscribers = [user1]
```

Then Amit receives:

```text
amit,amit-You Have Unsubscribed the Channel
```

Strictly speaking, this is a small logical issue in the current implementation: the code says Amit unsubscribed even though Amit was never subscribed.

A production implementation would normally check whether the user is actually subscribed before confirming the unsubscribe.

---

# 18. Step 5: New Video Is Uploaded

Now:

```js
sheryians.notify("Uploaded New Video..");
```

Current subscribers:

```text
[user1]
```

So `forEach()` runs once.

```text
sub = user1
```

Then:

```js
user1.update(
    "Sheryians Coding School: Uploaded New Video.."
);
```

The User object executes:

```js
update(data) {
    console.log(`${this.name},${data}`);
}
```

Output:

```text
shivam,Sheryians Coding School: Uploaded New Video..
```

---

# 19. Complete Execution Diagram

The entire program can be visualized as:

```text
                 YoutubeChannel
                 "Sheryians"
                      |
          ┌───────────┴───────────┐
          |                       |
     subscribers             unsubscribers
          |                       |
        user1                    user2
       (shivam)                  (amit)
          |
          |
       notify()
          |
          ↓
    user1.update()
          |
          ↓
   "New Video Uploaded"
```

---

# 20. Observer Pattern in Production

The YouTube example is just a simple demonstration.

The same pattern appears in real software systems.

For example, imagine an e-commerce order:

```text
Order Service
      |
      ├── Email Service
      ├── Inventory Service
      ├── Payment Service
      ├── Analytics Service
      └── Notification Service
```

When an order is created:

```text
Order Created
      ↓
Notify observers
      ↓
Email Service → Send confirmation
Inventory     → Reduce stock
Analytics     → Record event
Notification  → Notify user
```

The Order Service doesn't need to manually implement all these operations inside itself.

It simply publishes an event.

This makes the system more modular.

---

# 21. Another Production Example: UI State

Consider a frontend application.

Suppose the user's login state changes:

```text
User logged in
      ↓
Authentication state changes
      ↓
Observers are notified
      |
      ├── Navbar updates
      ├── Profile component updates
      ├── Sidebar updates
      └── Notification system updates
```

This is fundamentally the same idea as:

```js
channel.notify()
```

One source of change informs multiple interested components.

---

# 22. Why Is This Better Than Direct Communication?

Imagine `YoutubeChannel` directly knew about:

```text
EmailService
NotificationService
DatabaseService
AnalyticsService
MobileApp
WebApp
```

Then it would become tightly coupled to all of them.

Instead:

```text
Subject
  |
  ↓
Notify observers
```

The Subject doesn't need to know the internal implementation of every Observer.

It only needs to know that an Observer provides:

```js
update()
```

This is a major benefit.

---

# 23. Loose Coupling

The Observer Pattern helps reduce **tight coupling**.

The channel knows:

```text
"I have subscribers."
```

It does not need to know:

```text
"How each subscriber handles the notification."
```

For example, one User could:

```js
update(data) {
    console.log(data);
}
```

Another observer could:

```js
update(data) {
    sendEmail(data);
}
```

Another:

```js
update(data) {
    showBrowserNotification(data);
}
```

The channel can still do:

```js
sub.update(message);
```

without knowing what happens inside.

---

# 24. The Core Contract

The Observer Pattern creates a simple contract:

```text
Observer must provide:
       ↓
    update()
```

As long as an object has:

```js
update(data)
```

the Subject can notify it.

This means the Observer Pattern does not necessarily require every observer to be a `User` class.

For example:

```js
class MobileNotification {
    update(message) {
        console.log("Mobile:", message);
    }
}
```

It could also be subscribed if it follows the same interface.

---

# 25. Advantages

### Loose Coupling

The Subject doesn't need to know the Observer's internal implementation.

### Automatic Notification

All registered observers can be notified from one place.

### Easy to Extend

You can add new observers without heavily modifying the Subject.

### Reusable Communication Model

The same approach can work for:

```text
Notifications
Events
UI updates
State changes
Messaging systems
Analytics
Order processing
```

---

# 26. Drawbacks

The Observer Pattern is not free.

If there are hundreds or thousands of observers, a single event may trigger many operations.

This can create:

```text
One event
   ↓
Many observers
   ↓
Many operations
```

It can also become harder to debug because an apparently simple action may trigger a long chain of updates.

In production systems, event-driven architectures therefore often need:

```text
Logging
Error handling
Retries
Event queues
Dead-letter handling
Monitoring
```

The pattern itself doesn't magically solve those problems.

---

# 27. One Important Improvement to Your Code

Your current code contains:

```js
this.unsubscribers.push(user);
```

For a basic Observer Pattern, this list is not necessary.

The important list is:

```js
this.subscribers
```

because the `notify()` method only needs to notify current subscribers.

You could simplify the design to:

```js
unsubscribe(user) {
    this.subscribers = this.subscribers.filter(
        sub => sub !== user
    );

    user.update(
        `${user.name} - You Have Unsubscribed the Channel`
    );
}
```

The `unsubscribers` array is useful only if you actually need a history of users who unsubscribed.

---

# 28. Correct Mental Model

Don't memorize the Observer Pattern as:

> "There is a YouTube class and a User class."

That's just our example.

Remember the actual pattern:

```text
              SUBJECT
                 |
          maintains observers
                 |
       ┌─────────┼─────────┐
       ↓         ↓         ↓
   Observer   Observer   Observer
       |         |         |
       └─────────┼─────────┘
                 ↓
              update()
```

The Subject:

```text
Adds observers
Removes observers
Notifies observers
```

The Observer:

```text
Receives update
```

---

# 29. Final Summary

In your code:

```text
YoutubeChannel
      ↓
Subject
```

```text
User
      ↓
Observer
```

```js
subscribe()
```

means:

```text
Add this observer to my list.
```

```js
unsubscribe()
```

means:

```text
Remove this observer from my list.
```

```js
notify()
```

means:

```text
Tell every currently subscribed observer that something happened.
```

```js
update()
```

means:

```text
This is how the observer handles the notification.
```

The complete flow is:

```text
User subscribes
      ↓
Added to subscribers array
      ↓
Something happens on the channel
      ↓
notify()
      ↓
forEach()
      ↓
Each subscriber receives update()
      ↓
Each observer handles the notification
```

The key engineering idea is:

> **One object publishes a change, while many other objects can react to that change without the publisher needing to know the internal details of those objects.**

That is the essence of the **Observer Pattern**.
