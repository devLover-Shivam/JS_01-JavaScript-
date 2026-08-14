# Constructor Functions and Prototypes in JavaScript

## Overview

JavaScript allows us to create multiple objects that follow the same structure without manually defining every object from scratch.

Two important concepts used for this purpose are:

- Constructor Functions
- Prototypes

A constructor function acts as a blueprint for creating objects. The `new` keyword uses that constructor to create a new object and initialize it with the values provided during object creation.

A prototype allows properties and methods to be shared by all objects created from the same constructor.

The example in this project uses a `CreatePencil` constructor to create different pencil objects.

---

## 1. Constructor Functions

A constructor function is a regular JavaScript function that is intended to be used with the `new` keyword.

Its purpose is to define the common structure and behavior of objects.

### Example

```javascript
function CreatePencil(name, price, color){
    this.name = name;
    this.price = price;
    this.color = color;

    this.write = function (){
        let h1 = document.createElement("h1");
        h1.textContent = name + " " + price + " " + color + " ";
        h1.style.color = color;
        document.body.append(h1);
    }
}
```

Here, `CreatePencil` is the constructor function.

It defines three properties:

```javascript
this.name
this.price
this.color
```

and one method:

```javascript
this.write
```

Therefore, every pencil object created using this constructor gets the required pencil information and the ability to execute the `write()` method.

---

## 2. Why Use Constructor Functions?

Imagine a company manufactures pencils.

Every pencil has some common characteristics:

- Name
- Price
- Color
- Ability to write

However, the actual values can be different.

For example:

```text
Natraj  -> 10 -> Red
DOMS    -> 10 -> Green
Linc    -> 10 -> Blue
```

Instead of creating every object manually:

```javascript
let pencil1 = {
    name: "natraj",
    price: 10,
    color: "red"
};

let pencil2 = {
    name: "doms",
    price: 10,
    color: "green"
};
```

we define the structure once:

```javascript
function CreatePencil(name, price, color) {
    this.name = name;
    this.price = price;
    this.color = color;
}
```

Then we can create as many objects as required:

```javascript
let pencil1 = new CreatePencil("natraj", 10, "red");
let pencil2 = new CreatePencil("doms", 10, "green");
let pencil3 = new CreatePencil("linc", 10, "blue");
```

This is the main idea behind a constructor function:

> Define the blueprint once and create multiple objects from that blueprint with different data.

---

## 3. The `new` Keyword

The `new` keyword is extremely important when working with constructor functions.

Consider:

```javascript
let pencil1 = new CreatePencil("natraj", 10, "red");
```

Conceptually, JavaScript performs the following steps:

### Step 1: Create a new empty object

```javascript
{}
```

### Step 2: Set the constructor's `this` to that new object

Inside `CreatePencil`, `this` now refers to the newly created pencil object.

So:

```javascript
this.name = name;
```

becomes conceptually:

```javascript
pencil1.name = "natraj";
```

Similarly:

```javascript
this.price = price;
```

becomes:

```javascript
pencil1.price = 10;
```

and:

```javascript
this.color = color;
```

becomes:

```javascript
pencil1.color = "red";
```

### Step 3: Link the object to the constructor's prototype

The newly created object gets access to properties and methods present on:

```javascript
CreatePencil.prototype
```

### Step 4: Return the newly created object

The object is assigned to:

```javascript
pencil1
```

Therefore:

```javascript
let pencil1 = new CreatePencil("natraj", 10, "red");
```

creates an object similar to:

```javascript
{
    name: "natraj",
    price: 10,
    color: "red",
    write: function() { ... }
}
```

with access to `CreatePencil.prototype`.

---

## 4. Understanding `this` in the Constructor

One of the most important concepts here is the value of `this`.

Normally, the value of `this` depends on how a function is called.

For example:

```javascript
function test() {
    console.log(this);
}

test();
```

In a browser's non-strict JavaScript environment, `this` can refer to the `window` object.

But when the function is called using `new`:

```javascript
new CreatePencil(...)
```

JavaScript creates a new object and makes `this` refer to that new object.

Therefore:

```javascript
this.name = name;
```

does not modify `window.name`.

It modifies the newly created pencil object.

This is one of the major reasons constructor functions are used with `new`.

---

## 5. Creating Multiple Objects

The same constructor can create many independent objects.

