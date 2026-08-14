# Prototypal Inheritance vs Classical Inheritance

## Overview

**Inheritance** is a mechanism that allows one entity to reuse properties and methods from another entity.

JavaScript supports **prototypal inheritance**, while languages such as Java and C++ traditionally use **classical inheritance**.

The fundamental difference is:

```text
Classical Inheritance
Class → Class → Object

Prototypal Inheritance
Object → Object
```

JavaScript also provides the `class` syntax, but JavaScript classes are built on top of its underlying **prototype-based inheritance system**.

---

# 1. Classical Inheritance

In classical inheritance, inheritance is primarily structured around **classes**.

A child class extends a parent class and inherits its properties and methods.

For example:

```java
class Animal {
    void eat() {
        System.out.println("Eating");
    }
}

class Dog extends Animal {
}
```

Here:

```text
Animal
  ↑
  |
 Dog
```

`Dog` inherits from `Animal`.

The relationship is:

```text
Parent Class → Child Class
```

This is the traditional inheritance model used in languages such as Java and C++.

---

# 2. Prototypal Inheritance

JavaScript uses **prototypal inheritance**.

Instead of requiring one class to inherit from another class, an object can directly inherit from another object.

The relationship is:

```text
Object → Object
```

For example:

```javascript
let coffee = {
    color: "dark",

    drink: function() {
        console.log("gut gut gut");
    }
};
```

Here, `coffee` is an object containing:

```text
color
drink()
```

We can create another object that uses `coffee` as its prototype:

```javascript
let arabiataCoffee = Object.create(coffee);
```

Now `arabiataCoffee` can access the properties and methods of `coffee`.

---

# 3. `Object.create()`

The most important part of this example is:

```javascript
let arabiataCoffee = Object.create(coffee);
```

`Object.create(coffee)` creates a new object whose **prototype is `coffee`**.

Conceptually:

```text
arabiataCoffee
      |
      ↓
    coffee
    ├── color
    └── drink()
```

`arabiataCoffee` does not need to contain its own `drink()` method.

When JavaScript looks for:

```javascript
arabiataCoffee.drink();
```

it first checks `arabiataCoffee`.

If the method is not found there, JavaScript looks at its prototype:

```text
arabiataCoffee
      ↓
    coffee
      ↓
   drink()
```

This is called the **prototype chain**.

---

# 4. Adding Its Own Properties

The child object can have its own properties as well:

```javascript
arabiataCoffee.taste = "bitter";
```

Now the structure can be visualized as:

```text
arabiataCoffee
├── taste: "bitter"
│
└── Prototype → coffee
                 ├── color: "dark"
                 └── drink()
```

So `arabiataCoffee` has:

```javascript
arabiataCoffee.taste
```

from itself, and:

```javascript
arabiataCoffee.color
arabiataCoffee.drink()
```

from its prototype.

---

# 5. Complete Example

```javascript
let coffee = {
    color: "dark",

    drink: function() {
        console.log("gut gut gut");
    }
};

let arabiataCoffee = Object.create(coffee);

arabiataCoffee.taste = "bitter";

console.log(arabiataCoffee.drink());
```

The important relationship is:

```text
             Prototype
                ↓
arabiataCoffee → coffee
      ↓             ↓
   taste          color
                 drink()
```

When this executes:

```javascript
arabiataCoffee.drink();
```

JavaScript does not find `drink()` directly inside `arabiataCoffee`.

It looks up the prototype chain and finds it inside `coffee`.

---

# 6. Classical vs Prototypal Inheritance

| Classical Inheritance                    | Prototypal Inheritance                            |
| ---------------------------------------- | ------------------------------------------------- |
| Based around classes                     | Based around objects                              |
| Class → Class                            | Object → Object                                   |
| Child class extends parent class         | Object inherits from another object               |
| Common in Java and C++                   | Fundamental to JavaScript                         |
| Uses concepts such as `extends`          | Commonly uses `Object.create()` and prototypes    |
| Classes define the inheritance structure | Objects can directly form prototype relationships |

---

# 7. Key Difference

The biggest difference is **what inherits from what**.

### Classical

```text
Animal
   ↑
   |
  Dog
```

A class inherits from another class.

### Prototypal

```text
dog
 ↓
animal
```

An object inherits from another object through the prototype chain.

---

# 8. Important JavaScript Note

It is not technically correct to say that prototypal inheritance is available **only in JavaScript**. Other languages also support prototype-based inheritance.

However, prototypal inheritance is the **fundamental object inheritance model of JavaScript**.

Even when JavaScript uses:

```javascript
class Admin extends User
```

under the hood, JavaScript is still using prototypes.

The `class` syntax provides a cleaner, class-based way to work with JavaScript's existing prototype system.

---

# Key Takeaways

* **Classical inheritance** is primarily based on classes inheriting from classes.
* **Prototypal inheritance** allows objects to inherit from other objects.
* JavaScript fundamentally uses prototypal inheritance.
* `Object.create()` can create an object with another object as its prototype.
* If a property or method is not found on an object, JavaScript searches its prototype chain.
* Objects can have their own properties while still inheriting properties and methods from their prototype.
* JavaScript's `class` syntax is built on top of the prototype system.

The core idea:

```text
Classical:
Class → Class

Prototypal:
Object → Object
```

In this example:

```javascript
let arabiataCoffee = Object.create(coffee);
```

`arabiataCoffee` inherits from `coffee` through the prototype chain.
