# Throttling in JavaScript

## 1. What is Throttling?

Throttling is a technique used to **control how frequently a function can execute** when an event is happening repeatedly.

The basic idea is:

> "Action jitni baar bhi ho, main function ko har baar execute nahi karunga. Main ek fixed interval set karunga, aur us interval ke andar function maximum ek baar execute hoga."

For example, suppose an input event is continuously happening and our throttle interval is:

```js
1000
```

That means:

```text
1000ms = 1 second
```

The function can execute **at most once every 1 second**.

Even if the user keeps performing the action continuously, the function won't execute more frequently than the specified interval.

---

# 2. Debouncing vs Throttling

Before understanding throttling, it is important to understand how it differs from debouncing.

### Debouncing

Debouncing basically says:

> "User ke actions ke beech mein given delay ka gap aane do. Jab user ruk jaaye, tab function execute karo."

Example:

```text
User keeps typing
    ↓
Timer keeps resetting
    ↓
User stops
    ↓
Wait 1 second
    ↓
Function executes
```

So debounce waits for the **action to stop**.

---

### Throttling

Throttling says:

> "Action continuously hota rahe, mujhe farak nahi padta. Main bas fixed interval ke according function execute karunga."

Example:

```text
Action → Function
Action
Action
Action
    ↓
1 second completed
    ↓
Function
Action
Action
Action
    ↓
1 second completed
    ↓
Function
```

So throttle works according to a **fixed time interval**.

---

# 3. Simple Mental Model

Remember throttling like this:

```text
THROTTLING

Action happens continuously
        ↓
Check time
        ↓
Has the interval completed?
        ↓
    YES → Execute function
        ↓
    NO → Ignore this action
        ↓
Keep checking
```

In one line:

> **Throttling = "Fixed interval par function ko execute karna."**

---

# 4. Real-Life Analogy: Water Tap

Imagine a tap that can release water only once every 1 second.

You can keep turning the tap:

```text
Action
Action
Action
Action
Action
```

But the system says:

```text
0 sec  → Allow
0.2 sec → Ignore
0.4 sec → Ignore
0.7 sec → Ignore
1 sec  → Allow
1.2 sec → Ignore
1.5 sec → Ignore
2 sec  → Allow
```

The action can happen continuously, but the response is limited to a fixed interval.

That's throttling.

---

# 5. Real-Life Example: Elevator

Imagine an elevator system where the door can open only once every 10 seconds.

Multiple people can press the button:

```text
Person 1 → Press
Person 2 → Press
Person 3 → Press
Person 4 → Press
```

But the system doesn't open the door every time someone presses the button.

Instead, it follows a fixed interval.

```text
0 sec → Open
1 sec → Ignore
3 sec → Ignore
7 sec → Ignore
10 sec → Open
```

The event can keep happening, but the reaction is controlled.

---

# 6. Real-Life Example: Scrolling

Scrolling is one of the most common use cases for throttling.

When you scroll a webpage, the `scroll` event can fire many times in a very short period.

For example:

```text
Scroll
Scroll
Scroll
Scroll
Scroll
Scroll
Scroll
...
```

If we perform an expensive operation every time:

```js
window.addEventListener("scroll", function(){
    // expensive operation
});
```

the browser may have to perform that operation many times.

Instead, we can throttle it:

```js
window.addEventListener(
    "scroll",
    throttle(function(){
        console.log("Scroll handled");
    }, 1000)
);
```

Now the function can execute at most once every second.

---

# 7. Real-Life Example: Mouse Movement

Mouse movement can generate a large number of events.

```text
Mouse moves
Mouse moves
Mouse moves
Mouse moves
Mouse moves
...
```

If we need to perform some expensive calculation based on mouse position, executing it for every event may be unnecessary.

Throttling can limit the frequency:

```text
Mouse movement
    ↓
Check interval
    ↓
1 second completed?
    ↓
Yes → Execute
No  → Ignore
```

---

# 8. Real-Life Example: API Requests

Suppose a user continuously performs some action that triggers an API request.

Without throttling:

```text
Action → API
Action → API
Action → API
Action → API
Action → API
```

This could overload the backend.

With throttling:

```text
Action
Action
Action
    ↓
API request
Action
Action
    ↓
Wait for interval
    ↓
API request
```

The API is called at a controlled frequency.

---

# 9. Our Example

