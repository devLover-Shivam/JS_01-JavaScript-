//scope - functional scope, global scope and block scope
//function scope - function k andar hi use ho skti hai
//global scope- poore code me kahi bhi use ho skti hai
//block scope- {curly braces me hi use ho sakti hai}

//agar aapka code kisi bhi {} k andar nhi hai to aapka code global hai !

//Lexical Scoping and Dynamic Scoping
//lexical -- js me hum lexical scoping hi use karte hai-- mltb jahan hum physically available hai wo location decide karega hum kya access kar sakte hai aur kya nhi!

//example:- a is lexically(physically) available inside the function abcd that means it can be accessed anywhere inside the function abcd.so a is lexically scoped in abcd.

function abcd(){
    let a = 12;
    function defg(){
        console.log(a);
    }
}

//Dynamic Scoping:- kahan se call kar rhe ho uspe depend karega ki kya value milegi.(yeh js me follow nhi karte hai)


//example:- agar dynamic scoping hoti js me to x ki value 13 print hoti kyuki wo x ki value wahi lmno function se utha leta, but hijk globally scoped hai to jab hijk call hua to x ka value global scope me dhunda jaega aur wahan x ki value 12 hai to 12 print hogi.
let x =12;
function hijk(){
    console.log(x);
}

function lmno(){
    let x = 13;
    hijk();
}

lmno();

/* Bilkul bhai. Chalo ekdum **scratch se**, bina definitions ratwaye, real-life logic ke saath samajhte hain.

---

# Step 1: Scope kya hota hai?

Scope simply batata hai:

> "Ye variable kis jagah se access ho sakta hai?"

```js
let college = "HIT";

function show() {
    console.log(college);
}

show();
```

Yahan `college` function ke andar access ho raha hai kyunki wo outer scope mein hai.

---

# Step 2: Lexical ka matlab kya hai?

**Lexical = Code mein likha hua structure**

JavaScript code ko dekhkar pehle hi decide kar leta hai:

```text
Kaun kiske andar likha hua hai?
```

Example:

```js
let x = 10;

function outer() {
    let y = 20;

    function inner() {
        console.log(x, y);
    }

    inner();
}
```

Code structure:

```text
Global
│
└── outer()
     │
     └── inner()
```

`inner()` ke paas access hai:

* Apne variables
* outer() ke variables
* Global ke variables

Kyuki wo code mein unke andar likha hua hai.

---

# Step 3: Lexical Scope ka Rule

Variable dhundte waqt JS ye nahi dekhta:

```text
Function ko kisne call kiya?
```

Wo dekhta hai:

```text
Function kahaan define hua tha?
```

Ye sabse important line hai.

---

# Example 1

```js
let name = "Shivam";

function printName() {
    console.log(name);
}

printName();
```

Output:

```text
Shivam
```

Simple hai.

---

# Example 2

Ab thoda interesting.

```js
let name = "Shivam";

function printName() {
    console.log(name);
}

function test() {
    let name = "Rahul";
    printName();
}

test();
```

Ab guess karo output?

---

### Output

```text
Shivam
```

Not Rahul.

---

## Kyun?

Code structure dekho:

```text
Global
│
├── name = "Shivam"
│
├── printName()
│
└── test()
```

`printName()` Global ke andar define hua tha.

Jab JS `name` dhundta hai:

```text
printName()
     ↑
Global
```

Usko `"Shivam"` mil jata hai.

Wo `test()` ke andar nahi dekhta.

---

# Tumhari Galti Yahan Ho Sakti Hai

Tum soch rahe hoge:

```text
Arre printName() ko to test() ne call kiya tha.
To Rahul kyu nahi aaya?
```

Because JS lexical scope use karta hai.

Caller matter nahi karta.

Definition place matter karti hai.

---

# Dynamic Scope Hota To?

Maan lo JS dynamic hota.

Fir lookup aise hota:

```text
printName()
      ↑
test()
      ↑
Global
```

Tab output aata:

```text
Rahul
```

Lekin JS aisa nahi karta.

---

# Real Life Analogy

Maan lo tum hostel mein rehte ho.

Tumhara permanent address:

```text
Room 101
```

Ab tum kisi dost ke room mein chale gaye:

```text
Room 205
```

Koi puche:

```text
Tumhara room number kya hai?
```

Tum bologe:

```text
101
```

Kyuki tumhara original ghar 101 hai.

205 nahi.

Exactly waise hi function apna original scope yaad rakhta hai.

---

# Execution Context Kahan Aata Hai?

Jab function execute hota hai:

```js
function greet() {
    let msg = "Hello";
    console.log(msg);
}

greet();
```

JS ek execution context banata hai.

```text
Execution Context
------------------
Variables
Functions
this
```

---

# Visual

```text
Call Stack

┌─────────┐
│ greet() │
├─────────┤
│ Global  │
└─────────┘
```

Jab function finish:

```text
┌─────────┐
│ Global  │
└─────────┘
```

Context destroy.

---

# Closure Kahan Aata Hai?

Ab ye dekho:

```js
function outer() {
    let count = 0;

    return function inner() {
        count++;
        console.log(count);
    };
}

const counter = outer();

counter();
counter();
counter();
```

Output:

```text
1
2
3
```

---

## Normal Rule Ke Hisaab Se

Jab `outer()` finish hua:

```text
outer context destroy
```

hona chahiye tha.

To `count` bhi gayab ho jana chahiye tha.

---

## Lekin Hua Kya?

`inner()` ko abhi bhi `count` chahiye.

To JS bolta hai:

```text
Theek hai,
main count ko memory mein rakhta hu.
```

Ye preserved memory hi closure hai.

---

# Visual Diagram

```text
outer()
─────────────────
count = 0
      ▲
      │
      │ remembered
      │
inner()
```

Jab bhi:

```js
counter();
```

run hoga,

`inner()` ko `count` mil jayega.

---

# Ab Puri Story Connect Karo

### 1. Lexical Scope

```text
Function apna parent scope
yaad rakhta hai.
```

---

### 2. Execution Context

```text
Function run hone par
temporary workspace banta hai.
```

---

### 3. Closure

```text
Function khatam hone ke baad bhi
agar inner function ko variable chahiye,
to JS us variable ko preserve karta hai.
```

---

# Interview Answer (30 sec)

> JavaScript lexical scoping follow karta hai. Iska matlab variable lookup function ke definition location par depend karta hai, na ki call location par. Jab function execute hota hai to execution context create hota hai. Agar koi inner function outer scope ke variables ko use karta rahe after outer function has finished, JavaScript closure create karke un variables ko memory mein preserve rakhta hai.


 */