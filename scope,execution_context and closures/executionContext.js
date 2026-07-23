// execution context ek hypothetical dabba hai - JS function dekhte hi ek dabba banati hai jo dikhta nhi actually me aur function do phases me execute hota hai ek memory phase aur dusra execution phase.

//JS sabse pehle jaise hi aapka function dekhta hai to sabse pehle execution context banata hai, ye ek process hai jo ki do different phases me chalta hai, memory phase and execution phase

// for better understanding - have a look on the notes "Scope,ExecutionContext,Closures" and "diagramforExecutionContext"

/* 
Let's use a **real code example** and trace exactly what JavaScript does behind the scenes.

---

# Code Example

```js
var username = "Shivam";

function greet() {
    var message = "Welcome";

    function showMessage() {
        console.log(username + " : " + message);
    }

    showMessage();
}

greet();
```

Output:

```js
Shivam : Welcome
```

---

# Step 1: Global Execution Context Creation

When JS starts, it creates the **Global Execution Context (GEC)**.

## Memory Creation Phase

```text
Global Memory
────────────────────
username  → undefined
greet     → function
```

---

## Execution Phase

```js
var username = "Shivam";
```

Now memory becomes:

```text
Global Memory
────────────────────
username  → "Shivam"
greet     → function
```

---

# Step 2: greet() is Called

```js
greet();
```

A new **Function Execution Context** is pushed onto the Call Stack.

---

## Call Stack

```text
┌─────────────┐
│   greet()   │
├─────────────┤
│   Global    │
└─────────────┘
```

---

## greet() Memory Creation Phase

```text
greet Memory
────────────────────
message      → undefined
showMessage  → function
```

---

## greet() Execution Phase

```js
var message = "Welcome";
```

Memory becomes:

```text
greet Memory
────────────────────
message      → "Welcome"
showMessage  → function
```

---

# Step 3: showMessage() is Called

```js
showMessage();
```

Another execution context is created.

---

## Call Stack

```text
┌─────────────────┐
│ showMessage()   │
├─────────────────┤
│ greet()         │
├─────────────────┤
│ Global          │
└─────────────────┘
```

---

# Variable Lookup Process

Inside:

```js
console.log(username + " : " + message);
```

JS searches variables like this:

### Looking for `username`

```text
showMessage()
      ↓ Not Found

greet()
      ↓ Not Found

Global
      ↓ Found!
```

Value:

```js
"Shivam"
```

---

### Looking for `message`

```text
showMessage()
      ↓ Not Found

greet()
      ↓ Found!
```

Value:

```js
"Welcome"
```

---

# Visual Diagram

```text
GLOBAL EXECUTION CONTEXT
─────────────────────────────
username → "Shivam"
greet()  → function
          │
          ▼

greet() EXECUTION CONTEXT
─────────────────────────────
message → "Welcome"
showMessage() → function
                │
                ▼

showMessage() EXECUTION CONTEXT
─────────────────────────────
console.log(username + message)

Search Path:
message  → greet()
username → Global
```

---

# Complete Call Stack Flow

### Initial

```text
┌─────────┐
│ Global  │
└─────────┘
```

### greet() Called

```text
┌─────────┐
│ greet() │
├─────────┤
│ Global  │
└─────────┘
```

### showMessage() Called

```text
┌─────────────────┐
│ showMessage()   │
├─────────────────┤
│ greet()         │
├─────────────────┤
│ Global          │
└─────────────────┘
```

### showMessage() Finishes

```text
┌─────────┐
│ greet() │
├─────────┤
│ Global  │
└─────────┘
```

### greet() Finishes

```text
┌─────────┐
│ Global  │
└─────────┘
```

---

# How Closure Fits In

Now slightly modify the code:

```js
function greet() {
    let message = "Welcome";

    return function() {
        console.log(message);
    };
}

const fn = greet();

fn();
```

Normally, when `greet()` finishes:

```text
greet() removed from Call Stack
```

But the inner function still needs:

```js
message
```

So JavaScript preserves that memory.

---

## Closure Diagram

```text
greet()
──────────────────
message = "Welcome"
       ▲
       │
       │ remembered
       │
Inner Function
       │
       ▼
fn()
```

Even after `greet()` is gone from the Call Stack:

```text
Call Stack
──────────────
Global
```

the variable still exists because the returned function references it.

---

# The Interview-Worthy Mental Model

Think of an **Execution Context** as a folder.

```text
Global Folder
│
├── username
├── greet()
│
└── greet Folder
     │
     ├── message
     ├── showMessage()
     │
     └── showMessage Folder
```

Whenever a function runs:

1. JS creates a new folder (Execution Context).
2. Stores local variables inside it.
3. Pushes it onto the Call Stack.
4. Removes it when the function finishes.
5. If an inner function still needs data, JS keeps that data alive using a **Closure**.

That's the complete relationship between **Scope → Execution Context → Call Stack → Closure**. Understanding this flow makes topics like hoisting, lexical environments, event loop, and `this` much easier.

*/