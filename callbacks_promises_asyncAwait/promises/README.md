# Promises in JavaScript

## Overview

A **Promise** is a JavaScript object used to handle asynchronous operations.

A Promise represents a value that may be available:

* In the future if the operation succeeds
* In the future if the operation fails

A Promise has three possible states:

```text
Pending
   ↓
 ┌───────────┐
 ↓           ↓
Fulfilled   Rejected
```

In this code, the Promise waits for 3 seconds and then generates a random number.

If the number is greater than `5`, the Promise is resolved.

Otherwise, it is rejected.

---

# 1. Creating a Promise

The Promise is created using:

```js
let pr = new Promise(function(resolve, reject) {
    // asynchronous operation
});
```

The `Promise` constructor receives a function containing two important parameters:

```js
resolve
reject
```

These are functions provided by JavaScript.

### `resolve()`

Calling `resolve()` means:

> The asynchronous operation was successful.

### `reject()`

Calling `reject()` means:

> The asynchronous operation failed.

For example:

```js
resolve(10);
```

means the Promise completed successfully and produced `10`.

While:

```js
reject(3);
```

means the Promise failed and produced `3`.

---

# 2. Promise States

A Promise can move through these states:

```text
Pending
```

The operation is still running.

Then it eventually becomes either:

```text
Fulfilled
```

or:

```text
Rejected
```

Once a Promise is fulfilled or rejected, it is **settled**.

It cannot go back to `Pending`, and it cannot switch from fulfilled to rejected or vice versa.

---

# 3. Understanding the Given Code

The complete Promise is:

```js
let pr = new Promise(function(resolve, reject) {
    setTimeout(() => {
        let rn = Math.floor(Math.random() * 10);

        if (rn > 5) {
            resolve(rn);
        } else {
            reject(rn);
        }
    }, 3000);
});
```

Let's understand it step by step.

---

# 4. Step 1: Promise Is Created

When JavaScript reaches:

```js
let pr = new Promise(function(resolve, reject) {
```

a new Promise is created.

At this moment its state is:

```text
Pending
```

because the asynchronous operation has not finished yet.

The Promise is stored inside:

```js
pr
```

So:

```text
pr
 ↓
Promise
 ↓
Pending
```

---

# 5. Step 2: `setTimeout()` Starts

Inside the Promise:

```js
setTimeout(() => {
    ...
}, 3000);
```

A timer of 3 seconds is started.

The important point is that JavaScript does **not** block the entire program for 3 seconds.

Instead, the callback passed to `setTimeout()` is scheduled to run later.

During this period, the Promise remains:

```text
Pending
```

---

# 6. Step 3: A Random Number Is Generated

After 3 seconds:

```js
let rn = Math.floor(Math.random() * 10);
```

generates a random integer from:

```text
0 to 9
```

Possible values are:

```text
0
1
2
3
4
5
6
7
8
9
```

---

# 7. Step 4: Decide Whether the Promise Succeeds

The code checks:

```js
if (rn > 5)
```

There are two possible outcomes.

### Case 1: `rn > 5`

For example:

```text
rn = 8
```

Then:

```js
resolve(rn);
```

is executed.

The Promise becomes:

```text
Pending
   ↓
Fulfilled
```

and the value `8` is passed along with the successful result.

---

### Case 2: `rn <= 5`

For example:

```text
rn = 3
```

Then:

```js
reject(rn);
```

is executed.

The Promise becomes:

```text
Pending
   ↓
Rejected
```

and the value `3` is passed as the rejection reason.

---

# 8. Handling the Promise Result

After creating the Promise, we attach:

```js
pr
.then(function(val) {
    console.log("Promise Resolved");
    console.log(val);
})
.catch(function() {
    console.log("Promise Rejected");
    console.log(val);
});
```

This is how we respond to the final state of the Promise.

---

# 9. The `.then()` Method

`.then()` handles the successful case.

```js
.then(function(val) {
    console.log("Promise Resolved");
    console.log(val);
})
```

If:

```js
resolve(rn);
```

is called, the function inside `.then()` executes.

The value passed to `resolve()` becomes the argument of the `.then()` callback.

For example:

```js
resolve(8);
```

causes:

```js
.then(function(val) {
```

to receive:

```text
val = 8
```

Therefore the output will be:

```text
Promise Resolved
8
```

---

# 10. The `.catch()` Method

`.catch()` handles the rejected case.

```js
.catch(function() {
    console.log("Promise Rejected");
    console.log(val);
})
```

If:

```js
reject(rn);
```

is called, the `.catch()` handler executes.

For example:

```js
reject(3);
```

means the Promise is rejected with the value `3`.

However, there is a small bug in the provided code.

The `.catch()` callback does not receive the rejected value because no parameter was defined.

The current code has:

```js
.catch(function() {
    console.log("Promise Rejected");
    console.log(val);
})
```

But `val` does not exist inside this function.

This should be:

```js
.catch(function(val) {
    console.log("Promise Rejected");
    console.log(val);
})
```

Now the rejected value can be accessed correctly.

---

# 11. Corrected Version

```js
let pr = new Promise(function(resolve, reject) {

    setTimeout(() => {

        let rn = Math.floor(Math.random() * 10);

        if (rn > 5) {
            resolve(rn);
        } else {
            reject(rn);
        }

    }, 3000);
});

pr
.then(function(val) {
    console.log("Promise Resolved");
    console.log(val);
})
.catch(function(val) {
    console.log("Promise Rejected");
    console.log(val);
});
```

---

# 12. Complete Execution Flow

Let's trace the complete execution.

## Step 1

Promise is created:

```text
Promise created
```

State:

```text
Pending
```

## Step 2

A 3-second timer is scheduled.

```text
Pending
   ↓
Wait for asynchronous operation
```

