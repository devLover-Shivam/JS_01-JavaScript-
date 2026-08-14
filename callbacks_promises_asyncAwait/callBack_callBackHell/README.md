# Callbacks and Callback Hell in JavaScript

## Overview

JavaScript is often used to perform tasks that do not finish immediately, such as:

* Fetching data from a server
* Reading files
* Waiting for a timer
* Querying a database
* Making API requests

Because JavaScript is asynchronous, we often need a way to say:

> "When this task finishes, run this function."

This is where **callbacks** come into the picture.

This README explains:

1. What a callback is
2. How callbacks work
3. How the provided code executes
4. Why callbacks are useful
5. What callback hell is
6. Why callback hell happens
7. Real-life applications
8. Problems caused by callback hell
9. How modern JavaScript solves callback hell

---

# 1. What is a Callback?

A **callback** is a function that is passed as an argument to another function and is executed later.

Consider this function:

```js
function kuchDerBaadChalunga(fnc){
    setTimeout(fnc, Math.floor(Math.random()*10)*1000);
}
```

Here, `fnc` is a parameter.

If we pass another function as an argument:

```js
kuchDerBaadChalunga(function () {
    console.log("hey");
});
```

The function:

```js
function () {
    console.log("hey");
}
```

is a **callback function**.

The important idea is:

```text
Function passed as an argument
        ↓
   Callback
```

The function receiving the callback decides **when** to execute it.

---

# 2. Understanding `kuchDerBaadChalunga()`

Our function is:

```js
function kuchDerBaadChalunga(fnc){
    setTimeout(fnc, Math.floor(Math.random()*10)*1000);
}
```

Let's break it down.

### Step 1: Function receives another function

```js
function kuchDerBaadChalunga(fnc)
```

The parameter `fnc` is expected to contain a function.

### Step 2: A random delay is generated

```js
Math.floor(Math.random() * 10) * 1000
```

This generates a random delay between:

```text
0 seconds → 9 seconds
```

because the value is converted from seconds to milliseconds.

### Step 3: `setTimeout()` schedules the callback

```js
setTimeout(fnc, delay);
```

JavaScript does not execute `fnc` immediately.

It schedules it to execute after the specified delay.

So:

```js
kuchDerBaadChalunga(function () {
    console.log("hey");
});
```

means:

```text
Pass this function
       ↓
kuchDerBaadChalunga()
       ↓
setTimeout()
       ↓
Wait for random delay
       ↓
Execute callback
       ↓
Print "hey"
```

---

# 3. The Main Example: Callback Hell

Now consider the main part of the code.

We have three asynchronous functions:

```js
function profileLekarAao(username,cb){
    console.log("Fetching Profile Data...")
    setTimeout(() => {
        console.log(`profile fetched of ${username}`);
        cb({_id:12123,username, age:27,email:"huihui@hui.com"});
    }, 2000);
}
```

```js
function saarePostLekarAao(id,cb){
    console.log("Fetching All Posts...");
    setTimeout(() => {
        cb({_id: id,posts: ["hey","hello","good morning"]})
    }, 3000);
}
```

```js
function savedPostsNikaalo(id,cb){
    console.log("Fetching Saved Posts...")
    setTimeout(() => {
        cb({_id: id, saved: [1,2,3,4,5,6]});
    }, 4000);
}
```

Then they are called like this:

```js
profileLekarAao("harsh", function(data){
    console.log(data);
    saarePostLekarAao(data._id,function(posts){
        console.log(posts);
        savedPostsNikaalo(data._id,function(saved){
            console.log(saved);
        })
    })
});
```

This is an example of **callback hell**.

---

# 4. Why Do We Need Callbacks Here?

Suppose we want to perform these tasks:

```text
1. Get profile
2. After profile is available, get all posts
3. After posts are available, get saved posts
```

The operations depend on each other.

We cannot safely do this:

```js
profileLekarAao("harsh");
saarePostLekarAao();
savedPostsNikaalo();
```

because the second task needs data produced by the first task.

The dependency looks like:

```text
Profile
   ↓
Posts
   ↓
Saved Posts
```

Callbacks allow us to express this dependency.

---

# 5. Complete Execution Flow

Let's understand the execution step by step.

The program starts with:

```js
profileLekarAao("harsh", function(data){
```

We pass:

```text
username = "harsh"
cb = callback function
```

---

## Step 1: Profile Request Starts

Inside `profileLekarAao()`:

```js
console.log("Fetching Profile Data...")
```

So the first output is:

```text
Fetching Profile Data...
```

Then:

```js
setTimeout(() => {
```

