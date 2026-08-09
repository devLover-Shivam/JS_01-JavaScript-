# JavaScript `this` Keyword — Different Values in Different Scopes

> A complete guide to understanding the **`this` keyword in JavaScript**.
>
> The `this` keyword is special because its value changes depending on **where it is used and how a function is called**.

---

# What is `this`?

`this` is a special keyword in JavaScript.

Unlike many other keywords, the value of `this` can change depending on the context.

The most important rule is:

> **For normal functions, `this` is mainly determined by how the function is called.**

For arrow functions:

> **`this` is inherited from the surrounding lexical scope.**

---

# Quick Overview

| Situation                          | Value of `this`                             |
| ---------------------------------- | ------------------------------------------- |
| Global scope in browser            | `window`                                    |
| Normal function in non-strict mode | `window`                                    |
| Normal function in strict mode     | `undefined`                                 |
| Object method                      | The object calling the method               |
| Event handler with normal function | The element on which listener is registered |
| Constructor using `new`            | Newly created object                        |
| Class constructor                  | Newly created instance                      |
| Arrow function                     | Inherits `this` from surrounding scope      |
| `call()`                           | Object explicitly provided                  |
| `apply()`                          | Object explicitly provided                  |
| `bind()`                           | Object explicitly provided                  |

---

# Source Code

```javascript
// ========================================
// 1. GLOBAL SCOPE
// ========================================

console.log(this);

// Browser:
// this = window


// ========================================
// 2. NORMAL FUNCTION
// ========================================

function abcd() {
    console.log(this);
}

abcd();

// Non-strict browser JavaScript:
// this = window


// ========================================
// 3. OBJECT METHOD
// ========================================

// Function inside an object is called a method

let obj = {
    name: "Shivam",

    sayName: function () {
        console.log(this.name);
    }
};

obj.sayName();

// this = obj
// this.name = "Shivam"


// ========================================
// 4. EVENT HANDLER
// ========================================

document.querySelector("h1")
    .addEventListener("click", function () {
        console.log(this);
    });

// this = h1 element


// ========================================
// 5. CLASS
// ========================================

class Abcd {

    constructor() {
        console.log("hey");
        this.a = 12;
    }
}

let val = new Abcd();

console.log(val);

// this = newly created object
// val = { a: 12 }
```

---

# 1. Global Scope

When `this` is used directly in the global scope of a browser script:

```javascript
console.log(this);
```

Output:

```text
Window
```

Therefore:

```text
Global Scope
     ↓
   this
     ↓
  window
```

We can verify this using:

```javascript
console.log(this === window);
```

Output:

```text
true
```

Therefore:

```text
this === window
```

---

# Why is `this` equal to `window`?

In a browser, `window` is the global object.

Think of it as:

```text
window
   ↓
Global object of the browser
```

So:

```javascript
this
```

in the global scope refers to:

```javascript
window
```

---

# 2. Function Scope

Consider:

```javascript
function abcd() {
    console.log(this);
}

abcd();
```

In a normal browser script without strict mode:

```text
this = window
```

The function is called as:

```javascript
abcd();
```

There is no object before the function.

Therefore:

```text
Normal Function
      ↓
Normal Function Call
      ↓
this = window
```

---

# Strict Mode

The behavior changes in strict mode.

```javascript
"use strict";

function abcd() {
    console.log(this);
}

abcd();
```

Output:

```text
undefined
```

So:

| Mode            | `this`      |
| --------------- | ----------- |
| Non-strict mode | `window`    |
| Strict mode     | `undefined` |

---

# 3. `this` Inside an Object Method

A function inside an object is called a **method**.

Example:

```javascript
let obj = {
    name: "Shivam",

    sayName: function () {
        console.log(this.name);
    }
};

obj.sayName();
```

Output:

```text
Shivam
```

Why?

Because the function is called as:

```javascript
obj.sayName();
```

The object before the dot is:

```text
obj
```

Therefore:

```text
this = obj
```

So:

```javascript
this.name
```

is equivalent to:

```javascript
obj.name
```

which gives:

```text
Shivam
```

---

# Visual Representation

```text
obj.sayName()

     ↓

obj calls sayName()

     ↓

this = obj

     ↓

this.name

     ↓

obj.name

     ↓

"Shivam"
```

---

# Important Rule

When a normal function is called like:

```javascript
object.method();
```

then:

```text
this = object
```

Easy trick:

> **Look at the object before the dot.**

Examples:

```javascript
user.getName();
```

```text
this = user
```

```javascript
car.start();
```

```text
this = car
```

```javascript
student.study();
```

```text
this = student
```

---

# 4. `this` Depends on How the Function is Called

This is one of the most important concepts.

Consider:

```javascript
let obj1 = {
    name: "Shivam",

    sayName: function () {
        console.log(this.name);
    }
};

let obj2 = {
    name: "Rahul",

    sayName: obj1.sayName
};

obj2.sayName();
```

Output:

```text
Rahul
```

Why not `Shivam`?

Because the function is called as:

```javascript
obj2.sayName();
```

Therefore:

```text
this = obj2
```

So:

```javascript
this.name
```

becomes:

```javascript
obj2.name
```

which is:

```text
Rahul
```

---

# Golden Rule

```text
Do not ask:

"Where was this function created?"

Ask:

"How was this function called?"
```

For normal functions, **invocation matters**.

---

# 5. `this` Inside an Event Handler

Consider:

```javascript
document.querySelector("h1")
    .addEventListener("click", function () {
        console.log(this);
    });
```

Suppose the HTML is:

```html
<h1>Hello World</h1>
```

When the `<h1>` is clicked:

```text
Click Event
     ↓
Event Handler Executes
     ↓
this = h1
```

Therefore:

```javascript
console.log(this);
```

prints the `<h1>` element.

---

# Example

```javascript
document.querySelector("h1")
    .addEventListener("click", function () {
        console.log(this);
    });
```

When we click:

```html
<h1>Hello World</h1>
```

then:

```text
this
 ↓
<h1>Hello World</h1>
```

So:

```text
Event Handler
     ↓
Normal Function
     ↓
this = element
```

---

# 6. `this` vs `event.target`

These two concepts are often confused.

Consider:

```javascript
button.addEventListener("click", function (event) {

    console.log(this);

    console.log(event.target);

});
```

If the listener is directly attached to the button:

```text
this
 ↓
button

event.target
 ↓
button
```

They appear to be the same.

But they are not always the same.

---

# Event Bubbling Example

HTML:

```html
<div id="parent">
    <button>Click Me</button>
</div>
```

JavaScript:

```javascript
document.querySelector("#parent")
    .addEventListener("click", function (event) {

        console.log(this);

        console.log(event.target);

    });
```

If we click the button:

```text
this
 ↓
parent div
```

while:

```text
event.target
 ↓
button
```

Therefore:

```text
this
↓
Element on which listener is registered

event.target
↓
Actual element that triggered the event
```

---

# 7. `this` Inside a Constructor Function

JavaScript allows us to create objects using constructor functions.

Example:

```javascript
function User(name) {
    this.name = name;
}

let user1 = new User("Shivam");

console.log(user1);
```

Output:

```javascript
{
    name: "Shivam"
}
```

Here:

```javascript
new User("Shivam");
```

creates a new object.

Inside the constructor:

```javascript
this
```

refers to the newly created object.

Therefore:

```javascript
this.name = name;
```

means:

```text
New Object
    ↓
name = "Shivam"
```

---

# How `new` Changes `this`

When we write:

```javascript
let user1 = new User("Shivam");
```

conceptually:

```text
New object is created
        ↓
this points to new object
        ↓
constructor executes
        ↓
this.name = "Shivam"
        ↓
object is returned
        ↓
user1 stores the object
```

Therefore:

```javascript
user1
```

becomes:

```javascript
{
    name: "Shivam"
}
```

---

# 8. `this` Inside a Class

Now let's look at a JavaScript class.

```javascript
class Abcd {

    constructor() {
        console.log("hey");
        this.a = 12;
    }

}

let val = new Abcd();

console.log(val);
```

Output:

```text
hey
```

Then:

```text
{ a: 12 }
```

---

# Understanding the Class Example

When we write:

```javascript
let val = new Abcd();
```

a new instance of the class is created.

Then:

```javascript
constructor()
```

runs.

Inside the constructor:

```javascript
this
```

refers to the newly created instance.

Therefore:

```javascript
this.a = 12;
```

means:

```text
New Object
    ↓
a = 12
```

So:

```javascript
val
```

contains:

```javascript
{
    a: 12
}
```

---

# Visual Representation

```text
new Abcd()

     ↓

New Object Created

     ↓

constructor() executes

     ↓

this = new object

     ↓

this.a = 12

     ↓

{ a: 12 }

     ↓

val
```

---

# 9. Arrow Function and `this`