The code we are going to understand is:

```js
let input = document.querySelector("input");

function throttle(fnc, delay){

    let timer = 0;

    return function (...args){

        let now = Date.now();

        if(now - timer >= delay)
        {
            timer = now;
            fnc(...args);
        }

    };
}

input.addEventListener(
    "input",
    throttle(function (){
        console.log("throttling in every 1s");
    }, 1000)
);
```

Let's understand every part.

---

# 10. Selecting the Input

```js
let input = document.querySelector("input");
```

This selects the `<input>` element from the HTML document.

For example:

```html
<input type="text">
```

JavaScript finds this element and stores it inside:

```js
input
```

Now we can attach an event listener to it.

---

# 11. Creating the `throttle()` Function

```js
function throttle(fnc, delay){

}
```

Our throttle function accepts two parameters:

### `fnc`

The function that we want to control.

For example:

```js
function(){
    console.log("throttling in every 1s");
}
```

### `delay`

The minimum interval between two executions.

In our example:

```js
1000
```

which means:

```text
1000 milliseconds = 1 second
```

So:

```js
throttle(function(){}, 1000);
```

basically means:

> "Is function ko maximum ek baar har 1 second mein execute hone dena."

---

# 12. The `timer` Variable

Inside the function:

```js
let timer = 0;
```

This variable stores the **time at which the function was last executed**.

Initially:

```text
timer = 0
```

We use `timer` as our reference point.

Important:

> In this implementation, `timer` is not storing a `setTimeout()` timer ID. It is storing a timestamp.

This is an important difference between our debounce and throttle implementations.

---

# 13. `Date.now()`

Inside the returned function:

```js
let now = Date.now();
```

`Date.now()` gives us the current time in milliseconds.

For example:

```text
Date.now()
↓
1724050000000
```

The exact number isn't important.

What matters is that the value keeps increasing with time.

For example:

```text
Time 0 sec → 0-ish timestamp
Time 1 sec → timestamp + 1000
Time 2 sec → timestamp + 2000
```

So we can compare two timestamps to find out how much time has passed.

---

# 14. Why Do We Subtract `timer` From `now`?

We have:

```js
now - timer
```

This tells us:

> "Last execution ke baad kitna time pass hua?"

For example:

```text
timer = 5000
now   = 5700
```

Then:

```text
now - timer
= 5700 - 5000
= 700ms
```

Only 700ms have passed.

If our delay is 1000ms:

```text
700 >= 1000
```

is false.

So the function won't execute.

---

# 15. The `if` Condition

Our main condition is:

```js
if(now - timer >= delay)
```

This is the heart of throttling.

It asks:

> "Kya last execution ke baad required interval complete ho chuka hai?"

Suppose:

```text
delay = 1000ms
```

### Case 1

```text
now - timer = 500ms
```

Then:

```text
500 >= 1000
```

False.

So:

```text
Function execute nahi hoga.
```

---

### Case 2

```text
now - timer = 1000ms
```

Then:

```text
1000 >= 1000
```

True.

So:

```text
Function execute hoga.
```

---

### Case 3

```text
now - timer = 1500ms
```

Then:

```text
1500 >= 1000
```

True.

Again, function executes.

---

# 16. Updating `timer`

Inside the `if` block:

```js
timer = now;
```

This is extremely important.

Once the function executes, we update `timer` to the current time.

For example:

```text
Previous timer = 5000
Current time   = 6000
```

Function executes.

Then:

```js
timer = now;
```

becomes:

```text
timer = 6000
```

Now the next execution must wait another 1000ms.

So:

```text
6000 + 1000
↓
7000
```

Only after that will another execution be allowed.

---

# 17. Calling the Actual Function

After updating the timer:

```js
fnc(...args);
```

The original function is executed.

In our example:

```js
console.log("throttling in every 1s");
```

gets executed.

The `...args` allows our throttle function to work with functions that receive arguments.

---

# 18. Understanding `...args`

We have:

```js
return function (...args){
```

Here `...args` is a **rest parameter**.

It collects all arguments passed to the returned function into an array.

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

So:

```text
...args
```

means:

> "Jo bhi arguments aaye hain, un sabko collect karke `args` naam ke array mein rakh do."

---

# 19. Why Do We Use `fnc(...args)`?

Later we have:

```js
fnc(...args);
```

