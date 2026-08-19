# Code Splitting in JavaScript

## 1. What is Code Splitting?

Suppose our JavaScript application has a very large file containing 2000 lines of code.

If we load the entire file when the page opens:

```text
Page loads
    ↓
2000 lines of JavaScript downloaded
    ↓
Browser processes everything
    ↓
Page becomes heavier
```

But what if some functionality is only needed when the user performs a particular action?

For example, suppose a heavy feature is only required when the user clicks a button.

Instead of loading the entire code immediately, we can **split the code into smaller modules and load a module only when it is needed**.

This technique is called **Code Splitting**.

> Code Splitting = Breaking a large JavaScript application into smaller pieces and loading those pieces when required.

---

# 2. Why Do We Need Code Splitting?

Imagine an application has:

```text
2000 lines of JavaScript
```

But the user initially needs only:

```text
200 lines
```

Loading all 2000 lines immediately is unnecessary.

Instead:

```text
Initial page load
       ↓
Load required JavaScript
       ↓
User clicks a feature
       ↓
Load that feature's JavaScript
```

This can help reduce the amount of JavaScript that needs to be loaded initially.

---

# 3. Our Example

We have three files:

```text
project/
│
├── index.html
├── script.js
└── heavy.js
```

The heavy functionality is placed separately inside:

```text
heavy.js
```

---

# 4. `heavy.js`

```js
export function veryHeavy(){

    console.log("Giant Feature Loaded...");

    alert("Heavy File Loading Completed...");
}
```

The function is exported:

```js
export function veryHeavy()
```

so that another JavaScript module can use it.

The important point is that this code is **not loaded by `script.js` initially**.

It will be loaded when we explicitly import it.

---

# 5. Dynamic Import

Inside `script.js`:

```js
const btn = document.querySelector("button");

btn.addEventListener("click", async function () {

    let heavyFunction = await import("./heavy.js");

    heavyFunction.veryHeavy();

});
```

The important line is:

```js
let heavyFunction = await import("./heavy.js");
```

This is called a **dynamic import**.

Unlike a normal static import, the module is imported **when this line executes**.

In our example, this line is inside the click handler.

Therefore:

```text
Page loads
    ↓
script.js loads
    ↓
heavy.js is NOT loaded yet
    ↓
User clicks button
    ↓
import("./heavy.js")
    ↓
heavy.js loads
    ↓
veryHeavy() executes
```

That's code splitting in action.

---

# 6. Why `async` and `await`?

Dynamic imports are asynchronous because the browser may need to fetch the module.

Therefore:

```js
btn.addEventListener("click", async function () {
```

allows us to use:

```js
await import("./heavy.js");
```

`await` means:

> "Module load hone ka wait karo, phir next line execute karo."

So:

```js
let heavyFunction = await import("./heavy.js");
```

means:

```text
Load heavy.js
     ↓
Wait until it is available
     ↓
Store the imported module
     ↓
Continue execution
```

---

# 7. Why `heavyFunction.veryHeavy()`?

This line:

```js
heavyFunction.veryHeavy();
```

calls the function exported from `heavy.js`.

Remember:

```js
export function veryHeavy(){
    ...
}
```

The imported module is stored inside:

```js
heavyFunction
```

So:

```text
heavyFunction
      ↓
   veryHeavy
      ↓
   function()
```

Then:

```js
heavyFunction.veryHeavy();
```

executes it.

---

# 8. What Happens When the Page Loads?

Our HTML contains:

```html
<script type="module" src="script.js"></script>
```

So the browser loads:

```text
index.html
    ↓
script.js
```

But `script.js` doesn't immediately execute:

```js
import("./heavy.js")
```

because that line is inside the button's click handler.

Therefore `heavy.js` is loaded only when the user clicks the button.

---

# 9. Complete Execution Flow

```text
             Page Load
                 ↓
             script.js
                 ↓
          Button listener
                 ↓
          User clicks button
                 ↓
       import("./heavy.js")
                 ↓
          heavy.js loads
                 ↓
      veryHeavy() becomes available
                 ↓
       heavyFunction.veryHeavy()
                 ↓
          Feature executes
```

---

# 10. Real-Life Example

Imagine an application with different features:

```text
Main application
├── Dashboard
├── Analytics
├── Payment
├── Video Editor
└── Admin Panel
```

A normal user opening the dashboard doesn't necessarily need the video editor code immediately.

Instead of loading everything:

```text
Dashboard + Analytics + Payment + Video Editor + Admin
```

we can load:

```text
Dashboard
```

initially.

Then:

```text
User opens Video Editor
        ↓
Load video-editor.js
        ↓
Run video editor
```

This is the same idea as our `heavy.js` example.

---

# 11. Static Import vs Dynamic Import

### Static Import

```js
import { veryHeavy } from "./heavy.js";
```

The module is imported as part of the module's initial loading process.

### Dynamic Import

```js
const module = await import("./heavy.js");
```

The module is loaded when the code reaches that statement.

For code splitting, dynamic imports are especially useful because they allow us to **load functionality on demand**.

---

# 12. Important Takeaway

Code splitting is basically:

```text
Large JavaScript
       ↓
Split into smaller modules
       ↓
Load only what is needed
       ↓
Load additional modules on demand
```

In our example:

```js
await import("./heavy.js");
```

is the key.

The user doesn't need the heavy feature immediately, so we don't load it immediately.

We wait until:

```text
Button clicked
```

and then load it.

> **Code Splitting = Don't make the browser carry the whole suitcase when it only needs one shirt.**
