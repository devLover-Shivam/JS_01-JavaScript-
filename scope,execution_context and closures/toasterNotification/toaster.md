# Toast Notification Project using JavaScript Closures

> A simple project that demonstrates one of the most powerful concepts in JavaScript: **Closures**.
>
> In this project, we create a reusable **toast notification system** where configuration values (theme, duration, etc.) are stored privately using closures.

---

# Project Overview

A **toast notification** is a small message that appears on the screen for a short period of time to inform the user about an action.

Examples:

- ✅ Download Completed
- ✅ File Uploaded Successfully
- ❌ Login Failed
- ⚠ Password is Weak

Instead of writing the same code every time we want to display a notification, we create a reusable **Toaster**.

---

# Source Code

```javascript
function createToaster(config) {

    return function (message) {

        // Create a new toast element
        const div = document.createElement("div");

        // Set the message
        div.textContent = message;

        // Apply theme-based styling
        div.className = `inline-block px-6 py-3 rounded shadow-lg pointer-events-none ${
            config.theme === "dark"
                ? "bg-gray-800 text-white"
                : "bg-gray-200 text-black"
        }`;

        // Find the parent container
        const parent = document.querySelector(".parent");

        // Add the toast to the page
        parent.appendChild(div);

        // Remove the toast after the specified duration
        setTimeout(() => {
            parent.removeChild(div);
        }, config.duration * 1000);
    };
}

// Create a toaster instance
const toaster = createToaster({
    positionX: "right",
    positionY: "top",
    theme: "dark",
    duration: 3,
});

// Display the first notification
toaster("Download Done");

// Display another notification after 2 seconds
setTimeout(() => {
    toaster("Shivam Accepted Your Request");
}, 2000);
```

---

# What is a Closure?

A **closure** is a function that remembers the variables of its outer (parent) function even after the parent function has finished executing.

### Simple Definition

> A closure is a function bundled together with its surrounding (lexical) environment.

---

# Why is this Project a Closure?

Let's look at the important part.

```javascript
function createToaster(config) {

    return function(message){

    };

}
```

Notice that

- There is an outer function.
- There is an inner function.
- The inner function is returned.
- The inner function uses the variable `config`.

Since the returned function uses `config`, JavaScript creates a **closure**.

---

# How JavaScript Sees It

```
createToaster()

↓

config

↓

return function

↓

Closure Created

↓

Returned Function remembers config forever
```

Even after

```
createToaster()
```

finishes,

the returned function still has access to

```
config
```

This is the power of closures.

---

# Understanding the Flow

## Step 1

We call

```javascript
const toaster = createToaster({
    theme: "dark",
    duration: 3
});
```

Now

```
config = {

theme: "dark",

duration: 3

}
```

exists inside

```
createToaster()
```

---

## Step 2

The function returns

```javascript
function(message){

}
```

Normally,

`createToaster()` should finish and all of its variables should disappear.

But since the returned function uses

```
config
```

JavaScript keeps it alive.

---

## Step 3

Now

```javascript
toaster("Download Done");
```

is executed.

Although

```
createToaster()
```

has already finished,

the function still knows

```
config.theme

config.duration
```

because of the closure.

---

# Memory Diagram

```
createToaster()

config

↓

return function(message)

↓

Closure

↓

[[Environment]]

↓

config
```

Whenever

```
toaster()
```

is called,

it can still access

```
config
```

---

# Dry Run

## First Function Call

```javascript
const toaster = createToaster({
    theme: "dark",
    duration: 3
});
```

Memory

```
config

↓

theme = dark

duration = 3
```

Returned function

```
function(message){

}
```

Closure stores

```
config
```

---

## First Notification

```javascript
toaster("Download Done");
```

Parameter

```
message

↓

"Download Done"
```

Steps

1. Create a `<div>`
2. Set text
3. Apply theme
4. Append to parent
5. Wait 3 seconds
6. Remove the notification

---

## Second Notification

After

```javascript
setTimeout(...,2000)
```

JavaScript waits

```
2 seconds
```

Then

```javascript
toaster("Shivam Accepted Your Request");
```

runs.

Again,

the same

```
config
```

is used.

No new configuration object is created.

---

# Understanding Every Line

## Function Declaration

```javascript
function createToaster(config)
```

Creates a factory function that generates toaster functions.

---

## Returning a Function

```javascript
return function(message)
```

Returns another function.

This returned function becomes a closure.

---

## Creating the Notification

```javascript
const div = document.createElement("div");
```

Creates a new HTML element dynamically.

Example

```
<div></div>
```

---

## Setting the Message

```javascript
div.textContent = message;
```

Adds text inside the div.

Example

```
Download Done
```

---

## Theme Selection

```javascript
config.theme === "dark"
```

Checks whether the selected theme is dark.

If true

```
bg-gray-800

text-white
```

Otherwise

```
bg-gray-200

text-black
```

This is done using the **ternary operator**.

```javascript
condition ? value1 : value2
```

---

## Finding Parent

```javascript
document.querySelector(".parent");
```

Finds the container where notifications will be inserted.

Example

```html
<div class="parent"></div>
```

---

## Adding the Notification

```javascript
parent.appendChild(div);
```

The new notification becomes visible.

Before

```
Parent

(empty)
```

After

```
Parent

↓

Download Done
```

---

## Removing Notification

```javascript
setTimeout(() => {

    parent.removeChild(div);

}, config.duration * 1000);
```

Waits for

```
duration × 1000
```

milliseconds.

Then removes the notification.

---

# Why Multiply by 1000?

`setTimeout()` expects time in **milliseconds**.

```
1 second

=

1000 milliseconds
```

So

```javascript
3 * 1000
```

means

```
3000 ms

=

3 seconds
```

---

# Why Store Configuration in a Closure?

Imagine we don't use closures.

Every time we display a toast,

we would need

```javascript
showToast(
    message,
    theme,
    duration
);
```

again and again.

With closures,

we configure it only once.

```javascript
const toaster = createToaster({

theme:"dark",

duration:3

});
```

After that,

only

```javascript
toaster("Hello");
```

is needed.

This makes the code cleaner and easier to reuse.

---

# Real-Life Analogy

Imagine buying a coffee machine.

While buying,

you configure

- Coffee Strength
- Sugar
- Temperature

Once configured,

every time you press the button,

it remembers those settings.

```
Configure Once

↓

Machine Remembers

↓

Press Button

↓

Coffee Ready
```

Similarly,

```
createToaster()

↓

Stores Config

↓

Returns Function

↓

Function Remembers Config

↓

Show Notification
```

---

# Advantages of Using Closures Here

## 1. Reusability

One configuration can be reused multiple times.

```javascript
toaster("Download Complete");

toaster("File Uploaded");

toaster("Login Successful");
```

---

## 2. Data Hiding

The `config` object is private.

Outside the closure,

you cannot directly access it.

---

## 3. Cleaner Code

Instead of passing

```
theme

duration
```

every time,

you configure them once.

---

## 4. Encapsulation

The notification logic and its configuration stay together.

Other parts of the program only need to call

```javascript
toaster(message);
```

---

## 5. Better Maintainability

If the theme or duration changes,

only one place needs updating.

---

# Time Complexity

| Operation | Time Complexity |
|-----------|-----------------|
| Create `<div>` | O(1) |
| Set text | O(1) |
| Apply classes | O(1) |
| Query parent | O(1) |
| Append child | O(1) |
| Remove child | O(1) |

Overall complexity for displaying one toast:

```
O(1)
```


