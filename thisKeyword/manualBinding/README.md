
# 📌 JavaScript `call()`, `apply()` & `bind()`

## Basic Idea

JavaScript mein **`this` ki value fixed nahi hoti**.

Hum function ko call karte waqt manually decide kar sakte hain ki:

> **"Is function ke andar `this` kis object ko point karega?"**

Is kaam ke liye JavaScript hume 3 important methods deta hai:

```text
call()
apply()
bind()
```

### One-line summary

| Method    | Function execute?  | Arguments kaise pass hote hain? |
| --------- | ------------------ | ------------------------------- |
| `call()`  | Immediately        | Individually                    |
| `apply()` | Immediately        | Array ke andar                  |
| `bind()`  | ❌ Immediately nahi | Individually / partially        |

---

# 1 `call()`

`call()` ka use karke hum:

1. Function ko **immediately execute** kar sakte hain.
2. Function ke andar `this` ki value set kar sakte hain.
3. Arguments ko **individually** pass kar sakte hain.

### Example

```javascript
let obj = {
    name: "shivam"
};

function abcd(a, b, c) {
    console.log(this, a, b, c);
}

abcd();
```

Normal function call mein:

```javascript
abcd();
```

`this` ki value environment ke according decide hogi.

Ab agar hum chahte hain ki `abcd()` ke andar:

```javascript
this === obj
```

ho, toh:

```javascript
abcd.call(obj, 1, 2, 3);
```

### Output conceptually

```javascript
{
    name: "shivam"
} 1 2 3
```

Yaani:

```javascript
abcd.call(obj, 1, 2, 3);
          ↑
          this
```

### Important

```javascript
abcd.call(obj, 1, 2, 3);
```

ka matlab:

> "`abcd` function ko abhi call karo aur uske andar `this` ko `obj` bana do."

---

# 2 `apply()`

`apply()` bhi almost `call()` ki tarah hi kaam karta hai.

Difference sirf **arguments pass karne ke tareeke** mein hai.

### `call()`

Arguments individually:

```javascript
abcd.call(obj, 1, 2, 3);
```

### `apply()`

Arguments ek **array** ke andar:

```javascript
abcd.apply(obj, [4, 5, 6]);
```

Yahaan:

```javascript
obj
```

→ `this` ki value

aur:

```javascript
[4, 5, 6]
```

→ function ke arguments

### Example

```javascript
let obj = {
    name: "shivam"
};

function abcd(a, b, c) {
    console.log(this, a, b, c);
}

abcd.apply(obj, [4, 5, 6]);
```

Conceptually:

```text
this → obj
a    → 4
b    → 5
c    → 6
```

---

# `call()` vs `apply()`

The easiest way to remember:

```text
CALL  → comma separated arguments
APPLY → arguments in an Array
```

### Example

```javascript
abcd.call(obj, 1, 2, 3);
```

vs.

```javascript
abcd.apply(obj, [1, 2, 3]);
```

Both effectively do:

```text
this = obj

a = 1
b = 2
c = 3
```

The major difference is only **how arguments are supplied**.

---

# 3 `bind()`

`bind()` thoda different hai.

`call()` aur `apply()` function ko **immediately execute** kar dete hain.

Lekin:

> `bind()` function ko immediately execute nahi karta.

Instead, `bind()` ek **new function return karta hai** jisme `this` ki value already set hoti hai.

### Example

```javascript
let fnc = abcd.bind(obj, 1, 2, 3);
```

Yahaan `abcd()` execute nahi hua.

Instead:

```javascript
fnc
```

ke andar ek new function store ho gaya.

Conceptually:

```text
fnc = abcd + this=obj + arguments=1,2,3
```

Ab jab hum:

```javascript
fnc();
```

likhenge, tab function execute hoga.

---

# Complete Example

```javascript
let obj = {
    name: "shivam"
};

function abcd(a, b, c) {
    console.log(this, a, b, c);
}

// Normal function call
abcd();


// call()
abcd.call(obj, 1, 2, 3);


// apply()
abcd.apply(obj, [4, 5, 6]);


// bind()
let fnc = abcd.bind(obj, 1, 2, 3);

// Function executes HERE
fnc();
```

---

# Execution Flow

## `call()`

```javascript
abcd.call(obj, 1, 2, 3);
```

Flow:

```text
abcd()
  ↓
this = obj
  ↓
a = 1
b = 2
c = 3
  ↓
EXECUTE IMMEDIATELY
```

---

## `apply()`

```javascript
abcd.apply(obj, [4, 5, 6]);
```

Flow:

```text
abcd()
  ↓
this = obj
  ↓
[4, 5, 6]
  ↓
a = 4
b = 5
c = 6
  ↓
EXECUTE IMMEDIATELY
```

---

## `bind()`

```javascript
let fnc = abcd.bind(obj, 1, 2, 3);
```

Flow:

```text
abcd()
  ↓
this = obj
  ↓
arguments = 1,2,3
  ↓
NEW FUNCTION CREATED
  ↓
fnc
```

Then:

```javascript
fnc();
```

executes it.

---

# The Most Important Difference

```javascript
abcd.call(obj, 1, 2, 3);
```

**Call immediately**

---

```javascript
abcd.apply(obj, [1, 2, 3]);
```

**Call immediately**

---

```javascript
let fnc = abcd.bind(obj, 1, 2, 3);
```

**Create a new function**

Then:

```javascript
fnc();
```

**Call later**

---

# Easy Real-Life Analogy

Imagine `abcd()` is an employee.

```javascript
function abcd(a, b, c) {
    console.log(this, a, b, c);
}
```

And `obj` is a company.

### `call()`

You say:

> "Shivam, come to this company **right now** and work with these 3 values."

```javascript
abcd.call(obj, 1, 2, 3);
```

➡️ Immediate execution.

---

### `apply()`

Same thing, but you hand over the values as a package:

```javascript
abcd.apply(obj, [1, 2, 3]);
```

➡️ Immediate execution.

---

### `bind()`

You say:

> "Shivam, I've assigned you to this company. You can start whenever I call you."

```javascript
let fnc = abcd.bind(obj, 1, 2, 3);
```

Later:

```javascript
fnc();
```

➡️ Execution happens later.

---

#  `call()` vs `apply()` vs `bind()`

| Feature              | `call()`                | `apply()`                 | `bind()`                 |
| -------------------- | ----------------------- | ------------------------- | ------------------------ |
| Sets `this`          | ✅                       | ✅                         | ✅                        |
| Executes immediately | ✅                       | ✅                         | ❌                        |
| Returns new function | ❌                       | ❌                         | ✅                        |
| Arguments            | Individual              | Array                     | Individual               |
| Main use             | Immediate function call | Immediate call with array | Create reusable function |
| Syntax               | `fn.call(obj, a, b)`    | `fn.apply(obj, [a, b])`   | `fn.bind(obj, a, b)`     |

---