A timer of 2 seconds is scheduled.

JavaScript does not stop the entire program for those 2 seconds.

The callback is registered to execute later.

---

## Step 2: Profile Data Arrives

After approximately 2 seconds:

```js
console.log(`profile fetched of ${username}`);
```

prints:

```text
profile fetched of harsh
```

Then:

```js
cb({
    _id:12123,
    username,
    age:27,
    email:"huihui@hui.com"
});
```

The callback is executed.

The callback receives:

```js
{
    _id: 12123,
    username: "harsh",
    age: 27,
    email: "huihui@hui.com"
}
```

This object is stored in:

```js
data
```

So:

```js
console.log(data);
```

prints the profile object.

---

# 6. The Second Callback

Now we execute:

```js
saarePostLekarAao(data._id,function(posts){
```

The profile contains:

```js
_id: 12123
```

So effectively we are doing:

```js
saarePostLekarAao(12123, function(posts){
```

Inside this function:

```js
console.log("Fetching All Posts...");
```

prints:

```text
Fetching All Posts...
```

Then another timer is created:

```js
setTimeout(() => {
    cb({
        _id: id,
        posts: ["hey","hello","good morning"]
    })
}, 3000);
```

Now JavaScript waits approximately 3 seconds before executing this callback.

---

# 7. Posts Are Returned

After 3 seconds:

```js
cb({
    _id: id,
    posts: ["hey","hello","good morning"]
})
```

executes the callback.

The callback receives:

```js
{
    _id: 12123,
    posts: ["hey", "hello", "good morning"]
}
```

which is stored in:

```js
posts
```

Then:

```js
console.log(posts);
```

prints the posts data.

---

# 8. The Third Callback

Now we call:

```js
savedPostsNikaalo(data._id,function(saved){
```

Again, `data._id` is:

```text
12123
```

So:

```js
savedPostsNikaalo(12123, function(saved){
```

Inside the function:

```js
console.log("Fetching Saved Posts...")
```

prints:

```text
Fetching Saved Posts...
```

Then:

```js
setTimeout(() => {
    cb({
        _id: id,
        saved: [1,2,3,4,5,6]
    });
}, 4000);
```

A 4-second timer is scheduled.

---

# 9. Saved Posts Are Returned

After approximately 4 seconds:

```js
cb({
    _id: id,
    saved: [1,2,3,4,5,6]
});
```

executes the callback.

The callback receives:

```js
{
    _id: 12123,
    saved: [1, 2, 3, 4, 5, 6]
}
```

and stores it inside:

```js
saved
```

Finally:

```js
console.log(saved);
```

prints the saved posts.

---

# 10. Overall Execution Flow

The entire execution can be represented as:

```text
profileLekarAao("harsh")
        |
        | 2 seconds
        ↓
Profile data received
        |
        ↓
saarePostLekarAao(12123)
        |
        | 3 seconds
        ↓
Posts received
        |
        ↓
savedPostsNikaalo(12123)
        |
        | 4 seconds
        ↓
Saved posts received
        |
        ↓
Process complete
```

The important point is that each operation starts **only after the previous operation provides the required data**.

---

# 11. Why Is This Called Callback Hell?

Look at the structure:

```js
profileLekarAao("harsh", function(data){
    console.log(data);

    saarePostLekarAao(data._id,function(posts){
        console.log(posts);

        savedPostsNikaalo(data._id,function(saved){
            console.log(saved);
        })
    })
});
```

As more dependent operations are added, more callbacks become nested inside callbacks.

For example:

```js
task1(function(result1){
    task2(result1, function(result2){
        task3(result2, function(result3){
            task4(result3, function(result4){
                task5(result4, function(result5){
                    // More work
                });
            });
        });
    });
});
```

This creates a structure that visually grows toward the right.

It starts looking like a pyramid.

This is commonly called:

**Callback Hell**

It is also sometimes referred to as the:

**Pyramid of Doom**

---

# 12. Why Does Callback Hell Happen?

Callback hell usually appears when:

1. Operations are asynchronous.
2. The next operation depends on the previous operation.
3. Each asynchronous function uses callbacks.
4. Multiple dependent operations are nested.

For example:

```text
Get User
   ↓
Get Posts
   ↓
Get Comments
   ↓
Get Likes
   ↓
Get Followers
```

If every operation requires a callback, the nesting grows rapidly.

---

# 13. Real-Life Application

Callback-based code has real applications.

Consider an e-commerce application.

Suppose the user places an order.

The application might need to:

