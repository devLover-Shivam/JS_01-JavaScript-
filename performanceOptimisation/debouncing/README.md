# Debouncing in JavaScript

## 1. What is Debouncing?

Debouncing is a technique used to **control how frequently a function gets executed** when an action happens repeatedly in a short period of time.

The basic idea is:

> "Jab tak user baar-baar action kar raha hai, function ko execute mat karo. User ke action karna rokne ke baad ek fixed amount of time wait karo. Agar is duration mein koi naya action nahi aaya, tab function execute karo."

For example, suppose a user is typing:

```text
i
ip
iph
ipho
iphon
iphone
```

If we directly attach a function to the `input` event, the function will execute **six times**.

With debouncing, we can say:

```text
User stops typing
        ↓
Wait 1000ms
        ↓
No new input?
        ↓
Execute function
```

So instead of executing the function for every character, we execute it only once after the user stops typing.

---

# 2. Why Do We Need Debouncing?

Some events can happen extremely frequently.

Examples:

* Typing in a search box
* Resizing a browser window
* Scrolling
* Moving the mouse
* Filtering a large list
* Sending API requests
* Validating user input

If we execute an expensive function every time one of these events occurs, it can create unnecessary work.

For example:

```js
input.addEventListener("input", function(){
    console.log("API call");
});
```

If the user types:

```text
javascript
```

The `input` event may trigger once for every character.

That could result in:

```text
j          → API call
ja         → API call
jav        → API call
java       → API call
javas      → API call
...
javascript → API call
```

This is usually unnecessary.

The user is still typing. We don't need to process every intermediate value.

---

# 3. Real-Life Example: Search Suggestions

Consider an e-commerce website.

You search for:

```text
laptop
```

While typing, the website wants to show suggestions.

Without debouncing:

```text
l → API request
la → API request
lap → API request
lapt → API request
lapto → API request
laptop → API request
```

That means multiple requests are sent while the user is still typing.

With debouncing:

```text
l
↓
wait

la
↓
timer reset

lap
↓
timer reset

lapt
↓
timer reset

lapto
↓
timer reset

laptop
↓
user stops typing

wait 1 second
↓
API request
```

Only the final search term is processed.

This reduces unnecessary API calls and makes the application more efficient.

---

# 4. Basic Structure of Debouncing

Our implementation is:

```js
function debounce(fnc, delay){
    let timer;

    return function(...args){
        clearTimeout(timer);

        timer = setTimeout(()=>{
            fnc(...args);
        }, delay);
    }
}
```

Let's understand every part carefully.

---

# 5. The `debounce()` Function

```js
function debounce(fnc, delay){

}
```

Here we are creating a function called `debounce`.

It accepts two parameters:

### `fnc`

This is the function that we eventually want to execute.

For example:

```js
function search(){
    console.log("Searching...");
}
```

We can pass it to debounce:

```js
debounce(search, 1000);
```

So:

```text
fnc → search function
```

### `delay`

This tells debounce how long it should wait before executing the function.

For example:

```js
1000
```

means:

```text
1000 milliseconds = 1 second
```

So:

```js
debounce(search, 1000);
```

means:

> "Search function ko tab execute karo jab user ke last action ke baad 1 second tak koi naya action na aaye."

---

# 6. The `timer` Variable

Inside debounce we have:

```js
let timer;
```

This variable stores the timer created by `setTimeout()`.

Initially:

```text
timer = undefined
```

When we call:

```js
setTimeout(...)
```

JavaScript returns a timer identifier.

That identifier is stored in:

```js
timer
```

For example:

```text
timer
  ↓
Timer ID
```

We need this ID because later we may want to cancel that timer.

---

# 7. Why Do We Need `clearTimeout()`?

This is the most important part of debouncing.

Inside the returned function we have:

```js
clearTimeout(timer);
```

Suppose the delay is 1000ms.

The user types:

```text
A
```

A timer starts:

```text
A
↓
1000ms countdown starts
```

But before 1000ms is completed, the user types:

```text
B
```

Now we don't want the old timer to execute.

So:

```js
clearTimeout(timer);
```

cancels the old timer.

Then we create a new timer:

```js
timer = setTimeout(...);
```

Now the countdown starts again.

So:

```text
A
↓
Timer starts
↓
B comes before 1 second
↓
Old timer cancelled
↓
New timer starts
```

This process continues as long as the user keeps typing.

---

# 8. The Core Rule of Debouncing

The most important rule is:

> **Every new action resets the timer.**

For example, suppose:

```text
delay = 1000ms
```

The user performs actions like this:

