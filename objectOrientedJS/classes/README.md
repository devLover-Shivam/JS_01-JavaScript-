# JavaScript Classes

## Overview

A **class** in JavaScript is a blueprint for creating objects with a common structure and behavior.

Instead of manually creating multiple objects with the same properties and functions, we can define the structure once inside a class and create as many objects as required.

In this example, we create a `CreatePencil` class that represents a pencil.

Each pencil has:

* `name`
* `company`
* `price`
* `color`

And each pencil can:

* `write()`
* `erase()`

---

## 1. Creating a Class

```javascript
class CreatePencil {
    // class body
}
```

The `class` keyword is used to define a class.

Here:

```javascript
class CreatePencil
```

means that `CreatePencil` is a blueprint for creating pencil objects.

A class itself is not a specific pencil. It defines what every pencil object created from it should contain.

Think of it like a manufacturing blueprint:

```text
CreatePencil
     |
     |--- name
     |--- company
     |--- price
     |--- color
     |
     |--- write()
     |--- erase()
```

---

# 2. The Constructor

Inside the class, we have:

```javascript
constructor(name, company, price, color) {
    this.name = name;
    this.company = company;
    this.price = price;
    this.color = color;
}
```

The `constructor()` is a special method that automatically executes whenever a new object is created using the `new` keyword.

For example:

```javascript
let p1 = new CreatePencil("natraj", "nataraj", 10, "black");
```

When this line executes, JavaScript creates a new object and automatically calls the constructor.

The values are passed into the constructor:

```text
name    → "natraj"
company → "nataraj"
price   → 10
color   → "black"
```

The constructor then stores these values inside the newly created object.

---

# 3. Understanding `this`

The most important concept inside the constructor is `this`.

```javascript
this.name = name;
this.company = company;
this.price = price;
this.color = color;
```

Here, `this` refers to the **new object currently being created**.

For:

```javascript
let p1 = new CreatePencil("natraj", "nataraj", 10, "black");
```

`this` refers to `p1`.

Therefore:

```javascript
this.name = name;
```

effectively becomes:

```javascript
p1.name = "natraj";
```

Similarly:

```javascript
p1.company = "nataraj";
p1.price = 10;
p1.color = "black";
```

When we create:

```javascript
let p2 = new CreatePencil("apsara", "apsara", 15, "blue");
```

`this` refers to `p2`.

So:

```javascript
p2.name = "apsara";
p2.company = "apsara";
p2.price = 15;
p2.color = "blue";
```

This is why `this` is essential when creating objects from a class.

---

# 4. Creating Objects Using `new`

We create two pencil objects:

```javascript
let p1 = new CreatePencil("natraj", "nataraj", 10, "black");

let p2 = new CreatePencil("apsara", "apsara", 15, "blue");
```

The `new` keyword creates a new object based on the `CreatePencil` class.

The result can be visualized as:

```text
p1
├── name: "natraj"
├── company: "nataraj"
├── price: 10
└── color: "black"

p2
├── name: "apsara"
├── company: "apsara"
├── price: 15
└── color: "blue"
```

Both objects follow the same blueprint, but they contain different data.

---

# 5. Class Methods

The class also defines behavior:

```javascript
write(text) {
    ...
}

erase() {
    ...
}
```

These are called **methods**.

Methods are functions associated with objects created from the class.

The important difference is that the methods are defined once as part of the class rather than being recreated as own properties on every instance.

---

# 6. The `write()` Method

```javascript
write(text) {
    let h1 = document.createElement("h1");

    h1.textContent = text;

    h1.style.color = this.color;

    document.body.appendChild(h1);
}
```

This method creates an `<h1>` element and displays the provided text using the pencil's color.

For example:

```javascript
p1.write("Hello World");
```

Since:

```javascript
p1.color === "black"
```

the generated heading will have a black color.

Similarly:

```javascript
p2.write("JavaScript Classes");
```

will create a blue heading because:

```javascript
p2.color === "blue"
```

The important line is:

```javascript
h1.style.color = this.color;
```

Here, `this` refers to the object that called the method.

For:

```javascript
p1.write("Hello");
```

`this` refers to `p1`.

For:

```javascript
p2.write("Hello");
```

`this` refers to `p2`.

Therefore:

```javascript
p1.write("Hello");
```

uses:

```javascript
p1.color
```

while:

```javascript
p2.write("Hello");
```

uses:

```javascript
p2.color
```

---

# 7. The `erase()` Method

```javascript
erase() {
    document.body.querySelectorAll("h1").forEach((elem) => {
        if (elem.style.color === this.color) {
            elem.remove();
        }
    });
}
```

The `erase()` method searches for all `<h1>` elements on the page:

```javascript
document.body.querySelectorAll("h1")
```

It then checks every heading:

```javascript
if (elem.style.color === this.color)
```

If the heading's color matches the color of the pencil that called `erase()`, the heading is removed.

For example:

```javascript
p1.erase();
```

Since `p1.color` is `"black"`, it removes black headings.

Similarly:

```javascript
p2.erase();
```

removes blue headings.

