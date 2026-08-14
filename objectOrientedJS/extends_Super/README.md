# JavaScript `extends` and `super`

## Overview

JavaScript's `extends` and `super` keywords are used to implement **inheritance** between classes.

Inheritance allows one class to reuse the properties and methods of another class instead of defining the same code again.

In this example:

```javascript
class User {
    // common user properties and methods
}

class Admin extends User {
    // additional admin functionality
}
```

`User` is the **parent class**, and `Admin` is the **child class**.

---

## 1. `extends`

The `extends` keyword is used when one class needs to inherit from another class.

```javascript
class Admin extends User {
    
}
```

This means:

> `Admin` is a specialized version of `User`.

Therefore, an `Admin` object can access the properties and methods defined in `User`.

For example, `User` contains:

```javascript
constructor(name, address, username, email) {
    this.name = name;
    this.address = address;
    this.username = username;
    this.email = email;
    this.role = "user";
}
```

and:

```javascript
write(text) {
    let h1 = document.createElement("h1");
    h1.textContent = `${this.name}: ` + text;
    document.body.appendChild(h1);
}
```

Because `Admin` extends `User`, an admin also gets access to this functionality.

---

## 2. Why Use `extends`?

Without inheritance, we would have to duplicate the common `User` functionality inside `Admin`.

For example, this would be unnecessary duplication:

```javascript
class Admin {
    constructor(name, address, username, email) {
        this.name = name;
        this.address = address;
        this.username = username;
        this.email = email;
    }

    write(text) {
        // same code as User
    }

    remove() {
        // admin-specific functionality
    }
}
```

Instead:

```javascript
class Admin extends User {
    // only add what is specific to Admin
}
```

This follows the principle:

> **Reuse common functionality and add specialized functionality where required.**

---

# 3. `super`

The `super` keyword is used inside a child class to access functionality from its parent class.

In the `Admin` constructor:

```javascript
constructor(name, address, username, email, role) {
    super(name, address, username, email);
    this.role = "admin";
}
```

Here:

```javascript
super(name, address, username, email);
```

calls the constructor of the `User` class.

It is essentially saying:

> "Run the parent `User` constructor with these values."

The parent constructor handles:

```javascript
this.name = name;
this.address = address;
this.username = username;
this.email = email;
this.role = "user";
```

After that, the `Admin` constructor changes the role:

```javascript
this.role = "admin";
```

So an `Admin` gets the common `User` properties while also having its own admin-specific behavior.

---

# 4. Why Is `super()` Required?

When a child class has its own constructor, JavaScript requires the parent constructor to be called before using `this`.

For example:

```javascript
class Admin extends User {
    constructor(name, address, username, email) {
        super(name, address, username, email);

        this.role = "admin";
    }
}
```

This initializes the inherited part of the object.

Without calling `super()` first, using:

```javascript
this.role = "admin";
```

would result in an error.

---

# 5. Adding Child-Specific Functionality

Inheritance does not mean the child class can only use the parent's functionality.

The child can add its own methods.

In this example:

```javascript
remove() {
    document.querySelectorAll("h1").forEach(function(elem) {
        elem.remove();
    });
}
```

`remove()` belongs specifically to `Admin`.

So:

```javascript
let a1 = new Admin(
    "admin1",
    "india",
    "admin123",
    "a1@a.com"
);
```

can use:

```javascript
a1.write("Hello");
```

because `write()` comes from `User`.

And:

```javascript
a1.remove();
```

because `remove()` is defined inside `Admin`.

---

# 6. `extends` vs `super`

| Keyword          | Purpose                              |
| ---------------- | ------------------------------------ |
| `extends`        | Creates inheritance between classes  |
| `super()`        | Calls the parent class constructor   |
| `super.method()` | Calls a method from the parent class |

Example:

```javascript
class Admin extends User {
    constructor(name, address, username, email) {
        super(name, address, username, email);
        this.role = "admin";
    }
}
```

Here:

```javascript
extends User
```

establishes the inheritance relationship.

And:

```javascript
super(...)
```

initializes the inherited part of the object using the `User` constructor.

---

# 7. When Should You Use Them?

Use `extends` when there is a genuine **"is-a" relationship** between classes.

For this example:

```text
Admin is a User
```

Therefore:

```javascript
class Admin extends User
```

makes sense.

Another example:

```text
Car is a Vehicle
Dog is an Animal
Manager is an Employee
Admin is a User
```

In these situations, inheritance can reduce duplication and make the relationship between classes clear.

Do not use inheritance merely because two classes happen to share a few properties. If the relationship is not naturally an "is-a" relationship, composition is often the better design.

---

# Key Takeaways

* `extends` creates an inheritance relationship between classes.
* The child class inherits properties and methods from the parent class.
* `super()` calls the parent class constructor.
* `super.method()` can call a parent class method.
* A child class can add its own properties and methods.
* `extends` is useful for creating specialized versions of existing classes.
* In this example, `Admin` inherits common functionality from `User` and adds admin-specific behavior through `remove()`.

```javascript
class User {
    // Common functionality
}

class Admin extends User {
    constructor(...) {
        super(...);       // Initialize User
        this.role = "admin";
    }

    remove() {
        // Admin-specific functionality
    }
}
```

The core idea is simple:

**`extends` = inherit from the parent.**

**`super` = use the parent's constructor or methods.**