```text
1. Verify user
        ↓
2. Check product availability
        ↓
3. Process payment
        ↓
4. Create order
        ↓
5. Update inventory
        ↓
6. Send confirmation
```

Each step may depend on information from the previous step.

A callback-based implementation could look conceptually like:

```js
verifyUser(user, function(userData) {

    checkStock(product, function(stockData) {

        processPayment(userData, function(paymentData) {

            createOrder(paymentData, function(orderData) {

                updateInventory(orderData, function() {

                    sendConfirmation(orderData, function() {

                        console.log("Order completed");

                    });

                });

            });

        });

    });

});
```

This is the same basic pattern as our example.

---

# 14. Why Are Callbacks Needed?

Callbacks were an important solution for handling asynchronous operations in JavaScript.

They solve a fundamental problem:

> "What should happen after this asynchronous operation finishes?"

For example:

```js
setTimeout(function(){
    console.log("Task completed");
}, 2000);
```

The function passed to `setTimeout()` tells JavaScript:

```text
After the timer finishes,
execute this function.
```

Similarly, in our application:

```js
profileLekarAao("harsh", function(data){
```

means:

```text
Fetch the profile.
When the profile is available,
execute this function with the profile data.
```

That is the core purpose of callbacks.

---

# 15. The Problem With Callback Hell

Callbacks themselves are not bad.

The problem is **too many nested callbacks**.

### Problem 1: Poor Readability

This:

```js
task1(function(data){
    task2(data,function(result){
        task3(result,function(finalResult){
            console.log(finalResult);
        });
    });
});
```

is harder to understand than a linear sequence.

---

### Problem 2: Difficult Maintenance

Suppose you need to add another operation:

```text
task1 → task2 → task3 → task4
```

You have to add another nested callback.

As the application grows, the code becomes difficult to maintain.

---

### Problem 3: Error Handling Becomes Messy

In large callback-based applications, each asynchronous operation may need its own error handling:

```js
task1(function(error, data){
    if(error) {
        // handle error
        return;
    }

    task2(data, function(error, result){
        if(error) {
            // handle error
            return;
        }

        task3(result, function(error, finalResult){
            if(error) {
                // handle error
                return;
            }
        });
    });
});
```

Now the actual business logic becomes mixed with error handling.

---

### Problem 4: Deep Nesting

More operations mean more indentation:

```text
callback
    callback
        callback
            callback
                callback
```

This makes the code harder to read and debug.

---

# 16. Important Distinction

Do not make the mistake of thinking:

```text
Callback = Callback Hell
```

They are not the same thing.

A callback is simply a function passed to another function.

For example:

```js
setTimeout(() => {
    console.log("Done");
}, 1000);
```

This uses a callback.

There is nothing wrong with it.

**Callback hell occurs when excessive callback nesting makes the code difficult to read, maintain, and handle errors in.**

---

# 17. How Modern JavaScript Solves Callback Hell

Modern JavaScript introduced cleaner ways of handling asynchronous code.

The two major solutions are:

```text
Promises
   ↓
async / await
```

Instead of:

```js
task1(function(result){
    task2(result,function(result2){
        task3(result2,function(result3){
            console.log(result3);
        });
    });
});
```

Promises allow a more linear structure:

```js
task1()
    .then(result => task2(result))
    .then(result => task3(result))
    .then(result => console.log(result));
```

And `async/await` makes asynchronous code look even more like synchronous code:

```js
async function run() {
    const result1 = await task1();
    const result2 = await task2(result1);
    const result3 = await task3(result2);

    console.log(result3);
}
```

This is one of the main reasons Promises and `async/await` are preferred in modern JavaScript.

---

# 18. Key Takeaways

### Callback

A callback is:

```text
A function passed as an argument to another function,
which is executed later.
```

Example:

```js
setTimeout(() => {
    console.log("Done");
}, 2000);
```

### Callback Hell

Callback hell happens when:

```text
Multiple asynchronous operations
        +
Each operation depends on the previous one
        +
Callbacks are nested repeatedly
        ↓
Callback Hell
```

### In Our Code

The dependency is:

```text
Profile
   ↓
All Posts
   ↓
Saved Posts
```

The callbacks ensure that each operation starts after the required previous data is available.

### The Main Lesson

Callbacks were not a mistake.

They were an important mechanism for handling asynchronous operations in JavaScript.

The problem begins when callback-based code becomes deeply nested.

That is why JavaScript evolved from:

```text
Callbacks
    ↓
Promises
    ↓
async/await
```

The goal was not to eliminate asynchronous programming, but to make asynchronous code easier to read, maintain, and reason about.