This gives each pencil its own behavior based on its properties.

---

# 8. Complete Execution Flow

Consider:

```javascript
let p1 = new CreatePencil("natraj", "nataraj", 10, "black");
```

The execution flow is:

```text
new CreatePencil(...)
        |
        v
Create a new object
        |
        v
constructor() executes
        |
        v
this → newly created object
        |
        v
this.name = "natraj"
this.company = "nataraj"
this.price = 10
this.color = "black"
        |
        v
Object returned and stored in p1
```

So `p1` becomes an object representing a black Nataraj pencil.

---

# 9. Complete Code

```javascript
class CreatePencil {
    constructor(name, company, price, color) {
        this.name = name;
        this.company = company;
        this.price = price;
        this.color = color;
    }

    write(text) {
        let h1 = document.createElement("h1");
        h1.textContent = text;
        h1.style.color = this.color;
        document.body.appendChild(h1);
    }

    erase() {
        document.body.querySelectorAll("h1").forEach((elem) => {
            if (elem.style.color === this.color) {
                elem.remove();
            }
        });
    }
}

let p1 = new CreatePencil("natraj", "nataraj", 10, "black");
let p2 = new CreatePencil("apsara", "apsara", 15, "blue");
```

---

# 10. Using the Objects

We can now use the objects created from the class:

```javascript
p1.write("Hello from Natraj");
p2.write("Hello from Apsara");
```

This creates:

```text
Hello from Natraj  → black
Hello from Apsara  → blue
```

We can then erase them:

```javascript
p1.erase();
```

This removes the black heading.

```javascript
p2.erase();
```

This removes the blue heading.

---

# 11. Why Use Classes?

Without classes, we might create objects manually:

```javascript
let p1 = {
    name: "natraj",
    company: "nataraj",
    price: 10,
    color: "black"
};

let p2 = {
    name: "apsara",
    company: "apsara",
    price: 15,
    color: "blue"
};
```

This works for data, but when objects also need common behavior, the code becomes repetitive.

A class lets us define the structure and behavior once:

```javascript
class CreatePencil {
    // properties
    // methods
}
```

Then we can create multiple objects:

```javascript
let p1 = new CreatePencil(...);
let p2 = new CreatePencil(...);
let p3 = new CreatePencil(...);
let p4 = new CreatePencil(...);
```

All of them follow the same blueprint.

---

# 12. Classes and Prototypes

An important JavaScript concept is that **classes are built on top of JavaScript's prototype system**.

When we define:

```javascript
class CreatePencil {
    write(text) {
        // ...
    }

    erase() {
        // ...
    }
}
```

the `write()` and `erase()` methods are placed on:

```javascript
CreatePencil.prototype
```

They are not copied separately into every object.

Conceptually:

```text
CreatePencil
     |
     v
CreatePencil.prototype
     |
     ├── write()
     └── erase()
          ^
          |
     ┌────┴────┐
     |         |
    p1        p2
```

Both `p1` and `p2` can access these methods through the prototype chain.

This is one of the major advantages of using class methods instead of defining functions inside the constructor.

---

# 13. Class vs Object

A common source of confusion is the difference between a class and an object.

| Class                          | Object                       |
| ------------------------------ | ---------------------------- |
| Blueprint                      | Actual instance              |
| Defines structure and behavior | Contains actual data         |
| `CreatePencil`                 | `p1`, `p2`                   |
| Used to create objects         | Created from the class       |
| Not a specific pencil          | Represents a specific pencil |

Example:

```javascript
class CreatePencil {
    // blueprint
}
```

Then:

```javascript
let p1 = new CreatePencil(...);
```

`CreatePencil` is the blueprint, while `p1` is the actual object.

---

# 14. Key Concepts Demonstrated

This small program demonstrates several important JavaScript concepts:

1. **Classes** — Used to create a reusable blueprint.
2. **Constructor** — Initializes a newly created object.
3. **`this` keyword** — Refers to the current object.
4. **`new` keyword** — Creates a new instance of the class.
5. **Objects/Instances** — `p1` and `p2` are instances of `CreatePencil`.
6. **Methods** — `write()` and `erase()` define object behavior.
7. **Prototype** — Class methods are stored on the class prototype.
8. **DOM Manipulation** — JavaScript dynamically creates and removes HTML elements.
9. **Encapsulation of behavior** — Pencil-related data and operations are grouped together.

---

# 15. The Core Idea

The main idea behind classes is:

```text
Define the blueprint once
          ↓
Create multiple objects
          ↓
Each object gets its own data
          ↓
All objects share common behavior
```

In this example:

```javascript
class CreatePencil
```

is the blueprint.

```javascript
p1
p2
```

are the objects.

Their data is different:

```text
p1 → Natraj, ₹10, black
p2 → Apsara, ₹15, blue
```

But their behavior is the same:

```text
p1.write()  ──┐
              ├──> write behavior
p2.write()  ──┘

p1.erase()  ──┐
              ├──> erase behavior
p2.erase()  ──┘
```

This is the fundamental purpose of classes: **define common structure and behavior once, then create multiple independent objects from that blueprint.**
