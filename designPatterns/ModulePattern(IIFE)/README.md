# Module Pattern in JavaScript

## Overview

The **Module Pattern** is a design pattern used to organize related data and functions into a single unit while keeping internal implementation details private.

In JavaScript, the classic Module Pattern is commonly implemented using an **IIFE (Immediately Invoked Function Expression)**.

The basic idea is:

```text
IIFE
  ↓
Private variables + Private functions
  ↓
Return only what is required
  ↓
Public API
```

This gives us **encapsulation** and **data hiding**.

---

# 1. Why Do We Need the Module Pattern?

Imagine a large application where everything is publicly accessible:

```js
let balance = 12000;

function withdraw(amount) {
    balance -= amount;
}
```

Now any part of the application can directly modify:

```js
balance = 999999;
```

That is dangerous.

The Module Pattern allows us to keep sensitive internal data private and expose only controlled operations.

```text
Private implementation
        ↓
Controlled public interface
        ↓
Other parts of application
```

The outside world does not need to know how the internal logic works.

It only needs to know **what it can do**.

---

# 2. What Is IIFE?

IIFE stands for:

**Immediately Invoked Function Expression**

Example:

```js
(function () {
    console.log("Executed immediately");
})();
```

The function is:

1. Created
2. Immediately executed
3. Its internal variables remain inside its scope

This makes IIFE useful for creating private state.

---

# 3. Module Pattern Structure

The general structure looks like this:

```js
let module = (function () {

    // Private variables
    // Private functions

    return {
        // Public methods
    };

})();
```

Think of it as:

```text
                    Module
                      |
                 IIFE executes
                      |
          ┌───────────┴───────────┐
          ↓                       ↓
      Private                 Public
      variables               methods
      functions                |
                              ↓
                        Accessible outside
```

---

# 4. Understanding the Given Example

The code creates a banking module:

```js
let Bank = (function(){
    let bankBalance = 12000;

    function checkBalance(){
        console.log(bankBalance);
    }

    function setBalance(val) {
        bankBalance = val;
    }

    function withDraw(val) {
        if(val <= bankBalance){
            bankBalance -= val;
            console.log("balance left:" + bankBalance);
        }
    }

    return {
        checkBalance,
        setBalance,
        withDraw
    };
})();
```

The important thing is that:

```js
bankBalance
```

is **not returned**.

Therefore, code outside the module cannot directly access it.

But the outside world can use:

```js
Bank.checkBalance();
Bank.setBalance();
Bank.withDraw();
```

because these functions were returned.

---

# 5. Private vs Public

In this example:

### Private

```js
let bankBalance = 12000;
```

```js
function checkBalance() { ... }
```

```js
function setBalance(val) { ... }
```

```js
function withDraw(val) { ... }
```

Technically, the functions are kept private by being inside the IIFE, while the returned references expose selected ones as the public API.

The outside code cannot do:

```js
Bank.bankBalance
```

because `bankBalance` was never returned.

It also cannot directly do:

```js
Bank.bankBalance = 500000;
```

to modify the original private variable.

Instead, it must use the exposed methods.

---

# 6. The Returned Object Is the Public API

This part is the heart of the pattern:

```js
return {
    checkBalance,
    setBalance,
    withDraw
};
```

The object returned from the IIFE becomes:

```js
Bank
```

Therefore:

```js
Bank.checkBalance();
```

works.

But:

```js
Bank.bankBalance;
```

does not.

We can visualize it as:

```text
IIFE
│
├── bankBalance      ← PRIVATE
├── checkBalance     ← PRIVATE
├── setBalance       ← PRIVATE
└── withDraw         ← PRIVATE
       │
       ↓
    return
       │
       ├── checkBalance
       ├── setBalance
       └── withDraw
                ↓
          PUBLIC API
                ↓
              Bank
```

---

# 7. Execution Flow of the Current Example

The program starts with:

```js
let Bank = (function(){
```

The IIFE executes immediately.

Inside it:

```js
let bankBalance = 12000;
```

creates the private balance.

Then the private functions are created.

Finally, the IIFE returns:

```js
{
    checkBalance,
    setBalance,
    withDraw
}
```

That returned object is stored in:

```js
Bank
```

Now this executes:

```js
Bank.checkBalance();
```

which internally accesses the private:

```js
bankBalance
```

and prints:

```text
12000
```

Then:

```js
Bank.withDraw(2000);
```

calls the private `withDraw()` function.

Inside it:

```js
bankBalance -= 2000;
```

changes the private balance to:

```text
10000
```

and prints:

```text
balance left:10000
```

The important part is that `bankBalance` remains private throughout the process.

---

# 8. Why Does This Work?

The key concept behind this pattern is **closure**.

The returned functions remember the variables that existed inside the IIFE.

For example:

```js
function withDraw(val) {
    bankBalance -= val;
}
```

Even after the IIFE has finished executing, `withDraw()` can still access:

```js
bankBalance
```

because the function retains access to its surrounding lexical environment.

So:

```text
IIFE finishes
      ↓
Private variable still exists
      ↓
Returned functions retain access
      ↓
Outside code cannot directly access it
```

This combination of **IIFE + closure + returned public methods** forms the classic Module Pattern.

---

# 9. Real Production-Level Example: Payment Service

Imagine an e-commerce application.

The payment service may contain sensitive internal state:

```js
const PaymentService = (function () {

    let transactionCount = 0;

    function validatePayment(amount) {
        return amount > 0;
    }

    function processPayment(amount) {
        if (!validatePayment(amount)) {
            return;
        }

        transactionCount++;

        console.log(`Payment of ₹${amount} processed`);
    }

    function getTransactionCount() {
        return transactionCount;
    }

    return {
        processPayment,
        getTransactionCount
    };

})();
```

The rest of the application can do:

```js
PaymentService.processPayment(500);
PaymentService.getTransactionCount();
```

But it cannot directly manipulate:

```js
transactionCount
```

This is useful because the payment module controls how its internal state changes.

The rest of the application interacts with a **public interface**, rather than modifying the implementation directly.

---

# 10. Another Production Example: Logger

A logging system may maintain internal configuration:

```js
const Logger = (function () {

    let logs = [];

    function log(message) {
        logs.push({
            message,
            time: new Date()
        });

        console.log(message);
    }

    function getLogs() {
        return [...logs];
    }

    return {
        log,
        getLogs
    };

})();
```

Usage:

```js
Logger.log("User logged in");
Logger.log("Payment completed");

console.log(Logger.getLogs());
```

The application can add and retrieve logs through controlled methods, while the internal `logs` array remains private.

---

# 11. Where This Pattern Is Useful

The Module Pattern is useful when you have:

* Internal state that should not be directly modified
* Related functions that operate on the same data
* A need for a clean public interface
* Utility systems with internal implementation details
* Older JavaScript applications that need encapsulation without classes

Typical examples include:

```text
Authentication module
Payment service
Logger
Cache manager
Configuration manager
Shopping cart
Analytics service
State manager
```

---

# 12. Main Advantages

## Encapsulation

Internal implementation details remain hidden.

```text
Outside code
     ↓
Public methods
     ↓
Private state
```

## Data Protection

Sensitive state cannot be directly modified from outside.

## Controlled Access

You decide exactly what the outside world can use.

```js
return {
    publicMethod1,
    publicMethod2
};
```

## Organization

Related functionality is grouped into a single module.

## Reusability

A well-designed module can be reused across different parts of an application.

---

# 13. Important Limitation

The classic Module Pattern is an older JavaScript pattern.

Modern JavaScript provides native modules using:

```js
export
import
```

For example:

```js
// bank.js
let balance = 12000;

export function checkBalance() {
    console.log(balance);
}
```

and:

```js
// app.js
import { checkBalance } from "./bank.js";
```

ES Modules provide module-level scoping and are generally preferred in modern applications.

However, understanding the Module Pattern is still valuable because it teaches important engineering concepts:

```text
Scope
   ↓
Closures
   ↓
Encapsulation
   ↓
Public API design
   ↓
Modular architecture
```

---

# 14. Module Pattern vs Modern ES Modules

| Module Pattern                         | ES Modules                       |
| -------------------------------------- | -------------------------------- |
| Usually uses IIFE                      | Uses `import` / `export`         |
| Relies heavily on closures             | Has native module scope          |
| Classic JavaScript technique           | Modern JavaScript standard       |
| Useful for understanding encapsulation | Preferred in modern applications |
| Manual public API through `return`     | Explicit exports                 |

The underlying engineering idea is similar:

> Hide implementation details and expose only what other parts of the system need.

---

# 15. When to Use It

Use the Module Pattern when you specifically need:

```text
Private state
      +
Controlled public interface
      +
Encapsulation
```

For modern JavaScript projects, native ES Modules are usually the better default.

The classic pattern is particularly valuable for understanding **how encapsulation can be built using JavaScript's functions and closures**, and for working with older codebases that use this style.

---

# 16. Final Mental Model

Remember the pattern like this:

```text
              MODULE
                 |
                IIFE
                 |
       ┌─────────┴─────────┐
       ↓                   ↓
 Private State        Private Methods
       |                   |
       └─────────┬─────────┘
                 ↓
              return
                 ↓
           Public Methods
                 ↓
              Outside
```

For the banking example:

```text
bankBalance = 12000
      ↓
   PRIVATE
      ↓
checkBalance()
setBalance()
withDraw()
      ↓
 selected functions returned
      ↓
    Bank object
      ↓
Public API
```

The core idea of the Module Pattern is:

> **Keep the implementation private and expose only the operations that other parts of the application actually need.**

That is the essence of encapsulation, and it is a principle you'll see repeatedly in production-level software design.