Here `...args` works as the **spread operator**.

Suppose:

```js
args = [10, 20, 30];
```

Then:

```js
fnc(...args);
```

is equivalent to:

```js
fnc(10, 20, 30);
```

So the arguments collected by the throttle wrapper are passed back to the original function.

This makes our throttle function reusable for different types of functions.

---

# 20. Complete Execution Flow

Consider:

```js
input.addEventListener(
    "input",
    throttle(function(){
        console.log("throttling in every 1s");
    }, 1000)
);
```

Let's see what happens.

### Step 1

JavaScript selects the input:

```js
let input = document.querySelector("input");
```

---

### Step 2

`throttle()` is called:

```js
throttle(function(){}, 1000)
```

So:

```text
fnc   → actual function
delay → 1000ms
```

---

### Step 3

Inside throttle:

```js
let timer = 0;
```

The initial timestamp is:

```text
timer = 0
```

---

### Step 4

Throttle returns:

```js
function(...args){
    let now = Date.now();

    if(now - timer >= delay){
        timer = now;
        fnc(...args);
    }
}
```

This returned function is given to `addEventListener()`.

---

# 21. What Happens When Input Happens?

Suppose the current timestamp is:

```text
10000ms
```

Then:

```js
now = 10000;
```

Initially:

```text
timer = 0
```

So:

```text
now - timer
= 10000 - 0
= 10000
```

Now:

```text
10000 >= 1000
```

True.

Therefore:

```js
timer = now;
```

becomes:

```text
timer = 10000
```

Then:

```js
fnc(...args);
```

executes.

The function runs.

---

# 22. User Types Again After 200ms

Suppose:

```text
now = 10200
```

Our timer is:

```text
timer = 10000
```

So:

```text
now - timer
= 10200 - 10000
= 200ms
```

Check:

```text
200 >= 1000
```

False.

Therefore:

```text
Function doesn't execute.
```

The input event happened, but throttle ignored it.

---

# 23. User Types Again After 500ms

Suppose:

```text
now = 10500
```

Then:

```text
10500 - 10000
= 500ms
```

Check:

```text
500 >= 1000
```

False.

Again:

```text
Function doesn't execute.
```

---

# 24. User Types After 1000ms

Suppose:

```text
now = 11000
```

Then:

```text
11000 - 10000
= 1000ms
```

Check:

```text
1000 >= 1000
```

True.

Therefore:

```js
timer = now;
```

becomes:

```text
timer = 11000
```

And:

```js
fnc(...args);
```

executes.

---

# 25. Dry Run

Suppose:

```text
delay = 1000ms
```

And input events occur at:

```text
0ms
100ms
300ms
600ms
900ms
1100ms
1300ms
1500ms
2000ms
```

| Event Time | `now - timer` | Condition      | Function |
| ---------: | ------------: | -------------- | -------- |
|        0ms |             0 | `0 >= 1000`    | No       |
|      100ms |           100 | `100 >= 1000`  | No       |
|      300ms |           300 | `300 >= 1000`  | No       |
|      600ms |           600 | `600 >= 1000`  | No       |
|      900ms |           900 | `900 >= 1000`  | No       |
|     1100ms |          1100 | `1100 >= 1000` | Yes      |
|     1300ms |           200 | `200 >= 1000`  | No       |
|     1500ms |           400 | `400 >= 1000`  | No       |
|     2000ms |           900 | `900 >= 1000`  | No       |
|     2100ms |          1000 | `1000 >= 1000` | Yes      |

So the function executes approximately:

```text
1100ms
2100ms
```

The input event may happen many times, but the actual function execution is controlled.

---

# 26. Important Difference From Debouncing

Our debounce code uses:

```js
clearTimeout(timer);
setTimeout(...);
```

Throttle uses:

```js
Date.now();
now - timer >= delay;
```

The mechanisms are different.

### Debouncing

```text
Action
↓
Reset timer
↓
Action
↓
Reset timer
↓
Action stops
↓
Wait
↓
Execute
```

### Throttling

```text
Action
↓
Check time
↓
Interval completed?
↓
Yes → Execute
No → Ignore
↓
Keep checking
```

The easiest way to remember:

> **Debounce waits for silence. Throttle controls frequency.**

---

# 27. Debounce Example

Imagine the user types:

```text
javascript
```

with a 1-second debounce.

