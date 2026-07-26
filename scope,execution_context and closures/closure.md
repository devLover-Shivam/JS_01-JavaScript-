# JavaScript Closures

> **One of the most important concepts in JavaScript.**
>
> Closures are heavily used in **React, Node.js, Event Listeners, Timers, Promises, Callbacks, Module Pattern, Data Hiding, and Interview Questions.**
>
> If you understand closures well, many advanced JavaScript concepts become much easier.

---

# What is a Closure?

A **closure** is created when:

1. A function is declared inside another function.
2. The inner function **uses variables from the outer function**.
3. The inner function is **returned** (or survives after the outer function finishes).

Because of this, the inner function **remembers** the variables of its parent function **even after the parent function has finished executing.**

### Simple Definition

> **A closure is a function that remembers the variables from its lexical scope even after that scope has finished executing.**

---

# The Three Conditions of a Closure

A closure is formed when:

- ✔ A function exists inside another function.
- ✔ The inner function accesses variables of the outer function.
- ✔ The inner function survives after the outer function ends (usually by returning it).

Example:

```javascript
function outer() {
    let a = 10;

    return function inner() {
        console.log(a);
    };
}

const fn = outer();
fn();
```

Output

```
10
```

---

# Why does this work?

Normally, local variables are destroyed after a function finishes.

Example:

```javascript
function test() {
    let x = 100;
}

test();
```

After `test()` finishes,

```
x ❌ destroyed
```

So how is `a` still available in the previous example?

Because **Closure** comes into play.

---

# What JavaScript Actually Does

When a closure is created,

JavaScript does **NOT immediately destroy** the outer function's variables.

Instead, JavaScript creates an internal hidden reference called

```
[[Environment]]
```

This hidden reference stores access to the outer function's variables.

```
Outer Function
------------------------
a = 10

       ▲
       │
       │
[[Environment]]
       │
       ▼

Returned Function
```

Even though the outer function has finished,

the returned function still has access to

```
a = 10
```

---

# Lexical Scope

Closures work because JavaScript follows **Lexical Scoping**.

Lexical means

> Scope is decided by **where the function is written**, not where it is called.

Example

```javascript
let x = 5;

function outer() {

    let y = 20;

    function inner() {
        console.log(x);
        console.log(y);
    }

    return inner;
}

const fn = outer();
fn();
```

Output

```
5
20
```

Why?

Because `inner()` was **written inside** `outer()`.

So it can access

- Global variables
- Parent variables

---

# Dry Run (Your First Example)

Code

```javascript
function abcd() {

    let a = 12;

    return function () {
        console.log(a);
    };

}

let fnc = abcd();

fnc();
```

---

## Step 1

```
abcd() is called
```

Memory

```
a = 12
```

---

## Step 2

JavaScript creates

```
function(){
    console.log(a);
}
```

This function uses

```
a
```

So JavaScript creates

```
[[Environment]]
```

which stores reference to

```
a
```

---

## Step 3

The inner function is returned.

```
fnc

↓

function(){
    console.log(a);
}
```

---

## Step 4

Normally,

```
abcd()
```

should be destroyed.

But since

```
fnc
```

still needs

```
a
```

JavaScript keeps

```
a = 12
```

alive.

---

## Step 5

Now

```javascript
fnc();
```

prints

```
12
```

---

# Visual Representation

```
abcd()

a = 12

↓

return function

↓

fnc

↓

[[Environment]]

↓

a = 12

↓

console.log(a)

↓

12
```

---

# Example 2 (Private Counter)

Code

```javascript
function countForMe(){

    let c = 0;

    return function(){

        c++;

        console.log(c);

    }

}

let fnc = countForMe();

fnc();
```

---

## Dry Run

### Step 1

```
countForMe()
```

creates

```
c = 0
```

---

### Step 2

Returns

```javascript
function(){

    c++;

    console.log(c);

}
```

Since this function uses

```
c
```

closure is created.

---

### Memory

```
c = 0
```

---

### First Call

```
fnc()
```

```
c++

0 → 1
```

Output

```
1
```

---

### Second Call

```
fnc()
```

```
1 → 2
```

Output

```
2
```

---

### Third Call

```
fnc()
```

```
2 → 3
```

Output

```
3
```

---

## Why doesn't c become 0 every time?

Because