## Step 3

After 3 seconds, a random number is generated.

Suppose:

```text
rn = 7
```

## Step 4

Check:

```js
rn > 5
```

Since:

```text
7 > 5
```

the condition is true.

So:

```js
resolve(7);
```

is called.

## Step 5

The Promise changes:

```text
Pending
   ↓
Fulfilled
```

## Step 6

`.then()` executes:

```text
Promise Resolved
7
```

---

# 13. Another Possible Execution

Suppose the random number is:

```text
rn = 4
```

Then:

```js
rn > 5
```

is false.

Therefore:

```js
reject(4);
```

is called.

The Promise changes:

```text
Pending
   ↓
Rejected
```

Then `.catch()` executes:

```text
Promise Rejected
4
```

---

# 14. Visualizing Both Paths

```text
                     Promise
                        |
                        ↓
                     Pending
                        |
                  Wait 3 seconds
                        |
                        ↓
                 Generate random number
                        |
                 Is rn greater than 5?
                   /             \
                 Yes              No
                  |                |
                  ↓                ↓
              resolve(rn)      reject(rn)
                  |                |
                  ↓                ↓
              Fulfilled         Rejected
                  |                |
                  ↓                ↓
                .then()          .catch()
                  |                |
                  ↓                ↓
        "Promise Resolved"  "Promise Rejected"
```

---

# 15. Why Do We Need Promises?

Imagine an application that needs to fetch data from a server.

The server may take:

```text
1 second
2 seconds
5 seconds
```

You don't know exactly when the response will arrive.

Instead of blocking the entire program, JavaScript can continue executing other code.

A Promise gives us a clean way to say:

```text
If the operation succeeds → do this
If the operation fails → do that
```

This is much cleaner than deeply nesting callbacks.

---

# 16. Real-Life Example

Consider a login system.

The application sends the user's credentials to a server.

```text
User enters credentials
        ↓
Send login request
        ↓
Wait for server
        ↓
 ┌───────────────┐
 ↓               ↓
Success         Failure
 ↓               ↓
Login user      Show error
```

A Promise is a natural fit for this type of operation.

Conceptually:

```js
loginUser()
    .then(function(user) {
        console.log("Login successful");
    })
    .catch(function(error) {
        console.log("Login failed");
    });
```

The important thing is that the result is not necessarily available immediately.

The Promise represents that future result.

---

# 17. Promise vs Callback

Callbacks can handle asynchronous operations:

```js
getData(function(data) {
    console.log(data);
});
```

But when many asynchronous operations depend on each other, callbacks can become deeply nested.

Promises provide a more structured way:

```js
getData()
    .then(function(data) {
        return processData(data);
    })
    .then(function(result) {
        console.log(result);
    })
    .catch(function(error) {
        console.log(error);
    });
```

This is one reason Promises are an important improvement over callback-heavy code.

---

# 18. Promise Chaining

One of the most useful features of Promises is **chaining**.

For example:

```js
firstTask()
    .then(function(result) {
        return secondTask(result);
    })
    .then(function(result) {
        return thirdTask(result);
    })
    .catch(function(error) {
        console.log(error);
    });
```

Each `.then()` can receive the result of the previous Promise.

This allows asynchronous operations to be written in a more readable sequence.

---

# 19. Promise and Callback Hell

Previously, callback-based code could become:

```js
task1(function(result1) {
    task2(result1, function(result2) {
        task3(result2, function(result3) {
            console.log(result3);
        });
    });
});
```

Promises can flatten this structure:

```js
task1()
    .then(function(result1) {
        return task2(result1);
    })
    .then(function(result2) {
        return task3(result2);
    })
    .then(function(result3) {
        console.log(result3);
    })
    .catch(function(error) {
        console.log(error);
    });
```

The asynchronous logic is still there.

The difference is that the code is easier to follow.

---

# 20. Important Rules to Remember

### Rule 1: A Promise eventually settles

A Promise starts as:

```text
Pending
```

and eventually becomes:

```text
Fulfilled
```

or:

```text
Rejected
```

---

### Rule 2: `resolve()` means success

```js
resolve(value);
```

sends the value to:

```js
.then(...)
```

---

### Rule 3: `reject()` means failure

```js
reject(error);
```

sends the reason to:

```js
.catch(...)
```

---

### Rule 4: `.then()` handles success

```js
promise.then(...)
```

runs when the Promise is fulfilled.

---

### Rule 5: `.catch()` handles failure

```js
promise.catch(...)
```

runs when the Promise is rejected.

---

# 21. Key Takeaway

The most important concept is this:

```text
Promise
   ↓
Represents a future result
   ↓
Pending
   ↓
Either
   ├── Fulfilled → .then()
   └── Rejected  → .catch()
```

In the given program:

```text
Create Promise
      ↓
Wait 3 seconds
      ↓
Generate random number
      ↓
      ├── rn > 5 → resolve(rn) → .then()
      │
      └── rn <= 5 → reject(rn) → .catch()
```

Promises are important because asynchronous operations are everywhere in modern JavaScript: APIs, network requests, timers, database operations, file operations, and many browser features.

The real advantage of Promises is not simply that they make asynchronous code possible. JavaScript already had callbacks for that.

Their major advantage is that they provide a **structured way to represent success and failure and to compose multiple asynchronous operations without creating callback hell**.

---

# 22. Final Mental Model

Remember this simple analogy:

```text
You order food.

Promise = Your order ticket

Pending
→ Kitchen is preparing the food

Fulfilled
→ Food is ready

Rejected
→ Kitchen could not prepare the order

.then()
→ What should happen when food is ready?

.catch()
→ What should happen if the order fails?
```

The Promise doesn't tell you exactly when the operation will finish.

It simply gives you a structured mechanism for handling **whatever happens when it finishes**.