```javascript
let pencil1 = new CreatePencil("natraj", 10, "red");

let pencil2 = new CreatePencil("doms", 10, "green");

let pencil3 = new CreatePencil("linc", 10, "blue");
```

All three objects follow the same blueprint but contain different values.

Conceptually:

```text
CreatePencil
     |
     |---- pencil1
     |       name  -> natraj
     |       price -> 10
     |       color -> red
     |
     |---- pencil2
     |       name  -> doms
     |       price -> 10
     |       color -> green
     |
     |---- pencil3
             name  -> linc
             price -> 10
             color -> blue
```

This gives us object creation at scale.

---

# Prototypes

## 6. What Is a Prototype?

Every constructor function has a `prototype` property.

For example:

```javascript
CreatePencil.prototype
```

is an object where shared properties and methods can be placed.

In this example:

```javascript
CreatePencil.prototype.company = "sheryians";
```

we add a `company` property to the prototype.

Now every object created using `CreatePencil` can access:

```javascript
pencil1.company
pencil2.company
pencil3.company
```

All of them return:

```text
sheryians
```

---

## 7. Why Use Prototypes?

Suppose we put a property directly inside the constructor:

```javascript
function CreatePencil(name, price, color) {
    this.name = name;
    this.price = price;
    this.color = color;

    this.write = function () {
        // ...
    };
}
```

Every time we create a new pencil, a new `write` function is created for that object.

For example:

```javascript
let pencil1 = new CreatePencil("natraj", 10, "red");
let pencil2 = new CreatePencil("doms", 10, "green");
```

Both objects receive their own `write` function.

If the behavior is common to every pencil, creating separate copies is unnecessary.

A prototype allows us to define shared behavior once.

For example:

```javascript
CreatePencil.prototype.write = function () {
    // ...
};
```

Now all pencil objects can use the same prototype method.

This is one of the major benefits of prototypes.

---

## 8. Prototype Property in This Example

The code contains:

```javascript
CreatePencil.prototype.company = "sheryians";
```

This does not directly add `company` as an own property to `pencil1`, `pencil2`, or `pencil3`.

Instead, it adds `company` to:

```javascript
CreatePencil.prototype
```

The objects created with `new CreatePencil()` are linked to that prototype.

Therefore:

```javascript
console.log(pencil1.company);
```

returns:

```text
sheryians
```

even though `company` was not directly assigned using:

```javascript
this.company = ...
```

---

# Property Lookup

## 9. How JavaScript Finds `company`

Consider:

```javascript
console.log(pencil1.company);
```

JavaScript first checks the object itself:

```javascript
pencil1
```

If it finds `company`, it returns that value.

If it does not find it, JavaScript checks the object's prototype:

```javascript
CreatePencil.prototype
```

It finds:

```javascript
company = "sheryians"
```

and returns:

```text
sheryians
```

The lookup can be visualized as:

```text
pencil1
   |
   | company not found
   v
CreatePencil.prototype
   |
   | company found
   v
"sheryians"
```

This mechanism is called the **prototype chain**.

---

## 10. Own Properties vs Prototype Properties

This distinction is important.

### Own properties

These are directly stored on the object:

```javascript
this.name = name;
this.price = price;
this.color = color;
```

For example:

```javascript
pencil1.name
```

is an own property of `pencil1`.

### Prototype properties

This property is stored on the prototype:

```javascript
CreatePencil.prototype.company = "sheryians";
```

So:

```javascript
pencil1.company
```

is accessed through the prototype chain.

A useful way to remember it:

```text
Own Property
    |
    +-- Directly belongs to the object

Prototype Property
    |
    +-- Shared through the prototype chain
```

---

# Complete Code Flow

## 11. Step-by-Step Execution

### Step 1: Constructor is defined

```javascript
function CreatePencil(name, price, color) {
    this.name = name;
    this.price = price;
    this.color = color;

    this.write = function () {
        let h1 = document.createElement("h1");
        h1.textContent = name + " " + price + " " + color + " ";
        h1.style.color = color;
        document.body.append(h1);
    };
}
```

At this point, no pencil object has been created.

We have only defined the blueprint.

---

### Step 2: Prototype property is added

```javascript
CreatePencil.prototype.company = "sheryians";
```

Now the constructor's prototype contains:

```javascript
{
    company: "sheryians"
}
```

---

### Step 3: First object is created

```javascript
let pencil1 = new CreatePencil("natraj", 10, "red");
```

