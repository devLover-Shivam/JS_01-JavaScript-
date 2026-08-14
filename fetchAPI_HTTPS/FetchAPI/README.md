# Fetch API and Promise Chaining in JavaScript

## Overview

The JavaScript `fetch()` function is used to make network requests, such as requesting data from an API.

An important thing to remember is:

> `fetch()` is Promise-based.

That means `fetch()` immediately returns a **Promise**, and we can use:

```js
.then()
.catch()
```

to handle the result.

The given code makes a request to the Random User API, converts the response into JSON, and then prints the name of each returned user.

---

# 1. The Complete Code

```js
fetch("https://randomuser.me/api/?results=5")
.then((rawData) => {
    return rawData.json();
})
.then((data) => {
    data.results.forEach(function (user) {
        console.log(user.name);
    });
})
.catch((err) => {
    console.log(err);
});
```

The overall flow is:

```text
fetch()
   ↓
Returns a Promise
   ↓
Server responds
   ↓
.rawData.json()
   ↓
Returns another Promise
   ↓
JSON data available
   ↓
Access data.results
   ↓
Loop through users
   ↓
Print user names
```

---

# 2. What Is `fetch()`?

`fetch()` is a built-in JavaScript function used to make HTTP requests.

For example:

```js
fetch("https://example.com");
```

means:

> Send a request to this URL and give me the response when it becomes available.

Because network communication takes time, `fetch()` works asynchronously.

Instead of blocking JavaScript while waiting for the server, `fetch()` returns a Promise.

Conceptually:

```js
let responsePromise = fetch("https://randomuser.me/api/?results=5");
```

So:

```text
fetch()
   ↓
Promise
   ↓
Future server response
```

---

# 3. Understanding the API URL

The URL being requested is:

```text
https://randomuser.me/api/?results=5
```

The API is configured to return 5 random users.

The important part is:

```text
?results=5
```

which requests 5 results.

The exact response structure can be roughly represented as:

```js
{
    results: [
        {
            name: {
                first: "John",
                last: "Doe"
            },
            ...
        },
        ...
    ]
}
```

Our code is interested mainly in:

```js
data.results
```

and then:

```js
user.name
```

---

# 4. Why Do We Use `.then()`?

Since `fetch()` returns a Promise, we can attach a callback using:

```js
.then()
```

For example:

```js
fetch(url)
.then((rawData) => {
    // runs when fetch receives a response
});
```

The function passed to `.then()` executes when the previous Promise is successfully fulfilled.

Therefore:

```text
fetch()
   ↓
Promise
   ↓
.then()
```

---

# 5. First `.then()`

The first part of the code is:

```js
.then((rawData) => {
    return rawData.json();
})
```

The parameter:

```js
rawData
```

contains the response received from the server.

It is a **Response object**, not yet the actual JavaScript object containing the user data.

This distinction is important.

At this point:

```text
Server response
      ↓
Response object
```

We still need to extract the JSON body.

---

# 6. What Does `rawData.json()` Do?

The code uses:

```js
rawData.json();
```

This converts the response body into JavaScript data.

But there is an important detail:

> `response.json()` itself returns a Promise.

Therefore:

```js
return rawData.json();
```

does not immediately return the final object.

It returns another Promise.

So the flow becomes:

```text
fetch()
   ↓
Promise
   ↓
Response object
   ↓
response.json()
   ↓
Another Promise
   ↓
Parsed JavaScript object
```

This is why we need another `.then()`.

---

# 7. Promise Chaining

The code has:

```js
fetch(url)
.then(...)
.then(...)
.catch(...)
```

This is called **Promise chaining**.

Each `.then()` handles the result of the previous Promise.

The chain can be visualized as:

```text
fetch()
  ↓
.then()
  ↓
response.json()
  ↓
.then()
  ↓
data
  ↓
.catch()
```

This allows multiple asynchronous operations to be handled in a readable sequence.

---

# 8. Second `.then()`

The second `.then()` is:

```js
.then((data) => {
    data.results.forEach(function (user) {
        console.log(user.name);
    });
})
```

Here, `data` contains the parsed JSON returned by:

```js
rawData.json()
```

The important structure is:

```js
data.results
```

which contains an array of users.

---

# 9. Understanding `data.results`

Suppose the API returns something like:

```js
{
    results: [
        {
            name: {
                first: "John",
                last: "Smith"
            }
        },
        {
            name: {
                first: "Emma",
                last: "Brown"
            }
        }
    ]
}
```

Then:

```js
data.results
```

is:

```js
[
    {
        name: {
            first: "John",
            last: "Smith"
        }
    },
    {
        name: {
            first: "Emma",
            last: "Brown"
        }
    }
]
```

This is an array, so we can use:

```js
.forEach()
```

to iterate over it.

---

# 10. Understanding `forEach()`

The code uses:

```js
data.results.forEach(function (user) {
    console.log(user.name);
});
```

For every element of the `results` array, the callback function is executed.

The current user is stored inside:

```js
user
```

So conceptually:

```text
results array
     ↓
User 1 → callback(user)
User 2 → callback(user)
User 3 → callback(user)
User 4 → callback(user)
User 5 → callback(user)
```

For each user:

```js
console.log(user.name);
```

prints their name object.

---

# 11. Complete Execution Flow

Let's follow the program from beginning to end.

## Step 1: `fetch()` is called

```js
fetch("https://randomuser.me/api/?results=5")
```

A network request is sent to the API.

`fetch()` immediately returns a Promise.

Initially:

```text
Promise
   ↓
Pending
```

---

## Step 2: The Server Processes the Request

The request travels to the server.

The server generates the requested user data and sends back a response.

During this time, the Promise is still pending.

```text
Pending
   ↓
Waiting for response
```

---

## Step 3: Response Arrives

Once the response arrives, the `fetch()` Promise is fulfilled.

The first `.then()` executes:

```js
.then((rawData) => {
    return rawData.json();
})
```

Now:

```text
rawData
```

contains the Response object.

---

# 12. Step 4: Convert Response to JSON

The code executes:

```js
return rawData.json();
```

The JSON body is parsed.

But `.json()` is asynchronous too, so it returns another Promise.

This Promise eventually becomes fulfilled with the actual JavaScript object.

That returned Promise becomes the input for the next `.then()`.

This is the key idea behind Promise chaining.

---

# 13. Step 5: Second `.then()` Executes

Once:

```js
rawData.json()
```

finishes, the second `.then()` receives the parsed object:

```js
.then((data) => {
```

Now `data` contains the API response.

We access:

```js
data.results
```

which contains the array of users.

---

# 14. Step 6: Iterate Over Users

The code runs:

```js
data.results.forEach(function (user) {
    console.log(user.name);
});
```

If 5 users are returned, the callback runs 5 times.

Conceptually:

```text
User 1 → print name
User 2 → print name
User 3 → print name
User 4 → print name
User 5 → print name
```

---

# 15. Step 7: Error Handling

At the end we have:

```js
.catch((err) => {
    console.log(err);
});
```

`.catch()` handles a rejection anywhere in the Promise chain before it.

For example, an error could happen because:

* The network request fails
* The server is unavailable
* The response cannot be parsed as JSON
* Another Promise in the chain is rejected

Then:

```js
.catch((err) => {
    console.log(err);
});
```

runs.

The general pattern is:

```text
Success
   ↓
then()
   ↓
then()
   ↓
Success

Failure
   ↓
catch()
```

---

# 16. Important Point About `fetch()`

There is a subtle point beginners often miss.

`fetch()` does **not** reject its Promise just because the HTTP response has a status like:

```text
404
500
```

A network-level failure generally causes rejection, but HTTP error responses are still returned as a `Response` object.

Therefore, production code often checks:

```js
if (!rawData.ok) {
    throw new Error(`HTTP error: ${rawData.status}`);
}
```

For example:

```js
fetch("https://randomuser.me/api/?results=5")
.then((rawData) => {
    if (!rawData.ok) {
        throw new Error(`HTTP error: ${rawData.status}`);
    }

    return rawData.json();
})
.then((data) => {
    data.results.forEach((user) => {
        console.log(user.name);
    });
})
.catch((err) => {
    console.log(err);
});
```

This makes HTTP error handling more robust.

---

