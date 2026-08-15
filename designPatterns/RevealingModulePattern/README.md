# Revealing Module Pattern in JavaScript

## Overview

The **Revealing Module Pattern** is a variation of the classic **Module Pattern**.

It uses the same core idea:

```text
IIFE
  ↓
Private variables + private functions
  ↓
Return selected functions
  ↓
Public API
```

The main difference is **how the public API is exposed**.

In the classic Module Pattern, we generally return the functions using their original names:

```js
return {
    checkBalance,
    setBalance,
    withDraw
};
```

In the Revealing Module Pattern, we explicitly map private functions to **public names**:

```js
return {
    check: checkBalance,
    set: setBalance,
    draw: withDraw
};
```

This makes the module's public interface more explicit and allows the internal implementation names to remain independent from the names exposed to the rest of the application.

---

# 1. The Given Code

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
        check: checkBalance,
        set: setBalance,
        draw: withDraw,
    };

})();
```

The module creates three internal functions:

```js
checkBalance
setBalance
withDraw
```

But these are not the names exposed publicly.

Instead, the outside world gets:

```js
Bank.check
Bank.set
Bank.draw
```

---

# 2. Why Is It Called "Revealing"?

The pattern is called **Revealing Module Pattern** because the return object explicitly reveals which private functions should become part of the public interface.

Inside the module:

```text
Private implementation
        |
        ├── checkBalance
        ├── setBalance
        └── withDraw
```

Then we deliberately reveal:

```text
Public API
    |
    ├── check
    ├── set
    └── draw
```

The return statement acts almost like a boundary:

```js
return {
    check: checkBalance,
    set: setBalance,
    draw: withDraw
};
```

---

# 3. The Most Important Difference

Compare the two patterns.

### Classic Module Pattern

```js
return {
    checkBalance,
    setBalance,
    withDraw
};
```

Outside:

```js
Bank.checkBalance();
Bank.setBalance(10000);
Bank.withDraw(2000);
```

### Revealing Module Pattern

```js
return {
    check: checkBalance,
    set: setBalance,
    draw: withDraw
};
```

Outside:

```js
Bank.check();
Bank.set(10000);
Bank.draw(2000);
```

The private function names stay:

```text
checkBalance
setBalance
withDraw
```

while the public API uses:

```text
check
set
draw
```

---

# 4. Why Do We Need Different Names?

This is the most important question.

Changing the names is **not technically required** for the pattern to work.

This:

```js
return {
    check: checkBalance
};
```

and this:

```js
return {
    checkBalance: checkBalance
};
```

both expose the same function.

The reason for changing the name is **API design**.

The internal name describes the implementation.

The public name describes how other parts of the application should interact with the module.

That distinction becomes valuable in production systems.

---

# 5. Internal Name vs Public Name

Consider:

```js
function checkBalance() {
    console.log(bankBalance);
}
```

This is an implementation-level name.

The outside application may not care that the underlying function is called `checkBalance`.

It only needs an operation called:

```js
Bank.check();
```

So we create a boundary:

```text
Inside Module                     Outside Module

checkBalance()   ─────────────→   Bank.check()
      ↑                                  ↑
Implementation                      Public API
```

This creates a separation between:

```text
How something works
        vs