```text
0ms    → input
300ms  → input
500ms  → input
800ms  → input
1200ms → input
```

Every new input resets the timer.

Therefore, the function doesn't execute during this period.

Eventually:

```text
1200ms → last input
        ↓
wait 1000ms
        ↓
2200ms
        ↓
function executes
```

That's debouncing.

---

# 9. Understanding `setTimeout()`

We use:

```js
setTimeout(()=>{
    fnc(...args);
}, delay);
```

`setTimeout()` tells JavaScript:

> "Is function ko abhi execute mat karo. Given delay ke baad execute karna."

For example:

```js
setTimeout(()=>{
    console.log("Hello");
}, 1000);
```

The function executes after approximately 1 second.

In our debounce implementation:

```js
timer = setTimeout(()=>{
    fnc(...args);
}, delay);
```

we are starting a countdown.

If the countdown completes without being cancelled, `fnc()` executes.

---

# 10. Why Are We Storing `setTimeout()` in `timer`?

We write:

```js
timer = setTimeout(...);
```

instead of simply:

```js
setTimeout(...);
```

because we need to remember the timer.

Why?

Because the next time the user performs an action, we need to cancel it:

```js
clearTimeout(timer);
```

So the relationship is:

```text
setTimeout()
    ↓
creates timer
    ↓
timer variable stores its ID
    ↓
clearTimeout(timer)
    ↓
old timer cancelled
```

---

# 11. Why Does `debounce()` Return a Function?

This is another important concept.

Inside debounce:

```js
return function(...args){

}
```

So `debounce()` itself doesn't directly perform the final action.

Instead, it **creates and returns another function**.

For example:

```js
function debounce(fnc, delay){
    return function(){
        // debounce logic
    }
}
```

If we call:

```js
debounce(search, 1000);
```

the result is another function.

Conceptually:

```text
debounce(search, 1000)
        ↓
   returns function
        ↓
    returned function
```

We then give this returned function to the event listener.

---

# 12. Why Can't We Directly Give `debounce()` to `addEventListener()`?

Consider:

```js
input.addEventListener(
    "input",
    debounce(function(){
        console.log("debounced");
    }, 1000)
);
```

Notice the:

```js
debounce(...)
```

The parentheses mean that `debounce()` is being called immediately while setting up the event listener.

But that's okay because `debounce()` doesn't execute our actual function immediately.

Instead:

```text
debounce()
   ↓
creates debounce logic
   ↓
returns another function
   ↓
addEventListener receives that returned function
```

So `addEventListener()` eventually gets:

```js
function(...args){
    clearTimeout(timer);
    timer = setTimeout(...);
}
```

That's the function that will execute whenever the input event occurs.

---

# 13. Function Call vs Function Reference

This distinction is extremely important in JavaScript.

### Function reference

```js
handleInput
```

Means:

> "Yeh function hai. Jab zarurat ho tab ise execute karna."

### Function call

```js
handleInput()
```

Means:

> "Is function ko abhi execute karo."

For example:

```js
function hello(){
    console.log("Hello");
}
```

This:

```js
hello;
```

doesn't execute the function.

But:

```js
hello();
```

executes it immediately.

In our debounce example:

```js
debounce(...)
```

calls debounce immediately because we need debounce to create and return the function that the event listener will use.

The actual `fnc` inside debounce is delayed.

---

# 14. Understanding the Returned Function

This part:

```js
return function(...args){
    clearTimeout(timer);

    timer = setTimeout(()=>{
        fnc(...args);
    }, delay);
}
```

is basically saying:

> "Main ek naya function return kar raha hoon. Jab bhi tum is returned function ko call karoge, pehle previous timer cancel hoga aur phir ek naya timer start hoga."

So every input event triggers the returned function.

Example:

```text
input event
    ↓
returned function
    ↓
clear old timer
    ↓
start new timer
```

---

# 15. What Does `...args` Mean?

We have:

```js
function(...args)
```

Here `...args` is called the **rest parameter**.

It allows the function to collect multiple arguments into an array.

For example:

```js
function test(...args){
    console.log(args);
}

test(10, 20, 30);
```

Output:

```text
[10, 20, 30]
```

In our debounce function, we use:

```js
fnc(...args);
```

The `...` here is used to pass those arguments back to the original function.

This makes our debounce function flexible enough to work with functions that receive arguments.

---

# 16. Why Is `...args` Useful Here?

Suppose we have:

```js
function search(query){
    console.log(query);
}
```

We might want:

```js
debounce(search, 1000);
```

When the event provides some data, the debounce wrapper can capture it through:

```js
...args
```

