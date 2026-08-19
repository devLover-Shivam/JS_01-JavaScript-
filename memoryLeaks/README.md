# Memory Leaks in JavaScript

## 1. What is a Memory Leak?

A **memory leak** happens when a program keeps memory occupied even though that memory is no longer needed.

In simple words:

> **Jo memory kaam ki nahi hai, agar woh unnecessarily memory mein bani rahe, to memory leak ho sakta hai.**

If memory leaks continue to accumulate, the application can become slower and may eventually run out of available memory.

---

## 2. How Can Timers Cause Memory Leaks?

Functions such as:

```js
setInterval()
setTimeout()
```

can continue running or remain referenced until they are properly cleared.

For example:

```js
const int = setInterval(() => {
    console.log("Running...");
}, 500);
```

This interval will keep running continuously.

If we no longer need it but don't clear it:

```js
clearInterval(int);
```

the interval can continue consuming resources unnecessarily.

---

## 3. Our Example

```js
let count = 0;

const int = setInterval(() => {

    if(count < 10){

        count++;

        console.log(count);

    }
    else{

        console.log("Cleared int function");

        clearInterval(int);
    }

}, 500);
```

Here the interval runs every:

```text
500ms = 0.5 seconds
```

The `count` keeps increasing until it reaches `10`.

Once the condition becomes false:

```js
count < 10
```

the `else` block executes:

```js
clearInterval(int);
```

This stops the interval.

---

## 4. Why `clearInterval()` Matters

Think of `setInterval()` as telling JavaScript:

> "Ye function baar-baar chalate rehna."

And:

```js
clearInterval(int);
```

means:

> "Ab is function ki zarurat nahi hai, isse chalana band karo."

So the flow is:

```text
setInterval()
     ↓
Function keeps running
     ↓
Work is completed
     ↓
clearInterval()
     ↓
Interval stops
```

---

## 5. Important Distinction

Not every timer that runs for some time is automatically a memory leak.

A memory leak occurs when something **continues to consume or retain memory/resources when it should no longer be needed**.

In our example, we deliberately stop the interval after the required work is completed.

So:

```js
clearInterval(int);
```

is an example of **proper resource cleanup**.

---

## 6. Common Sources of Memory Leaks

Some common causes include:

* Uncleared `setInterval()` or `setTimeout()` references
* Event listeners that are never removed
* Unnecessary global variables
* Detached DOM elements that are still referenced by JavaScript
* Closures unintentionally retaining large objects

The general rule is:

> **If you create something that keeps running or keeps a reference to something, make sure you clean it up when you no longer need it.**