# 17. Why Do We Need `return rawData.json()`?

This line is extremely important:

```js
return rawData.json();
```

Suppose we wrote:

```js
.then((rawData) => {
    rawData.json();
})
```

The next `.then()` would not receive the parsed JSON because we did not return the Promise.

Correct:

```js
.then((rawData) => {
    return rawData.json();
})
.then((data) => {
    // data is the parsed JSON
});
```

You can think of `return` as passing the result forward in the Promise chain.

```text
First .then()
      ↓
return Promise
      ↓
Next .then()
      ↓
receives resolved value
```

---

# 18. Shorter Arrow Function Version

Because the first callback only returns one expression:

```js
.then((rawData) => {
    return rawData.json();
})
```

can be written as:

```js
.then(rawData => rawData.json())
```

So the code can become:

```js
fetch("https://randomuser.me/api/?results=5")
.then(rawData => rawData.json())
.then(data => {
    data.results.forEach(user => {
        console.log(user.name);
    });
})
.catch(err => {
    console.log(err);
});
```

Both versions follow the same execution flow.

---

# 19. Why Is `fetch()` Promise-Based?

Network requests take an unpredictable amount of time.

For example:

```text
Request
   ↓
Internet
   ↓
Server
   ↓
Database
   ↓
Server
   ↓
Internet
   ↓
Browser
```

This could take:

```text
100 ms
500 ms
2 seconds
5 seconds
```

JavaScript should not freeze while waiting.

Therefore, `fetch()` returns a Promise representing the future result.

```text
fetch()
   ↓
"I'll give you the response when it arrives."
```

This is exactly what Promises are designed for.

---

# 20. Real-Life Applications

`fetch()` is commonly used whenever a web application communicates with a server.

### User Data

```js
fetch("/api/users")
```

Get users from a backend.

### Login

```js
fetch("/api/login", {
    method: "POST"
})
```

Send login information to a server.

### Products

```js
fetch("/api/products")
```

Load products for an e-commerce application.

### Weather

```js
fetch("https://api.example.com/weather")
```

Retrieve weather information from an API.

### Sending Form Data

```js
fetch("/api/register", {
    method: "POST",
    body: JSON.stringify(userData)
})
```

Send registration information to a backend.

---

# 21. Promise Chain Visualization

The given code can be understood as:

```text
fetch(URL)
     |
     ↓
Promise<Response>
     |
     ↓
.then(rawData)
     |
     ↓
rawData.json()
     |
     ↓
Promise<Parsed JSON>
     |
     ↓
.then(data)
     |
     ↓
data.results
     |
     ↓
forEach(user)
     |
     ↓
console.log(user.name)
```

If something goes wrong:

```text
Any rejected Promise
       ↓
    .catch()
       ↓
 console.log(error)
```

---

# 22. Key Concepts

### `fetch()`

Makes an asynchronous network request and returns a Promise.

### `Response`

The object received after the server responds.

### `.json()`

Reads the response body and parses it as JSON.

It also returns a Promise.

### `.then()`

Handles a fulfilled Promise and passes its result to the next step.

### `.catch()`

Handles a rejected Promise in the chain.

### `return`

Passes the result of one `.then()` to the next `.then()`.

### `forEach()`

Iterates over the array of users.

---

# 23. Final Mental Model

Remember the complete pattern:

```text
                fetch()
                   |
                   ↓
              Promise
                   |
                   ↓
          Server Response
                   |
                   ↓
            first .then()
                   |
                   ↓
            response.json()
                   |
                   ↓
              Promise
                   |
                   ↓
           second .then()
                   |
                   ↓
             data.results
                   |
                   ↓
               forEach()
                   |
                   ↓
             user.name
```

And for errors:

```text
Any Promise rejection
        |
        ↓
     .catch()
        |
        ↓
   Handle error
```

The most important thing to understand is that this code is not doing everything at once.

It is building a **sequence of asynchronous operations**:

```text
Fetch data
   ↓
Parse response
   ↓
Work with parsed data
   ↓
Handle errors
```

That sequence is called **Promise chaining**, and `fetch()` is one of the most common real-world examples you'll encounter when working with JavaScript and APIs.
