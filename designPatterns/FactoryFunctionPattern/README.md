# Factory Function Pattern in JavaScript

## Overview

The **Factory Function Pattern** is a creational design pattern used to create objects through a normal function.

Instead of creating objects with:

```js
new Product()
```

or:

```js
class Product {}
```

we create a function that builds and returns the object for us:

```js
createProduct(...)
```

The basic idea is:

```text
Factory Function
      ↓
Create and configure object
      ↓
Return object
```

Think of a factory function as an **object-making machine**.

Every time you call it, you get a new object.

---

# 1. Why Do We Need Factory Functions?

Suppose an application needs hundreds of products:

```text
iPhone
Laptop
Keyboard
Mouse
Headphones
Monitor
...
```

Each product may have:

* Name
* Price
* Stock
* Methods
* Product-specific state

Creating every object manually would lead to duplicated code.

Without a factory:

```js
const iphone = {
    name: "iPhone",
    price: 70000,
    ...
};

const laptop = {
    name: "Laptop",
    price: 90000,
    ...
};

const keyboard = {
    name: "Keyboard",
    price: 2000,
    ...
};
```

The structure is repeatedly written.

A factory function moves the common object-creation logic into one place.

```js
function createProduct(name, price) {
    return {
        name,
        price,
        ...
    };
}
```

Now:

```js
const iphone = createProduct("iPhone", 70000);
const laptop = createProduct("Laptop", 90000);
const keyboard = createProduct("Keyboard", 2000);
```

The creation logic exists only once.

---

# 2. Basic Structure

A factory function generally looks like:

```js
function createSomething(data) {

    // Internal state

    return {
        // Public properties
        // Public methods
    };
}
```

Calling:

```js
const obj = createSomething(...);
```

returns a new object.

So:

```text
createSomething()
       ↓
    object 1

createSomething()
       ↓
    object 2

createSomething()
       ↓
    object 3
```

Each call creates a separate object.

---

# 3. Understanding the Given Example

The code defines:

```js
function createProduct(naame, price) {
    let stock = 10;

    return {
        name,
        price,

        checkStock() {
            console.log(`${stock} pieces are in the stock.`);
        },

        buy(qty) {
            if(qty <= stock) {
                stock -= qty;
                console.log(`${qty} pieces booked - ${stock} pieces left`);
            } else {
                console.error(
                    `We only have ${stock} pieces left. Please Order Within The Stock Amount`
                );
            }
        },

        refill(qty) {
            stock += qty;
            console.log(`refilled the stock - ${stock} pieces now`);
        }
    };
}
```

The function acts as the factory.

Every time we call:

```js
createProduct(...)
```

it creates a new product object.

---

# 4. The Factory Is the Object-Making Machine

Consider:

```js
let iphone = createProduct("iphone17", 70000);
```

The factory receives:

```text
name = "iphone17"
price = 70000
```

and creates an object containing:

```text
name
price
stock
checkStock()
buy()
refill()
```

The returned object is stored in:

```js
iphone
```

Now:

```js
iphone.buy(5);
```

works because the factory gave that object a `buy()` method.

---

# 5. Creating Another Object

Now:

```js
let kitKat = createProduct("KitKat-D", 30);
```

The same factory function runs again.

It creates a completely separate object.

So we have:

```text
createProduct("iphone17", 70000)
            ↓
          iphone

createProduct("KitKat-D", 30)
            ↓
          kitKat
```

These are two different objects with their own state.

---

# 6. Private State With Factory Functions

One particularly useful feature of your example is:

```js
let stock = 10;
```

`stock` is not returned directly.

Instead, the returned methods use it:

```js
checkStock()
buy()
refill()
```

This creates private state through a **closure**.

For example:

```js
iphone.buy(5);
```

changes the `stock` belonging to the `iphone` object.

It does not change the stock of `kitKat`.

Conceptually:

```text
iphone
 ├── name
 ├── price
 └── private stock = 5

kitKat
 ├── name
 ├── price
 └── private stock = 10
```

Each factory invocation creates its own closure and therefore its own `stock`.

This is one of the strongest reasons factory functions are useful.

---

# 7. Execution Flow of the Current Example

The first call is:

```js
let iphone = createProduct("iphone17",70000);
```

The factory executes:

```text
createProduct()
      ↓
Create stock = 10
      ↓
Create object
      ↓
Return object
      ↓
Store it in iphone
```

Then:

```js
iphone.buy(23);
```

runs.

The current stock is:

```text
10
```

The code checks:

```js
23 <= 10
```

which is false.

Therefore the purchase is rejected.

The message is:

```text
We only have 10 pieces left. Please Order Within The Stock Amount
```

The stock remains:

```text
10
```

Then:

```js
let kitKat = createProduct("KitKat-D",30);
```

creates another completely independent product.

Its stock starts at:

```text
10
```

Then:

```js
kitKat.buy(9);
```

checks:

```text
9 <= 10
```

which is true.

So:

```text
stock = 10 - 9
      = 1
```

and the output becomes:

```text
9 pieces booked - 1 pieces left
```

---

# 8. Important Bugs in the Current Code

There are two naming mistakes in the provided code that should be fixed.

## Problem 1: `naame` vs `name`

The function parameter is:

```js
function createProduct(naame, price)
```

but the returned object contains:

```js
name,
```

There is no variable called `name`.

It should be:

```js
function createProduct(name, price)
```

Then:

```js
return {
    name,
    price,
    ...
};
```

will work correctly.

---

## Problem 2: `sotck` typo

Inside `refill()`:

```js
console.log(`refilled the stock - ${sotck} pieces now`);
```

`sotck` does not exist.

It should be:

```js
console.log(`refilled the stock - ${stock} pieces now`);
```

These look like small mistakes, but in production code, naming consistency matters enormously. One typo is enough to break an otherwise perfectly reasonable design.

---

# 9. Corrected Version

```js
function createProduct(name, price) {

    let stock = 10;

    return {

        name,
        price,

        checkStock() {
            console.log(`${stock} pieces are in the stock.`);
        },

        buy(qty) {
            if (qty <= stock) {
                stock -= qty;
                console.log(
                    `${qty} pieces booked - ${stock} pieces left`
                );
            } else {
                console.error(
                    `We only have ${stock} pieces left. Please Order Within The Stock Amount`
                );
            }
        },

        refill(qty) {
            stock += qty;
            console.log(
                `Refilled the stock - ${stock} pieces now`
            );
        }
    };
}

let iphone = createProduct("iphone17", 70000);
iphone.buy(5);

let kitKat = createProduct("KitKat-D", 30);
kitKat.buy(9);
```

---

# 10. Why Is This Called a Factory?

Because the function behaves like a physical factory.

Imagine a manufacturing plant:

```text
                    FACTORY
                       |
        ┌──────────────┼──────────────┐
        ↓              ↓              ↓
      iPhone         Laptop         Keyboard
```

The factory knows:

* How the object should be structured
* Which properties it should have
* Which methods it should have
* Which initial values it should receive

The caller only provides the required input.

```js
createProduct("iPhone", 70000);
```

The caller does not have to construct every property manually.

---

# 11. Factory Function vs Constructor Function

A factory function:

```js
function createProduct(name, price) {
    return {
        name,
        price
    };
}
```

is used like:

```js
const product = createProduct("iPhone", 70000);
```

There is no:

```text
new
```

keyword.

A constructor function is different:

```js
function Product(name, price) {
    this.name = name;
    this.price = price;
}
```

and is used as:

```js
const product = new Product("iPhone", 70000);
```

The important distinction is that factory functions explicitly create and return the object, while constructor functions rely on `new` and prototype-based construction.

---

# 12. Factory Function vs Class

With a class:

```js
class Product {
    constructor(name, price) {
        this.name = name;
        this.price = price;
    }
}
```

we create:

```js
const product = new Product("iPhone", 70000);
```

With a factory:

```js
function createProduct(name, price) {
    return {
        name,
        price
    };
}
```

we create:

```js
const product = createProduct("iPhone", 70000);
```

The factory approach can be much simpler when inheritance and prototype-based behavior are not necessary.

---

# 13. Real Production-Level Example: User Creation

Imagine a web application that creates different user objects.

Instead of duplicating user creation logic:

```js
const user1 = {...};
const user2 = {...};
const user3 = {...};
```

you can have:

```js
function createUser(name, email, role) {

    let loginAttempts = 0;

    return {

        name,
        email,
        role,

        login() {
            console.log(`${name} logged in`);
            loginAttempts = 0;
        },

        failedLogin() {
            loginAttempts++;
            console.log(`Failed attempts: ${loginAttempts}`);
        },

        getLoginAttempts() {
            return loginAttempts;
        }
    };
}
```

Then:

```js
const admin = createUser(
    "Shivam",
    "shivam@example.com",
    "admin"
);

const developer = createUser(
    "Rahul",
    "rahul@example.com",
    "developer"
);
```

Each user gets its own state.

```text
admin
 └── loginAttempts

developer
 └── loginAttempts
```

The two values are independent.

This is useful in real applications where many entities share the same behavior but maintain different state.

---

# 14. Real Production-Level Example: Database Connection

A factory can also hide setup complexity.

For example:

```js
function createDatabaseClient(config) {

    let connected = false;

    function connect() {
        connected = true;
        console.log("Database connected");
    }

    function disconnect() {
        connected = false;
        console.log("Database disconnected");
    }

    function query(sql) {

        if (!connected) {
            console.error("Database is not connected");
            return;
        }

        console.log(`Executing: ${sql}`);
    }

    return {
        connect,
        disconnect,
        query
    };
}
```

Now different services can create their own clients:

```js
const userDB = createDatabaseClient(userConfig);
const analyticsDB = createDatabaseClient(analyticsConfig);
```

Each client has its own state.

The rest of the application does not need to know how the internal connection state is maintained.

---

# 15. Real Production-Level Example: Shopping Cart

A shopping cart is another natural use case.

```js
function createCart() {

    let items = [];

    function addItem(product) {
        items.push(product);
    }

    function removeItem(productId) {
        items = items.filter(item => item.id !== productId);
    }

    function getItems() {
        return [...items];
    }

    function getTotal() {
        return items.reduce(
            (total, item) => total + item.price,
            0
        );
    }

    return {
        addItem,
        removeItem,
        getItems,
        getTotal
    };
}
```

Now:

```js
const cart1 = createCart();
const cart2 = createCart();
```

creates two independent carts.

```text
cart1
 └── private items

cart2
 └── private items
```

This is exactly the kind of repeated object creation problem that factory functions handle well.

---

# 16. When Should You Use Factory Functions?

Factory functions are particularly useful when:

```text
You need many similar objects
        +
Each object needs its own state
        +
You want simple object creation
        +
You want to avoid class syntax
        +
Some internal data should remain private
```

Common examples include:

```text
Users
Products
Shopping carts
Tasks
Orders
Database clients
API clients
Game entities
Configuration objects
Services
```

---

# 17. Advantages

## Simple Object Creation

You call a function and get an object.

```js
const product = createProduct(...);
```

## No `new` Required

This can make the API easier to read.

## Private State

Variables inside the factory can remain inaccessible directly.

```js
let stock = 10;
```

## Independent Instances

Every invocation gets its own state.

```js
const a = createProduct(...);
const b = createProduct(...);
```

`a` and `b` do not share the same `stock`.

## Flexible

The factory can contain conditions and different object creation logic before returning the final object.

---

# 18. Important Trade-Off

There is a practical downside to the simple factory approach.

Every returned object can get its own copies of the methods:

```js
checkStock()
buy()
refill()
```

If thousands of objects are created, this may consume more memory than sharing methods through a prototype.

For example:

```text
Factory
 ↓
Product 1 → own methods
Product 2 → own methods
Product 3 → own methods
```

With prototypes/classes, methods can be shared:

```text
             Prototype
           /     |      \
          ↓      ↓       ↓
      Product1 Product2 Product3
```

So factory functions are not automatically "better" than classes or constructors.

The right choice depends on the problem.

---

# 19. Factory Functions and Closures

One of the strongest aspects of your example is the combination of:

```text
Factory Function
       +
Closure
       +
Private State
```

For example:

```js
function createProduct(name, price) {

    let stock = 10;

    return {
        buy(qty) {
            stock -= qty;
        }
    };
}
```

Even after `createProduct()` finishes, `buy()` still remembers `stock`.

That is because of closure.

So:

```text
createProduct()
      ↓
creates stock
      ↓
returns methods
      ↓
function finishes
      ↓
methods still remember stock
```

This is powerful for managing object-specific state.

---

# 20. Factory Pattern vs Factory Function

These terms are often used loosely, but there is a distinction worth knowing.

A **factory function** is simply a function that creates and returns objects.

A broader **Factory Pattern** is a design approach where object creation is separated and controlled through a dedicated creation mechanism.

Your current code is best understood as a:

> **Factory Function Pattern**

It is the simpler JavaScript-friendly form of factory-based object creation.

---

# 21. Final Mental Model

Remember the pattern like this:

```text
                  FACTORY FUNCTION
                         |
                         ↓
               createProduct(...)
                         |
              ┌──────────┴──────────┐
              ↓                     ↓
          Private State          Object Data
          stock = 10             name, price
              |                     |
              └──────────┬──────────┘
                         ↓
                  Public Methods
                         |
                         ↓
                     New Object
```

Every call creates another independent instance:

```text
createProduct()
      ↓
   Product A

createProduct()
      ↓
   Product B

createProduct()
      ↓
   Product C
```

The core idea is:

> **Use a function as a controlled object-creation mechanism so that you can create many similar objects without repeating their construction logic.**

The deeper engineering value is not simply avoiding `class` or `new`. It is **centralizing object creation, keeping related state and behavior together, and optionally using closures to protect instance-specific state**.

For modern JavaScript, factory functions are especially useful when you want composition, private state, and simple object creation without needing the full machinery of classes and inheritance.
