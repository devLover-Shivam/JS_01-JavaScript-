# Avoiding Unnecessary Reflows and Repaints in the DOM

When we make changes to the DOM, the browser may need to recalculate the page layout and redraw parts of the screen.

Two important concepts are:

* **Reflow:** Browser recalculates the layout and position of elements.
* **Repaint:** Browser redraws the visual appearance of elements.

If we repeatedly modify the DOM, these operations can happen many times and affect performance.

---

## 1. The Problem

Suppose we want to add 100 list items.

If we directly add every item to the DOM:

```js
for(let i = 0; i < 100; i++){
    let li = document.createElement("li");
    li.textContent = `Item ${i}`;

    document.querySelector("ul").appendChild(li);
}
```

The DOM is modified repeatedly:

```text
Create element
     ↓
Add to DOM
     ↓
Browser may recalculate layout
     ↓
Create element
     ↓
Add to DOM
     ↓
Browser may recalculate layout
     ↓
...
```

For a small number of elements this may not matter much, but with large DOM updates, unnecessary rendering work can become expensive.

---

# 2. `DocumentFragment`

`DocumentFragment` gives us a temporary space where we can build DOM elements **outside the actual document**.

We create it using:

```js
const fragment = document.createDocumentFragment();
```

Think of it as a temporary container:

```text
Actual DOM
     ↑
     │
   Fragment
     │
 ┌───┼───┐
 │   │   │
li  li  li
```

We can create and append all our elements to the fragment first.

Only after everything is ready do we add the fragment to the actual DOM.

---

# 3. Using `DocumentFragment`

```js
const fragment = document.createDocumentFragment();

for(let i = 0; i < 100; i++){

    let li = document.createElement("li");
    li.textContent = `Item ${i}`;

    fragment.appendChild(li);
}

document.querySelector("ul").appendChild(fragment);
```

The flow becomes:

```text
Create elements
      ↓
Add them to DocumentFragment
      ↓
No actual DOM update for every element
      ↓
All elements are ready
      ↓
Append fragment to DOM
```

This reduces the number of direct DOM insertions.

---

# 4. Why is this Better?

Instead of repeatedly modifying the live DOM:

```text
DOM ← Item 1
DOM ← Item 2
DOM ← Item 3
DOM ← Item 4
...
```

we prepare everything separately:

```text
DocumentFragment
      ↓
Item 1
Item 2
Item 3
Item 4
...
      ↓
One insertion into DOM
```

This is especially useful when adding or updating **many DOM elements at once**.

---

## 5. Important Point

`DocumentFragment` does **not** magically guarantee that the browser performs exactly one reflow and one repaint.

The real benefit is that we avoid repeatedly inserting elements into the **live DOM** while constructing them.

So the mental model should be:

> **Prepare DOM changes separately, then apply them to the real DOM in a batch.**

```text
Build → Fragment → Insert once → Browser renders
```

This is a simple and useful DOM performance optimization.
