# Async/Await in JavaScript

## Overview

`async` and `await` are modern JavaScript features used to work with **Promises** in a cleaner and more readable way.

They do not replace Promises. Instead, they provide a simpler syntax for consuming Promises.

The basic relationship is:

```text
Promise
   ↓
async / await
   ↓
Cleaner asynchronous code
```

The given code creates a Promise that randomly resolves or rejects after 3 seconds, and then uses `async/await` with `try/catch` to handle both outcomes.

---

# 1. The Promise

The first part of the code is:

```js
let pr = new Promise(function(resolve, reject){
    setTimeout(() => {
        let rn = Math.floor(Math.random() * 10);

        if(rn > 5){
            resolve(rn);
        } else {
            reject(rn);
        }
    }, 3000);
});
```

This creates a Promise and stores it in:

```js
pr
```

Initially, the Promise is:

```text
Pending
```

After 3 seconds, a random number between `0` and `9` is generated.

The Promise then takes one of two paths:

```text
             Promise
                |
             3 seconds
                |
       Generate random number
                |
         Is rn > 5?
          /       \
        Yes        No
         |          |
     resolve()    reject()
         |          |
    Fulfilled     Rejected
```

---

# 2. Generating the Random Number

This line:

```js
let rn = Math.floor(Math.random() * 10);
```

generates a random integer between:

```text
0 and 9
```

Possible values:

```text
0 1 2 3 4 5 6 7 8 9
```

The condition is:

```js
if(rn > 5)
```

Therefore:

```text
6, 7, 8, 9 → resolve
0, 1, 2, 3, 4, 5 → reject
```

---

# 3. What Does `async` Mean?

Now look at:

```js
async function abcd() {
```

The `async` keyword tells JavaScript that `abcd()` is an **asynchronous function**.

An important property of an `async` function is:

> An `async` function always returns a Promise.

For example:

```js
async function abcd() {
    return 10;
}
```

is conceptually similar to:

```js
function abcd() {
    return Promise.resolve(10);
}
```

So:

```js
abcd();
```

itself returns a Promise.

---

# 4. What Does `await` Mean?

Inside the function we have:

```js
let val = await pr;
```

This is the most important line in the code.

`await` is used to wait for a Promise to settle.

Here:

```js
await pr
```

means:

```text
Wait for Promise `pr`
        ↓
If fulfilled → give me the resolved value
If rejected → throw the rejection
```

So if:

```js
resolve(8);
```

happens, then:

```js
let val = await pr;
```

becomes conceptually:

```js
let val = 8;
```

If:

```js
reject(3);
```

happens, then the `await` expression throws the rejection, which is caught by the `catch` block.

---

# 5. Why Do We Need `await`?

Without `await`, working with a Promise usually looks like:

```js
pr
.then(function(val){
    console.log("Success:", val);
})
.catch(function(err){
    console.log("Error:", err);
});
```

With `async/await`, we can write:

```js
async function abcd() {
    try {
        let val = await pr;
        console.log("Success:", val);
    } catch(err) {
        console.log(err);
    }
}
```

The second version looks much more like ordinary synchronous code.

---

# 6. Understanding `try/catch`

The function contains:

```js
try {
    let val = await pr;
    console.log("try block executed: " + val);
} catch (err) {
    console.log(err);
}
```

`try/catch` is being used to handle both possible outcomes.

### Success

If the Promise resolves:

```js
resolve(rn);
```

the `await` expression gives us the resolved value.

Execution continues inside the `try` block.

### Failure

If the Promise rejects:

```js
reject(rn);
```

the `await` expression throws an error/rejection value.

Execution jumps directly to:

```js
catch (err)
```

---

# 7. Complete Execution Flow

Let's trace the program from beginning to end.

## Step 1: Promise Creation

JavaScript executes:

```js
let pr = new Promise(...)
```

The Promise is created.

Its state is:

```text
Pending
```

---

## Step 2: Timer Starts

Inside the Promise:

```js
setTimeout(() => {
    ...
}, 3000);
```

A 3-second timer is scheduled.

The Promise remains pending while JavaScript continues.

---

## Step 3: `abcd()` Is Called

At the bottom:

```js
abcd();
```

The `async` function starts executing.

---

## Step 4: `try` Block Starts

JavaScript enters:

```js
try {
```

Then reaches:

```js
let val = await pr;
```

At this point, the Promise has probably not settled yet.

So `await` says:

```text
Pause this async function here
and wait for Promise `pr`.
```

This does **not** mean JavaScript freezes the entire program.

The important distinction is:

```text
await pauses the async function
NOT the entire JavaScript program
```

---

# 8. Case 1: Promise Resolves

Suppose after 3 seconds:

```js
rn = 8
```

Since:

```text
8 > 5
```

the code executes:

```js
resolve(8);
```

The Promise changes:

```text
Pending
   ↓
Fulfilled
```

The value `8` is returned to the `await` expression.

Therefore:

```js
let val = await pr;
```

becomes effectively:

```js
let val = 8;
```

Then:

```js
console.log("try block executed: " + val);
```

prints:

```text
try block executed: 8
```

The `catch` block does not execute.

---

# 9. Case 2: Promise Rejects

Suppose after 3 seconds:

```js
rn = 4
```

Since:

```text
4 > 5
```

is false, the code executes:

```js
reject(4);
```

The Promise changes:

```text
Pending
   ↓
Rejected
```

Now:

```js
await pr
```

does not produce a normal value.

Instead, it throws the rejected value.

Execution immediately jumps to:

```js
catch (err)
```

So:

```js
err
```

contains:

```text
4
```

and:

```js
console.log(err);
```

prints:

```text
4
```

The rest of the `try` block is skipped.

---

# 10. Visual Execution Flow

The entire program can be visualized like this:

```text
Create Promise
      |
      ↓
    Pending
      |
      ↓
 Wait 3 seconds
      |
      ↓
Generate random number
      |
      ↓
    rn > 5?
    /     \
  Yes      No
   |        |
   ↓        ↓
resolve   reject
   |        |
   ↓        ↓
await gets await throws
value      rejection
   |        |
   ↓        ↓
try       catch
block     block
```

---

# 11. `await` Does Not Block JavaScript

This is one of the most important concepts to understand.

Consider:

```js
async function abcd() {
    let val = await pr;
    console.log(val);
}

abcd();

console.log("Other code");
```

The `await` pauses only the execution of `abcd()` at that point.

It does not stop unrelated JavaScript execution.

Conceptually:

```text
abcd()
  |
  ↓
await pr
  |
  |---- wait
  |
  ↓
JavaScript continues other work
```

When the Promise settles, the paused async function resumes.

This is one of the reasons `async/await` makes asynchronous programming much easier to write without turning JavaScript into a blocking language.

---

# 12. Why Is `async` Required for `await`?

Normally, `await` is used inside an `async` function.

For example:

```js
async function abcd() {
    let val = await pr;
}
```

The `async` keyword provides the context in which `await` can be used.

Modern JavaScript also supports **top-level `await`** in ES modules, but when learning the basic pattern, remember:

```text
await → normally used inside async function
```

---

# 13. Comparing Promises With Async/Await

### Promise style

```js
pr
.then(function(val) {
    console.log("Promise Resolved");
    console.log(val);
})
.catch(function(err) {
    console.log("Promise Rejected");
    console.log(err);
});
```

### Async/Await style

```js
async function abcd() {
    try {
        let val = await pr;
        console.log("try block executed: " + val);
    } catch (err) {
        console.log(err);
    }
}
```

Both are using the **same Promise**.

The difference is syntax and control flow.

---

# 14. The Same Promise, Different Syntax

It is important to understand that:

```text
Promises
```

and:

```text
async/await
```

are not competing concepts.

`async/await` is built around Promises.

Think of it as:

```text
Promise
   ↓
Provides asynchronous result
   ↓
async/await
   ↓
Provides cleaner syntax for consuming that result
```

---

# 15. Real-Life Example

Imagine you order food online.

The order takes some time to complete.

You can think of the Promise as:

```text
Order
 ↓
Pending
 ↓
Waiting for restaurant
```

Then:

```text
Order completed → Fulfilled
Order cancelled → Rejected
```

With `async/await`, the logic can be expressed naturally:

```js
async function placeOrder() {
    try {
        let order = await restaurantOrder();

        console.log("Order received:", order);

    } catch (error) {
        console.log("Order failed:", error);
    }
}
```

The code reads almost like normal English:

```text
Try to get the order.
Wait for the result.
If successful, use it.
If something goes wrong, catch it.
```

---

# 16. Why `async/await` Is Useful

As applications grow, you may have several asynchronous operations that need to happen in sequence.

For example:

```text
Get User
   ↓
Get User's Posts
   ↓
Get Comments
   ↓
Get Likes
```

With nested callbacks, this can become difficult to read.

With `async/await`:

```js
async function loadData() {
    try {
        const user = await getUser();
        const posts = await getPosts(user.id);
        const comments = await getComments(posts);
        const likes = await getLikes(comments);

        console.log(likes);
    } catch (error) {
        console.log(error);
    }
}
```

The code clearly expresses the order of operations.

---

# 17. Callback → Promise → Async/Await

JavaScript's asynchronous programming can be understood as an evolution:

```text
Callbacks
    ↓
Callback Hell
    ↓
Promises
    ↓
Promise Chains
    ↓
Async/Await
```

Callbacks are still useful in JavaScript, and Promises remain the underlying mechanism in modern asynchronous APIs.

`async/await` mainly improves how we write and reason about Promise-based code.

---

# 18. Key Concepts From This Example

### `async`

```js
async function abcd() {}
```

Makes `abcd()` an asynchronous function and causes it to return a Promise.

### `await`

```js
let val = await pr;
```

Waits for the Promise to settle and gives the fulfilled value, or throws the rejection.

### `try`

```js
try {
    ...
}
```

Contains code that may produce an exception/rejected `await`.

### `catch`

```js
catch (err) {
    ...
}
```

Handles the failure.

### `resolve`

```js
resolve(rn);
```

Marks the Promise as fulfilled.

### `reject`

```js
reject(rn);
```

Marks the Promise as rejected.

---

# 19. Final Mental Model

Remember this pattern:

```text
async function
      |
      ↓
    await
      |
      ↓
   Promise
      |
   ┌──┴──┐
   ↓     ↓
resolve reject
   ↓     ↓
 try    catch
```

For this exact program:

```text
Create Promise
      ↓
Wait 3 seconds
      ↓
Generate random number
      ↓
 ┌─────────────┐
 │             │
rn > 5       rn <= 5
 │             │
 ↓             ↓
resolve      reject
 │             │
 ↓             ↓
await        await throws
 │             │
 ↓             ↓
try          catch
```

The core idea is simple:

> `async/await` gives us a cleaner way to work with Promises, while `try/catch` gives us a clean way to handle success and failure.

Once this model is clear, the next important step is understanding **multiple `await`s, sequential vs parallel execution, and `Promise.all()`**, because that's where async/await becomes genuinely powerful.
