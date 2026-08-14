# Synchronous and Asynchronous Functions in JavaScript

## Overview

JavaScript code can execute in two important ways:

- **Synchronous execution**: code runs one statement at a time and waits for the current task to finish.
- **Asynchronous execution**: JavaScript can start a task and continue executing other code while waiting for that task to finish.

The `script.js` file demonstrates both concepts using simple examples.

## 1. Synchronous Execution

A synchronous task executes from top to bottom.

```javascript
function syncTask() {
    console.log("2. Sync task started");

    for (let i = 1; i <= 3; i++) {
        console.log("Sync step:", i);
    }

    console.log("3. Sync task finished");
}
```

When `syncTask()` is called, JavaScript completes the entire function before moving to the next statement.

```text
Start
  ↓
syncTask()
  ↓
Sync task started
  ↓
Sync step 1
  ↓
Sync step 2
  ↓
Sync step 3
  ↓
Sync task finished
  ↓
Next statement
```

Synchronous code blocks the next line until the current operation finishes.

## 2. Asynchronous Execution

Asynchronous code allows JavaScript to start a task and continue with other work instead of waiting for that task to finish.

In our example:

```javascript
function asyncTask() {
    console.log("5. Async task started");

    setTimeout(() => {
        console.log("7. Async task finished after 2 seconds");
    }, 2000);

    console.log("6. Async function ke baad wala code turant chalega");
}
```

The important part is:

```javascript
setTimeout(() => {
    console.log("7. Async task finished after 2 seconds");
}, 2000);
```

`setTimeout()` schedules the callback to run after approximately 2 seconds.

JavaScript does not stop the entire program for those 2 seconds. It continues executing the next statements.

## 3. Output Order

The output will be approximately:

```text
1. Start
2. Sync task started
Sync step: 1
Sync step: 2
Sync step: 3
3. Sync task finished
4. After sync task
5. Async task started
6. Async function ke baad wala code turant chalega
8. End of script
7. Async task finished after 2 seconds
```

Notice that `8. End of script` appears before `7. Async task finished after 2 seconds`.

This happens because the asynchronous `setTimeout()` task does not block the rest of the JavaScript code.

## 4. Synchronous vs Asynchronous

| Synchronous | Asynchronous |
|---|---|
| Executes sequentially | Allows other code to continue |
| Waits for the current operation | Does not block while waiting |
| Can block execution during long tasks | Useful for operations that take time |
| Execution order is straightforward | Completion order can differ from starting order |
| Example: normal function execution | Example: `setTimeout()`, API requests, event callbacks |

## 5. Simple Real-Life Analogy

### Synchronous

Imagine you are standing at a single counter.

You place an order and wait there until your order is completely prepared.

```text
Order → Wait → Receive → Next task
```

This is similar to synchronous execution.

### Asynchronous

You place an order and receive a token.

While your order is being prepared, you can do something else. When the order is ready, you are notified.

```text
Order → Continue other work
          ↓
       Notification
```

This is similar to asynchronous execution.

## 6. Important Point

Asynchronous JavaScript does not mean that JavaScript executes everything simultaneously.

JavaScript's main execution model is still based around a single call stack.

Asynchronous APIs such as timers, network requests, and event handling allow JavaScript to avoid blocking while waiting for external operations.

When the asynchronous operation is ready, its callback can be executed later.

This behavior is fundamental to JavaScript's event-driven and non-blocking nature.

## 7. When Is Asynchronous Code Useful?

Asynchronous operations are especially useful for:

- API requests
- Fetching data from a server
- Reading files
- Timers
- Database operations
- Waiting for user events

For example:

```javascript
setTimeout(() => {
    console.log("Data received");
}, 2000);

console.log("Continue working...");
```

Output:

```text
Continue working...
Data received
```

The program does not sit idle for two seconds waiting for the timer.

## Key Takeaways

1. **Synchronous code waits for the current operation to finish.**
2. **Asynchronous code allows JavaScript to continue while waiting for certain operations.**
3. `setTimeout()` is a simple example of asynchronous behavior.
4. Asynchronous operations are important for APIs, network requests, timers, and other time-consuming tasks.
5. The order in which asynchronous tasks finish may be different from the order in which they started.
6. Understanding synchronous and asynchronous execution is essential before learning callbacks, Promises, `async/await`, and the event loop.