and later pass it to:

```js
fnc(...args);
```

So the data doesn't get lost while the function execution is being delayed.

---

# 17. Complete Execution Flow

Consider:

```js
input.addEventListener(
    "input",
    debounce(function(){
        console.log("debounced");
    }, 1000)
);
```

Let's understand the complete flow.

### Step 1: JavaScript loads

This executes:

```js
let input = document.querySelector("input");
```

The input element is selected.

---

### Step 2: `debounce()` is called

JavaScript reaches:

```js
debounce(function(){
    console.log("debounced");
}, 1000)
```

So:

```text
fnc   → console.log function
delay → 1000
```

---

### Step 3: `timer` is created

Inside debounce:

```js
let timer;
```

At this point:

```text
timer = undefined
```

---

### Step 4: A new function is returned

This function:

```js
return function(...args){
    clearTimeout(timer);

    timer = setTimeout(()=>{
        fnc(...args);
    }, delay);
}
```

is returned.

---

### Step 5: `addEventListener()` receives it

The returned function becomes the event handler.

Conceptually:

```text
input event
    ↓
debounced function
    ↓
clearTimeout()
    ↓
setTimeout()
```

---

# 18. What Happens When the User Types?

Suppose the user types:

```text
H
```

The input event occurs.

The returned function executes.

First:

```js
clearTimeout(timer);
```

There is no previous timer, so nothing important happens.

Then:

```js
timer = setTimeout(..., 1000);
```

A 1-second timer starts.

---

## User types again

Suppose the user types:

```text
He
```

before the 1 second is completed.

The returned function executes again.

First:

```js
clearTimeout(timer);
```

The previous timer is cancelled.

Then:

```js
timer = setTimeout(..., 1000);
```

A new timer starts.

---

## User types again

```text
Hel
```

Again:

```text
old timer → cancelled
new timer → started
```

The same thing happens for every new input.

---

# 19. Detailed Timeline

Suppose the delay is:

```text
1000ms
```

And the user types:

```text
H
He
Hel
Hell
Hello
```

Timeline:

```text
0ms
User types H
↓
Timer starts
↓
1000ms countdown

300ms
User types He
↓
Old timer cancelled
↓
New timer starts

600ms
User types Hel
↓
Old timer cancelled
↓
New timer starts

850ms
User types Hell
↓
Old timer cancelled
↓
New timer starts

1100ms
User types Hello
↓
Old timer cancelled
↓
New timer starts

1100ms → 2100ms
No new input
↓
Timer completes
↓
fnc() executes
↓
"debounced"
```

So the function executes only once.

---

# 20. Real-Life Analogy: Elevator

Imagine an elevator.

You press the elevator button.

The elevator is ready to leave after a few seconds.

But another person enters and presses the button again.

The elevator waits.

Another person enters.

The waiting period effectively gets extended because people are still arriving.

Once nobody else enters for the required period, the elevator leaves.

This is similar to debouncing:

```text
Action
↓
Wait
↓
New action?
↓
Yes → Reset waiting period
↓
No → Execute
```

---

# 21. Real-Life Analogy: Restaurant Order

Imagine you're building a food order.

You keep changing your order:

```text
Burger
↓
Burger + Fries
↓
Burger + Fries + Coke
↓
Remove Coke
↓
Add Dessert
```

It would be stupid for the restaurant to prepare the order every time you change something.

Instead, the restaurant could wait until you stop making changes.

After some time:

```text
No more changes
↓
Confirm final order
↓
Prepare food
```

That's the basic idea behind debouncing.

---

# 22. Real-Life Example: Search Box

This is one of the most common use cases.

```js
input.addEventListener(
    "input",
    debounce(searchProducts, 500)
);
```

Instead of:

```text
Every keystroke
↓
API request
```

we get:

```text
User typing
↓
Timer keeps resetting
↓
User stops typing
↓
500ms wait
↓
API request
```

This can significantly reduce unnecessary network requests.

---

# 23. Real-Life Example: Window Resize

Suppose we have:

```js
window.addEventListener("resize", function(){
    console.log("Window resized");
});
```

When the user drags the browser window, resize events can occur repeatedly.

The function could execute many times.

Instead:

```js
window.addEventListener(
    "resize",
    debounce(function(){
        console.log("Window resizing finished");
    }, 500)
);
```

Now the function executes after the user stops resizing for 500ms.

This is useful when the function performs expensive calculations or layout work.

---

# 24. Real-Life Example: Form Validation

Suppose a user is entering an email address.

Without debouncing:

```text
a
↓
validate

a@
↓
validate

a@g
↓
validate

a@gm
↓
validate

a@gmail.com
↓
validate
```

We may not need to validate every intermediate state.

With debouncing:

```text
User types
↓
Timer resets
↓
User stops
↓
Wait
↓
Validate final value
```

This can make the UI smoother.

---

# 25. Real-Life Example: Database/API Search

Suppose a user searches for employees:

```text
shivam
```

Every keystroke could trigger a backend request.

Without debouncing:

```text
s       → request
sh      → request
shi     → request
shiv    → request
shiva   → request
shivam  → request
```

With debouncing:

```text
s
sh
shi
shiv
shiva
shivam
↓
User stops
↓
Wait 500ms
↓
One request
```

This is much more sensible.

---

# 26. Debouncing vs Normal Event Handling

| Normal Event Handling               | Debouncing                                |
| ----------------------------------- | ----------------------------------------- |
| Function can execute on every event | Function waits for a pause                |
| Can cause many executions           | Reduces unnecessary executions            |
| Useful for immediate reactions      | Useful when only the final action matters |
| Can generate many API requests      | Can reduce API requests                   |
| Simpler implementation              | Requires timer logic                      |

---

# 27. When Should You Use Debouncing?

Debouncing is useful when:

* The event happens repeatedly.
* You don't need to react to every single event.
* You care mainly about the user's final action.
* The function is expensive.
* The function performs API requests.
* The UI should avoid unnecessary work.

Common examples:

```text
Search suggestions
API calls
Window resizing
Input validation
Filtering
Autocomplete
Expensive calculations
```

---

# 28. When Should You NOT Use Debouncing?

Don't blindly debounce everything.

If you need immediate response to every event, debouncing is the wrong tool.

For example:

```text
Game controls
Button clicks that must happen immediately
Real-time interactions
Certain keyboard shortcuts
```

If every event matters, delaying the event can create a bad user experience.

---

# 29. Debouncing and API Calls

One of the biggest practical benefits is reducing unnecessary API requests.

Suppose an API call costs:

```text
1 request per keystroke
```

User types:

```text
javascript
```

That's potentially around 10 requests.

With debouncing:

```text
javascript
↓
user stops typing
↓
wait 500ms
↓
1 request
```

Instead of processing every intermediate query, the application processes the final query.

This is especially useful when APIs are rate-limited or expensive.

---

# 30. Important Concept: Debouncing Does Not Make the Function Faster

Debouncing does **not** make the actual function execute faster.

It simply controls **when the function is allowed to execute**.

Without debouncing:

```text
Action → Function
Action → Function
Action → Function
Action → Function
```

With debouncing:

```text
Action
Action
Action
Action
↓
Wait
↓
Function
```

So debouncing is about **execution control**, not execution speed.

---

# 31. The Complete Code

```js
let input = document.querySelector("input");

function debounce(fnc, delay){
    let timer;

    return function(...args){
        clearTimeout(timer);

        timer = setTimeout(()=>{
            fnc(...args);
        }, delay);
    }
}

input.addEventListener(
    "input",
    debounce(function(){
        console.log("debounced");
    }, 1000)
);
```

---

# 32. The Entire Concept in One Diagram

```text
User performs action
        ↓
Debounced function runs
        ↓
Clear previous timer
        ↓
Start new timer
        ↓
Is there another action?
        ↓
     Yes ──────────────→ Clear timer
        ↓                       ↓
       No                 Start new timer
        ↓
Wait for delay
        ↓
Execute original function
```

The core idea can be remembered as:

```text
NEW ACTION
    ↓
RESET TIMER
    ↓
NEW ACTION?
    ↓
YES → RESET AGAIN
    ↓
NO
    ↓
WAIT COMPLETES
    ↓
EXECUTE FUNCTION
```

---

# 33. Final Mental Model

Whenever you hear **debouncing**, think:

> "User baar-baar action kar raha hai, mujhe har action par react nahi karna. Main timer ko baar-baar reset karunga. Jaise hi user rukega aur given delay tak koi naya action nahi karega, tab main function execute karunga."

In short:

```text
Debouncing = Wait for the user to stop.
```

For the given implementation:

```js
clearTimeout(timer);
```

means:

> "Purana countdown cancel karo."

```js
setTimeout(..., delay);
```

means:

> "Naya countdown start karo."

```js
fnc(...args);
```

means:

> "Agar user delay ke andar dobara action nahi karta, to actual function execute karo."

That three-step combination is the heart of debouncing:

```text
clearTimeout()
      +
setTimeout()
      +
fnc()
      =
Debouncing
```