```
countForMe()
```

is called only once.

```
let fnc = countForMe();
```

After that,

we keep calling the **same returned function**, which keeps using the same `c` stored in the closure.

---

# Memory Diagram

```
countForMe()

c = 0

↓

return function

↓

fnc

↓

[[Environment]]

↓

c
```

Every call

```
fnc()

↓

same c

↓

updated
```

---

# Why is this called a Private Variable?

Can we do

```javascript
console.log(c);
```

No.

Output

```
ReferenceError
```

Because

```
c
```

belongs only to

```
countForMe()
```

The only way to access it is

```
fnc();
```

This is called **Data Hiding**.

---

# Example 3 (Click Limiter)

Code

```javascript
function clickLimiter(){

    let click = 0;

    return function(){

        if(click < 5){

            click++;

            console.log(`clicked: ${click} times`);

        }
        else{

            console.log("Limit Exceeded");

        }

    }

}

let abc = clickLimiter();

abc();
abc();
abc();
abc();
abc();
abc();
```

---

# Dry Run

Initially

```
click = 0
```

---

## First Call

```
0 < 5

Yes

click++

0 → 1
```

Output

```
clicked: 1 times
```

---

## Second Call

```
1 → 2
```

Output

```
clicked: 2 times
```

---

## Third Call

```
2 → 3
```

Output

```
clicked: 3 times
```

---

## Fourth Call

```
3 → 4
```

Output

```
clicked: 4 times
```

---

## Fifth Call

```
4 → 5
```

Output

```
clicked: 5 times
```

---

## Sixth Call

Condition

```
5 < 5

False
```

Output

```
Limit Exceeded, Try after some time
```

---

# Dry Run Table

| Call | click Before | Condition | click After | Output |
|-------|-------------:|-----------|------------:|--------|
| 1 | 0 | 0 < 5 | 1 | clicked: 1 times |
| 2 | 1 | 1 < 5 | 2 | clicked: 2 times |
| 3 | 2 | 2 < 5 | 3 | clicked: 3 times |
| 4 | 3 | 3 < 5 | 4 | clicked: 4 times |
| 5 | 4 | 4 < 5 | 5 | clicked: 5 times |
| 6 | 5 | False | 5 | Limit Exceeded |

---

# Why didn't click become 0 again?

Because

```
clickLimiter()
```

ran only once.

```
let abc = clickLimiter();
```

Every call

```
abc()
```

uses the **same variable**.

---

# Memory Diagram

```
clickLimiter()

click = 0

↓

return function

↓

abc

↓

[[Environment]]

↓

click
```

Each click

```
abc()

↓

click++

↓

same variable updated
```

---

# Advantages of Closures

## 1. Data Hiding

Variables become private.

Example

```javascript
let counter = countForMe();
```

Nobody can directly modify

```
c
```

---

## 2. Encapsulation

We expose only what is necessary.

Users cannot directly access internal data.

Only allowed operations are exposed.

Example

```
Increment

✓ Allowed

Reset Variable

❌ Not Allowed
```

---

## 3. Avoid Global Variables

Without closure

```javascript
let count = 0;
```

Anyone can change

```javascript
count = 1000;
```

With closure

```
Impossible
```

because

```
count
```

is hidden.

---

## 4. Maintain State

Closures remember previous values.

Examples

- Counters
- Shopping Cart
- Like Button
- Click Counter
- Timer
- Login Attempts

---

## 5. Function Factories

Closures allow creating customized functions.

Example

```javascript
function multiply(x){

    return function(y){

        return x * y;

    }

}

const double = multiply(2);

const triple = multiply(3);

console.log(double(5));
console.log(triple(5));
```

Output

```
10
15
```

---

# Real-Life Analogy

Imagine a bank locker.

```
Bank Locker

↓

Money

↓

Only Owner Has Key
```

The locker exists even after you leave the bank.

Only the key holder can access it.

Similarly,

```
Outer Function

↓

Variables

↓

Returned Function

↓

Only returned function can access them
```

The variables remain alive because the returned function still has the "key" (its `[[Environment]]`).

---

# Interview Definition

> A **closure** is a function that remembers and can access variables from its outer lexical scope even after the outer function has finished execution. This is possible because JavaScript internally maintains a hidden `[[Environment]]` reference to the variables that the inner function uses.