What the outside world can ask it to do
```

That separation is a major software engineering principle.

---

# 6. Why Is This Useful in Production?

Imagine you have:

```js
function fetchUserFromDatabase() {
    // complicated database logic
}
```

You might expose it as:

```js
return {
    getUser: fetchUserFromDatabase
};
```

The application uses:

```js
UserService.getUser();
```

Later, you change the implementation:

```js
function fetchUserFromCacheOrDatabase() {
    // new implementation
}
```

You can still expose:

```js
return {
    getUser: fetchUserFromCacheOrDatabase
};
```

The rest of the application does not need to change:

```js
UserService.getUser();
```

This is one of the major benefits of separating the **public contract** from the **private implementation**.

---

# 7. What Happens in Your Banking Example?

Let's trace the code.

The IIFE executes immediately:

```js
let Bank = (function(){
```

A private variable is created:

```js
let bankBalance = 12000;
```

Then three private functions are created:

```js
checkBalance
setBalance
withDraw
```

Finally:

```js
return {
    check: checkBalance,
    set: setBalance,
    draw: withDraw
};
```

returns an object.

That object gets stored in:

```js
Bank
```

So conceptually:

```text
Bank
 |
 ├── check → checkBalance()
 ├── set   → setBalance()
 └── draw  → withDraw()
```

The outside code does not see the private names directly.

---

# 8. Understanding the Function Mapping

This line:

```js
check: checkBalance
```

means:

```text
public name → private function
```

So:

```js
Bank.check
```

points to:

```js
checkBalance
```

Similarly:

```js
set: setBalance
```

means:

```js
Bank.set
```

points to:

```js
setBalance
```

And:

```js
draw: withDraw
```

means:

```js
Bank.draw
```

points to:

```js
withDraw
```

A useful way to visualize it:

```text
                  PRIVATE
                     |
       ┌─────────────┼─────────────┐
       ↓             ↓             ↓
checkBalance    setBalance     withDraw
       |             |             |
       ↓             ↓             ↓
      check          set           draw
       └─────────────┼─────────────┘
                     ↓
                  PUBLIC
```

---

# 9. Is Renaming Mandatory?

No.

This is important.

The following is perfectly valid:

```js
return {
    checkBalance,
    setBalance,
    withDraw
};
```

The function names do **not** have to change.

The Revealing Module Pattern is primarily about **explicitly deciding which internal functions are exposed publicly**.

Renaming is an additional benefit because it lets you create a clean public API.

So don't memorize:

> Revealing Module Pattern = rename every function.

Instead remember:

> Revealing Module Pattern = define the public API by explicitly mapping private functions to public properties.

---

# 10. Why Not Just Expose Everything?

Suppose we did:

```js
return {
    checkBalance,
    setBalance,
    withDraw
};
```

That's not necessarily bad.

But imagine a much larger module:

```js
function validateUser() {}
function connectDatabase() {}
function encryptPassword() {}
function generateToken() {}
function logActivity() {}
function createSession() {}
function deleteUser() {}
function getUser() {}

return {
    validateUser,
    connectDatabase,
    encryptPassword,
    generateToken,
    logActivity,
    createSession,
    deleteUser,
    getUser
};
```

Now the public API exposes everything.

The outside code can call every returned function.

With a carefully designed public API:

```js
return {
    login: loginUser,
    logout: logoutUser
};
```

the module can keep its implementation details hidden.

That makes the interface smaller and easier to understand.

---

# 11. Production-Level Example: Authentication Service

Suppose a production application has a complex authentication system:

```js
const AuthService = (function () {

    let currentUser = null;

    function validateCredentials(username, password) {
        // Internal validation logic
    }

    function generateToken(user) {
        // Internal token generation
    }

    function loginUser(username, password) {
        // Internal login workflow
    }

    function logoutUser() {
        // Internal logout workflow
    }

    return {
        login: loginUser,
        logout: logoutUser
    };

})();
```

The rest of the application uses:

```js
AuthService.login("shivam", "password");
AuthService.logout();
```

It does not need to know whether authentication internally uses:

```text
Database
Redis
JWT
OAuth
Session cookies
Cache
```

The public API remains:

```text
login()
logout()
```

The implementation can change without forcing the entire application to change.

That is a very real production concern.

---

# 12. Production-Level Example: Payment Service

Consider a payment system that may support:

```text
Stripe
Razorpay
PayPal
```

Internally:

```js
function processUsingStripe(amount) {}
function validatePayment(amount) {}
function createTransaction(amount) {}
function updateOrderStatus() {}
```

But you could expose:

```js
return {
    pay: processPayment
};
```

Then the rest of the application simply does:

```js
PaymentService.pay(500);
```

The payment implementation can change internally without changing every caller.

This is a clean **public contract**.

---

# 13. The Engineering Principle Behind It

The bigger concept here is:

## Encapsulation

Hide implementation details and expose only what consumers need.

And closely related to it:

## Abstraction

Expose **what the module does**, rather than forcing users to understand **how it does it**.

For example:

```js
Bank.draw(2000);
```

The caller doesn't need to know:

```text
How balance is stored
How validation happens
How subtraction happens
How transaction rules are implemented
```

The caller only knows:

```text
draw(amount)
```

That is a much cleaner interface.

---

# 14. Public API as a Contract

The returned object can be treated as a contract between the module and the rest of the application.

For example:

```js
return {
    check: checkBalance,
    set: setBalance,
    draw: withDraw
};
```

The contract is:

```text
Bank.check()
Bank.set()
Bank.draw()
```

Everything else is implementation detail.

This becomes extremely useful in large applications because different teams can work against a stable API while internal code evolves.

---

# 15. Current Example in One Flow

Your code can be summarized as:

```text
IIFE
  ↓
Create private bankBalance
  ↓
Create private functions
  ↓
Explicitly expose selected functions
  ↓
Rename public API
  ↓
Store returned object in Bank
```

Therefore:

```js
Bank.check();
```

calls:

```js
checkBalance();
```

and:

```js
Bank.set(15000);
```

calls:

```js
setBalance(15000);
```

and:

```js
Bank.draw(2000);
```

calls:

```js
withDraw(2000);
```

The outside world knows the public API, not the internal implementation.

---

# 16. Module Pattern vs Revealing Module Pattern

| Module Pattern                           | Revealing Module Pattern                               |
| ---------------------------------------- | ------------------------------------------------------ |
| Returns selected functions               | Explicitly maps private functions to public properties |
| Public names often match private names   | Public names can differ from private names             |
| Example: `checkBalance` → `checkBalance` | Example: `check` → `checkBalance`                      |
| Encapsulation                            | Encapsulation + explicit public API                    |
| Simpler syntax                           | More deliberate API design                             |

The fundamental goal remains the same:

```text
Private implementation
        ↓
Controlled public interface
```

---

# 17. When Should You Use This Pattern?

The Revealing Module Pattern makes sense when you want:

```text
Private state
      +
Private implementation
      +
Small public API
      +
Clear separation between implementation and interface
```

It can be useful in legacy JavaScript applications, browser-side modules, or codebases that use IIFEs and closures heavily.

For modern JavaScript applications, **ES Modules (`import` / `export`) are generally preferred** for module organization. However, the Revealing Module Pattern remains valuable for understanding encapsulation, closures, and API design.

---

# 18. Final Mental Model

Remember this:

```text
             IIFE
              |
      ┌───────┴───────┐
      ↓               ↓
 Private Code     Private State
      |
      ↓
 Select functions
      |
      ↓
 Map public names
      |
      ↓
 ┌─────────────────────┐
 │ Public API           │
 │                      │
 │ check → checkBalance │
 │ set   → setBalance   │
 │ draw  → withDraw     │
 └─────────────────────┘
              |
              ↓
          Outside Code
```

The most important point is:

> **The name change is not required for the pattern to work. It is useful because the public API can have clean, stable names while the internal function names and implementation remain free to change.**

That is the real engineering value: **the caller depends on the interface, not the implementation.**