Arrow functions behave differently from normal functions.

Example:

```javascript
let obj = {

    name: "Shivam",

    sayName: () => {
        console.log(this.name);
    }

};

obj.sayName();
```

Many beginners think:

```text
this = obj
```

But that is incorrect.

Arrow functions **do not have their own `this`**.

Instead:

> **Arrow functions inherit `this` from their surrounding lexical scope.**

---

# What Does Lexical `this` Mean?

It simply means:

```text
Arrow Function
     ↓
Looks at surrounding scope
     ↓
Uses surrounding scope's this
```

It does not create a new `this`.

---

# 10. Normal Function vs Arrow Function

## Normal Function

```javascript
let obj = {

    name: "Shivam",

    sayName: function () {
        console.log(this.name);
    }

};

obj.sayName();
```

Here:

```text
obj.sayName()
     ↓
this = obj
     ↓
this.name = "Shivam"
```

---

## Arrow Function

```javascript
let obj = {

    name: "Shivam",

    sayName: () => {
        console.log(this.name);
    }

};

obj.sayName();
```

Here:

```text
Arrow Function
      ↓
No own this
      ↓
Inherits surrounding this
```

The object calling the arrow function does **not** change its `this`.

---

# 11. Normal Function vs Arrow Function

| Normal Function                    | Arrow Function                          |
| ---------------------------------- | --------------------------------------- |
| Has its own `this`                 | Does not have its own `this`            |
| `this` depends on how it is called | `this` comes from surrounding scope     |
| Can be used with `new`             | Cannot be used with `new`               |
| `call()` can change `this`         | `call()` cannot change lexical `this`   |
| `apply()` can change `this`        | `apply()` cannot change lexical `this`  |
| `bind()` can bind `this`           | `bind()` does not change lexical `this` |
| Useful for object methods          | Useful when we want surrounding `this`  |

---

# 12. Arrow Function Inside an Object Method

This is a very useful pattern.

```javascript
let obj = {

    name: "Shivam",

    outer: function () {

        console.log(this.name);

        const inner = () => {

            console.log(this.name);

        };

        inner();
    }
};

obj.outer();
```

Output:

```text
Shivam
Shivam
```

Why?

First:

```javascript
obj.outer();
```

Therefore:

```text
outer's this = obj
```

Then:

```javascript
const inner = () => {
    console.log(this.name);
};
```

The arrow function does not create its own `this`.

It inherits:

```text
outer's this
```

Therefore:

```text
inner's this = obj
```

---

# Visual Representation

```text
obj.outer()

     ↓

outer()

     ↓

this = obj

     ↓

inner arrow function

     ↓

Arrow inherits this

     ↓

this = obj
```

---

# 13. Nested Normal Function

Now compare this with a normal nested function.

```javascript
let obj = {

    name: "Shivam",

    outer: function () {

        console.log(this.name);

        function inner() {
            console.log(this.name);
        }

        inner();
    }
};

obj.outer();
```

Output in non-strict browser JavaScript:

```text
Shivam
undefined
```

Why?

The outer function is called as:

```javascript
obj.outer();
```

Therefore:

```text
outer's this = obj
```

But the inner function is called as:

```javascript
inner();
```

This is a normal function call.

Therefore:

```text
inner's this = window
```

in non-strict browser JavaScript.

So:

```javascript
this.name
```

inside `inner()` means:

```javascript
window.name
```

not:

```javascript
obj.name
```

---

# 14. Solving Nested Function Problems With Arrow Functions

Instead of:

```javascript
function inner() {
    console.log(this.name);
}
```

use:

```javascript
const inner = () => {
    console.log(this.name);
};
```

Complete example:

```javascript
let obj = {

    name: "Shivam",

    outer: function () {

        console.log(this.name);

        const inner = () => {
            console.log(this.name);
        };

        inner();
    }
};

obj.outer();
```

Output:

```text
Shivam
Shivam
```

Because:

```text
outer this = obj
        ↓
arrow function
        ↓
inherits outer's this
        ↓
inner this = obj
```

---

# 15. `this` With `call()`

JavaScript allows us to explicitly control the value of `this`.

Example:

```javascript
function greet() {
    console.log(this.name);
}

let user = {
    name: "Shivam"
};

greet.call(user);
```

Output:

```text
Shivam
```

Because:

```javascript
greet.call(user);
```

explicitly tells JavaScript:

```text
this = user
```

Therefore:

```javascript
this.name
```

becomes:

```javascript
user.name
```

---

# 16. `this` With `apply()`

`apply()` behaves similarly to `call()`.

Example:

```javascript
function greet(city) {

    console.log(this.name);
    console.log(city);

}

let user = {
    name: "Shivam"
};

greet.apply(user, ["Kolkata"]);
```

Output:

```text
Shivam
Kolkata
```

Here:

```text
this = user
```

---

# `call()` vs `apply()`

### `call()`

```javascript
greet.call(user, "Kolkata");
```

Arguments are passed individually.

### `apply()`

```javascript
greet.apply(user, ["Kolkata"]);
```

Arguments are passed as an array.

---

# 17. `this` With `bind()`

`bind()` creates a new function whose `this` is bound to a specific object.

Example:

```javascript
function greet() {
    console.log(this.name);
}

let user = {
    name: "Shivam"
};

let newFunction = greet.bind(user);

newFunction();
```

Output:

```text
Shivam
```

Here:

```javascript
greet.bind(user);
```

creates a new function that remembers:

```text
this = user
```

So:

```javascript
newFunction();
```

uses:

```text
this = user
```

---

# 18. `call()`, `apply()` and `bind()`

| Method    | Purpose                                          |
| --------- | ------------------------------------------------ |
| `call()`  | Calls function immediately with specified `this` |
| `apply()` | Calls function immediately with specified `this` |
| `bind()`  | Returns a new function with specified `this`     |

Example:

```javascript
function greet() {
    console.log(this.name);
}

let user = {
    name: "Shivam"
};
```

### call

```javascript
greet.call(user);
```

### apply

```javascript
greet.apply(user);
```

### bind

```javascript
const fn = greet.bind(user);

fn();
```

For a normal function, all three can make:

```text
this = user
```

---

# 19. Same Function, Different `this`

Consider:

```javascript
function greet() {
    console.log(this);
}

let obj = {
    name: "Shivam",
    greet: greet
};
```

### Case 1

```javascript
greet();
```

Non-strict browser JavaScript:

```text
this = window
```

---

### Case 2

```javascript
obj.greet();
```

```text
this = obj
```

---

### Case 3

```javascript
greet.call(obj);
```

```text
this = obj
```

---

### Case 4

```javascript
new greet();
```

```text
this = newly created object
```

This proves:

> **The same normal function can have different values of `this` depending on how it is invoked.**

---

# 20. Dry Run — Global Scope

Code:

```javascript
console.log(this);
```

Execution:

```text
JavaScript starts executing
        ↓
Global scope
        ↓
this is evaluated
        ↓
Browser global object
        ↓
window
```

Output:

```text
Window
```

---

# 21. Dry Run — Normal Function

Code:

```javascript
function abcd() {
    console.log(this);
}

abcd();
```

Execution:

```text
abcd() is called
        ↓
Normal function call
        ↓
No object before function
        ↓
Non-strict browser environment
        ↓
this = window
```

Output:

```text
Window
```

---

# 22. Dry Run — Object Method

Code:

```javascript
let obj = {

    name: "Shivam",

    sayName: function () {
        console.log(this.name);
    }

};

obj.sayName();
```

Execution:

```text
obj.sayName()
      ↓
Object calling method = obj
      ↓
this = obj
      ↓
this.name
      ↓
obj.name
      ↓
"Shivam"
```

Output:

```text
Shivam
```

---

# 23. Dry Run — Event Handler

Code:

```javascript
document.querySelector("h1")
    .addEventListener("click", function () {
        console.log(this);
    });
```

Execution:

```text
User clicks h1
      ↓
Browser detects click
      ↓
Event handler executes
      ↓
Normal function
      ↓
this = h1
      ↓
console.log(this)
```

Output:

```text
<h1>...</h1>
```

---

# 24. Dry Run — Class

Code:

```javascript
class Abcd {

    constructor() {
        console.log("hey");
        this.a = 12;
    }

}

let val = new Abcd();

console.log(val);
```

Execution:

```text
new Abcd()
     ↓
New object created
     ↓
constructor() executes
     ↓
this = new object
     ↓
this.a = 12
     ↓
object becomes { a: 12 }
     ↓
val stores the object
```

Output:

```text
hey

{ a: 12 }
```

---

# 25. Dry Run — Arrow Function

Code:

```javascript
let obj = {

    name: "Shivam",

    greet: () => {
        console.log(this.name);
    }

};

obj.greet();
```

Execution:

```text
obj.greet()
     ↓
Arrow function executes
     ↓
Arrow function does NOT create this
     ↓
Looks at surrounding scope
     ↓
Inherits surrounding this
```

Therefore:

```text
this ≠ obj
```

automatically.

---

# 26. Common Mistakes

## Mistake 1 — "`this` Means Current Function"

Wrong:

```text
this = current function
```

`this` does not mean the current function.

---

## Mistake 2 — "`this` Always Means Current Object"

Wrong.

`this` can be:

```text
window
```

```text
undefined
```

```text
an object
```

```text
an HTML element
```

```text
a newly created instance
```

depending on the situation.

---

## Mistake 3 — "`this` Depends on Where the Function is Written"

For normal functions, this is generally wrong.

Consider:

```javascript
let obj = {

    name: "Shivam",

    greet: function () {
        console.log(this.name);
    }

};
```

If we call:

```javascript
obj.greet();
```

then:

```text
this = obj
```

But:

```javascript
let greet = obj.greet;

greet();
```

is a different invocation.

Therefore:

```text
this changes
```

---

## Mistake 4 — Arrow Functions Have Their Own `this`

Wrong.

Arrow functions:

```text
do NOT create their own this
```

They inherit `this` from their surrounding lexical scope.

---

# 27. Interview Question

### What is `this` in JavaScript?

A strong interview answer:

> "`this` is a special JavaScript keyword whose value depends on the execution context. For normal functions, `this` is primarily determined by how the function is invoked. When a method is called using an object, `this` refers to that object. When a constructor or class is called using `new`, `this` refers to the newly created instance. Arrow functions are different because they do not have their own `this`; they lexically inherit it from their surrounding scope."

---

# 28. Real-Life Analogy

Think of `this` like the person holding a microphone.

The microphone is the function.

The person holding it depends on the situation.

For example:

```text
Shivam speaks
     ↓
this = Shivam
```

```text
Rahul speaks
     ↓
this = Rahul
```

The microphone/function is the same.

But the person using it changes.

Similarly:

```javascript
obj.greet();
```

means:

```text
obj is using the function
```

so:

```text
this = obj
```

Whereas:

```javascript
otherObj.greet();
```

means:

```text
otherObj is using the function
```

so:

```text
this = otherObj
```

---

# 29. One-Line Mental Model

```text
GLOBAL
↓
this = window
```

```text
NORMAL FUNCTION
↓
depends on how it is called
```

```text
obj.method()
↓
this = obj
```

```text
EVENT HANDLER + NORMAL FUNCTION
↓
this = element
```

```text
new
↓
this = newly created object
```

```text
CLASS CONSTRUCTOR
↓
this = newly created instance
```

```text
ARROW FUNCTION
↓
inherits surrounding this
```

```text
call / apply / bind
↓
explicitly control this
```

---

# 30. The Golden Rule

The most important thing to remember:

```text
Normal Function
        ↓
Ask:
"HOW was the function called?"
```

Whereas:

```text
Arrow Function
        ↓
Ask:
"WHERE was the arrow function created?"
```

So:

```text
NORMAL FUNCTION
↓
Dynamic `this`
↓
Determined by invocation
```

and:

```text
ARROW FUNCTION
↓
Lexical `this`
↓
Inherited from surrounding scope
```

---

# 31. Final Cheat Sheet

```text
┌─────────────────────────────────────────────┐
│             JAVASCRIPT `this`               │
└─────────────────────────────────────────────┘

GLOBAL SCOPE
    ↓
this = window


NORMAL FUNCTION
    ↓
this depends on how it is called


OBJECT METHOD
    ↓
obj.method()
    ↓
this = obj


EVENT HANDLER
    ↓
normal function
    ↓
this = element


CONSTRUCTOR
    ↓
new Constructor()
    ↓
this = new object


CLASS
    ↓
new Class()
    ↓
this = new instance


ARROW FUNCTION
    ↓
does NOT have its own this
    ↓
inherits surrounding this


call()
    ↓
explicit this


apply()
    ↓
explicit this


bind()
    ↓
returns function with bound this
```

---

# ⭐ Final Takeaway

If you remember only **two things**, remember these:

```text
1. NORMAL FUNCTION

"How was I called?"

        ↓

this depends on invocation
```

```text
2. ARROW FUNCTION

"Where was I created?"

        ↓

this comes from surrounding scope
```

> **Normal function → `this` depends on invocation.**
>
> **Arrow function → `this` comes from the surrounding scope.**