JavaScript creates a new object and assigns:

```javascript
pencil1.name = "natraj";
pencil1.price = 10;
pencil1.color = "red";
```

It also gives `pencil1` access to:

```javascript
CreatePencil.prototype
```

Therefore:

```javascript
pencil1.company
```

returns:

```text
sheryians
```

---

### Step 4: Second object is created

```javascript
let pencil2 = new CreatePencil("doms", 10, "green");
```

A completely different object is created.

Its values are:

```text
name  -> doms
price -> 10
color -> green
```

It also has access to the same prototype.

---

### Step 5: Third object is created

```javascript
let pencil3 = new CreatePencil("linc", 10, "blue");
```

Again, a new object is created with its own values and access to the same prototype.

---

# The `write()` Method

## 12. What Does `write()` Do?

The constructor contains:

```javascript
this.write = function () {
    let h1 = document.createElement("h1");

    h1.textContent = name + " " + price + " " + color + " ";

    h1.style.color = color;

    document.body.append(h1);
};
```

When:

```javascript
pencil1.write();
```

is executed:

1. A new `<h1>` element is created.
2. Its text is set using the pencil's data.
3. Its text color is set to the pencil's color.
4. The element is appended to the document body.

For example:

```javascript
pencil1.write();
```

produces an `<h1>` containing information about the Natraj pencil and displays it in red.

Similarly:

```javascript
pencil2.write();
```

uses the DOMS pencil's data and displays it in green.

---

# Constructor Functions vs Prototypes

## 13. When Should You Use Each?

| Requirement | Constructor | Prototype |
|---|---|---|
| Store object-specific data | Yes | Usually no |
| Store name, price, color | Yes | No |
| Store shared methods | Possible | Recommended |
| Store shared constants/properties | Possible | Useful |
| Create multiple objects | Yes, with `new` | Supports those objects |
| Avoid duplicating methods | No | Yes |

A good general design is:

```javascript
function CreatePencil(name, price, color) {
    this.name = name;
    this.price = price;
    this.color = color;
}

CreatePencil.prototype.write = function () {
    // shared behavior
};

CreatePencil.prototype.company = "sheryians";
```

Here:

- Constructor stores data specific to each object.
- Prototype stores behavior or data shared between objects.

---

# Why Constructor Functions and Prototypes Matter

Before modern JavaScript introduced `class` syntax, constructor functions and prototypes were one of the primary ways to implement object-oriented patterns.

Even though modern JavaScript often uses:

```javascript
class CreatePencil {
    // ...
}
```

understanding constructor functions and prototypes is still important because JavaScript's object system is fundamentally prototype-based.

Classes in JavaScript are largely a cleaner syntax built on top of the existing prototype mechanism.

Therefore, understanding:

```javascript
new
this
prototype
prototype chain
```

makes JavaScript's object model much easier to understand.

---

# Important Concepts to Remember

## Constructor Function

A function used as a blueprint for creating objects.

```javascript
function CreatePencil(name, price, color) {
    this.name = name;
    this.price = price;
    this.color = color;
}
```

## `new`

Creates a new object, binds `this` to that object, connects it to the constructor's prototype, and returns the object.

```javascript
let pencil = new CreatePencil("natraj", 10, "red");
```

## `this`

Inside a constructor invoked with `new`, `this` refers to the newly created object.

```javascript
this.name = name;
```

## Prototype

An object used to provide shared properties and methods to objects created by the constructor.

```javascript
CreatePencil.prototype.company = "sheryians";
```

## Prototype Chain

The mechanism through which JavaScript searches for a property when it is not found directly on an object.

```text
pencil1
   |
   v
CreatePencil.prototype
   |
   v
Object.prototype
   |
   v
null
```

---

# Final Mental Model

Think of the constructor as a factory blueprint.

```text
              CreatePencil
             Constructor
                  |
        ---------------------
        |         |         |
        v         v         v
     pencil1   pencil2   pencil3
     Natraj     DOMS      Linc
       |          |         |
       |          |         |
       -----------|---------
                  |
                  v
       CreatePencil.prototype
                  |
          company: "sheryians"
```

The constructor answers:

> What data should every pencil object have?

The prototype answers:

> What should all pencil objects be able to share?

The `new` keyword answers:

> Create a fresh pencil object using this blueprint.

That combination is the fundamental idea behind constructor-based object creation in JavaScript.