```text
j
ja
jav
java
javas
javasc
javascr
javascript
      ↓
User stops typing
      ↓
1 second
      ↓
Function executes once
```

So debounce usually gives you the **final action**.

---

# 28. Throttle Example

Now use a 1-second throttle.

```text
j       → execute
ja      → ignore
jav     → ignore
java    → ignore
javas   → ignore
javascript → execute when interval allows
```

The user doesn't have to stop.

The function keeps getting opportunities to execute according to the interval.

---

# 29. Another Real-Life Example: Social Media Feed

Imagine a social media feed where you continuously scroll.

The browser may generate many scroll events:

```text
scroll
scroll
scroll
scroll
scroll
scroll
...
```

Suppose we only want to check whether the user has reached the bottom once every 500ms.

Throttling is appropriate:

```text
Scroll event
↓
Check time
↓
500ms completed?
↓
Yes → Check position
No → Ignore
```

The user can keep scrolling, but our expensive operation isn't executed hundreds of times per second.

---

# 30. Another Real-Life Example: GPS Location Updates

Suppose a vehicle's location is changing continuously.

You don't necessarily need to update a UI element every millisecond.

You might decide:

```text
Update UI once every 1 second
```

The location can keep changing:

```text
Location changes
Location changes
Location changes
Location changes
```

But the UI update happens:

```text
0 sec → update
1 sec → update
2 sec → update
3 sec → update
```

This is a throttling-style problem.

---

# 31. Another Real-Life Example: Logging

Suppose an application generates a huge number of events.

You don't want to write a log entry for every single event.

Instead:

```text
Allow one log every 5 seconds
```

During those 5 seconds:

```text
Event → ignore
Event → ignore
Event → ignore
Event → ignore
```

After 5 seconds:

```text
Event → log
```

Again, this is throttling.

---

# 32. When Should You Use Throttling?

Use throttling when:

* Events happen continuously.
* You still want the function to execute while the event continues.
* You don't need to process every event.
* You want execution at a controlled frequency.
* The event can fire very frequently.
* The operation is expensive.

Common use cases:

```text
Scroll events
Mouse movement
Window resize
Drag events
Continuous location updates
API rate limiting
Performance monitoring
Progress updates
```

---

# 33. When Should You Use Debouncing Instead?

Use debouncing when you primarily care about the **final action after the user stops**.

Examples:

```text
Search suggestions
Autocomplete
Form validation
Filtering
Search API
```

A useful question to ask yourself is:

> "Mujhe user ke action ke beech mein continuously response chahiye, ya user ke rukne ke baad final response chahiye?"

If you want a response at regular intervals:

```text
THROTTLE
```

If you want a response after the user stops:

```text
DEBOUNCE
```

---

# 34. One-Line Difference

```text
Debounce:
"Ruk jao, user ka action khatam hone do."

Throttle:
"Action chalta rahe, main fixed interval par response deta rahunga."
```

---

# 35. Final Mental Model

For throttling, remember these four things:

### 1. `Date.now()`

Gets the current time.

```js
let now = Date.now();
```

### 2. `timer`

Stores the time when the function was last executed.

```js
let timer = 0;
```

### 3. Time difference

```js
now - timer
```

Tells us how much time has passed since the last execution.

### 4. Condition

```js
if(now - timer >= delay)
```

Allows execution only when the required interval has passed.

Together:

```text
Current Time
     ↓
Subtract Last Execution Time
     ↓
Compare With Delay
     ↓
Interval Completed?
     ↓
Yes → Execute + Update timer
No  → Ignore
```

That is the core mechanism behind throttling.

---

# 36. Complete Code

```js
let input = document.querySelector("input");

function throttle(fnc, delay){

    let timer = 0;

    return function (...args){

        let now = Date.now();

        if(now - timer >= delay)
        {
            timer = now;
            fnc(...args);
        }

    };
}

input.addEventListener(
    "input",
    throttle(function (){
        console.log("throttling in every 1s");
    }, 1000)
);
```

The entire concept can ultimately be reduced to:

```text
THROTTLING

Event happens continuously
        ↓
Check current time
        ↓
Enough time passed?
        ↓
   YES          NO
    ↓            ↓
 Execute       Ignore
    ↓
Update last execution time
    ↓
Wait for next interval
```

**Throttling does not stop the event. It only limits how often your function is allowed to respond to that event.**
