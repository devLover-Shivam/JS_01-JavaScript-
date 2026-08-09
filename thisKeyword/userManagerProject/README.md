# User Manager --- JavaScript DOM & `this` Keyword Project

A small JavaScript project that demonstrates how to build a **User
Manager** using:

-   JavaScript objects
-   The `this` keyword
-   `call()` / `apply()` / `bind()` concepts, especially `bind()`
-   Event handling
-   Form submission
-   `document.querySelector()`
-   `document.createElement()`
-   `textContent`
-   `className`
-   `appendChild()`
-   Arrays and objects
-   Dynamic DOM manipulation
-   Separating data management from UI rendering

The main purpose of this project is not just to create profile cards. It
is to understand **how JavaScript controls the webpage through the DOM
and, especially, how `this` behaves when object methods are used as
event handlers.**

------------------------------------------------------------------------

## Project Idea

The webpage contains a form where the user enters:

-   Name
-   Role
-   Bio
-   Photo URL

When the user clicks **Create Profile**:

1.  The form submission is intercepted.
2.  The entered values are collected.
3.  A user object is created.
4.  The object is stored inside the `users` array.
5.  The form is reset.
6.  The UI is re-rendered.
7.  JavaScript dynamically creates a profile card.
8.  The card is appended to `.profiles-container`.

Initially, the profile container is empty. **No default profile card
exists in the HTML.**

------------------------------------------------------------------------

#  Complete Execution Flow

The complete flow is:

``` text
Page loads
    ↓
script.js executes
    ↓
HTML elements are selected
    ↓
userManager object is created
    ↓
userManager.init()
    ↓
submit event listener is attached
    ↓
User fills the form
    ↓
User clicks "Create Profile"
    ↓
submitForm() executes
    ↓
e.preventDefault()
    ↓
this.addUser()
    ↓
New user object is created
    ↓
User object is pushed into users[]
    ↓
Form is reset
    ↓
this.renderUI()
    ↓
profiles-container is cleared
    ↓
users.forEach() loops through all users
    ↓
DOM elements are created using createElement()
    ↓
Elements are filled using properties like textContent
    ↓
Elements are connected using appendChild()
    ↓
Complete card is appended to .profiles-container
    ↓
Profile appears on webpage
```

------------------------------------------------------------------------

# 1. Connecting JavaScript with HTML

The first line:

``` javascript
console.log("JS FILE CONNECTED");
```

is simply used to verify that the JavaScript file has been successfully
connected to the HTML.

If this appears in the browser console:

``` text
JS FILE CONNECTED
```

the JavaScript file is loading correctly.

------------------------------------------------------------------------

# 2. Selecting HTML Elements

We first select the elements from the HTML using
`document.querySelector()`.

``` javascript
let form = document.querySelector("form");

let username = document.querySelector("#name");
let role = document.querySelector("#role");
let bio = document.querySelector("#bio");
let photo = document.querySelector("#photo");
```

### What is happening?

For example:

``` javascript
document.querySelector("#name");
```

means:

> Find the HTML element whose `id` is `name`.

So:

``` html
<input id="name">
```

is selected and stored inside:

``` javascript
username
```

Similarly:

``` text
#name  → username input
#role  → role input
#bio   → bio textarea
#photo → photo URL input
form   → form element
```

This allows JavaScript to read the values entered by the user.

------------------------------------------------------------------------

# 3. The `userManager` Object

The entire application logic is organized inside one object:

``` javascript
const userManager = {

    users: [],

    init: function() {},
    submitForm: function() {},
    addUser: function() {},
    renderUI: function() {},
    removeUser: function() {}

};
```

This object acts as the **manager/controller of our application**.

It contains:

-   The application data
-   Functions that handle form submission
-   Functions that add users
-   Functions that render users
-   A placeholder for removing users

------------------------------------------------------------------------

# 4. The `users` Array

``` javascript
users: [],
```

This array is our application's temporary data store.

Initially:

``` javascript
users = [];
```

After Shivam submits:

``` javascript
users = [
    {
        username: "Shivam",
        role: "Frontend Developer",
        bio: "Learning JavaScript",
        photo: "https://..."
    }
];
```

After another user submits:

``` javascript
users = [
    {
        username: "Shivam",
        role: "Frontend Developer",
        bio: "Learning JavaScript",
        photo: "https://..."
    },

    {
        username: "Rahul",
        role: "Backend Developer",
        bio: "Node.js enthusiast",
        photo: "https://..."
    }
];
```

So the array keeps track of every user created during the current page
session.

> Note: This data is only stored in JavaScript memory. Refreshing the
> page will erase the array because there is no database or
> `localStorage` involved.

------------------------------------------------------------------------

# 5. `init()` --- Starting the Application

``` javascript
init: function(){
    form.addEventListener("submit", this.submitForm.bind(this));
},
```

The application is started using:

``` javascript
userManager.init();
```

at the bottom of the file.

So the execution begins with:

``` text
userManager.init()
        ↓
addEventListener()
        ↓
wait for form submission
```

------------------------------------------------------------------------

# 6. Why `bind(this)` Is Important

This is one of the most important parts of the project.

We have:

``` javascript
form.addEventListener(
    "submit",
    this.submitForm.bind(this)
);
```

At first glance, it might look complicated.

Break it down.

We want the `submitForm` method to execute when the form is submitted.

But there is a problem with `this`.

Inside the object:

``` javascript
const userManager = {

    submitForm: function(e) {
        e.preventDefault();
        this.addUser();
    }

};
```

we want:

``` javascript
this
```

to refer to:

``` javascript
userManager
```

because `addUser()` belongs to `userManager`.

Therefore we use:

``` javascript
this.submitForm.bind(this)
```

------------------------------------------------------------------------

# What Would Happen Without `bind(this)`?

Suppose we wrote:

``` javascript
form.addEventListener("submit", this.submitForm);
```

The browser eventually calls the event handler as an event listener.

Inside the normal function:

``` javascript
submitForm: function(e) {
    e.preventDefault();

    this.addUser();
}
```

`this` would not refer to the `userManager` object in the way we need
here.

We need:

``` text
this → userManager
```

so that:

``` javascript
this.addUser();
```

means:

``` javascript
userManager.addUser();
```

`bind(this)` creates a new function with `this` permanently bound to the
object.

------------------------------------------------------------------------

# Understanding This Line

``` javascript
form.addEventListener("submit", this.submitForm.bind(this));
```

When this line is executed inside `userManager.init()`:

### First `this`

``` javascript
this.submitForm
```

means:

``` javascript
userManager.submitForm
```

because `init()` is called like:

``` javascript
userManager.init();
```

Therefore, inside `init()`:

``` javascript
this === userManager
```

### Second `this`

``` javascript
.bind(this)
```

passes that same `userManager` object to `bind()`.

So:

``` javascript
this.submitForm.bind(this)
```

basically means:

> Create a new function based on `submitForm`, but whenever it runs,
> make its `this` refer to `userManager`.

This is exactly why we can later safely write:

``` javascript
this.addUser();
```

inside `submitForm()`.

------------------------------------------------------------------------

# 7. Form Submission

When the user clicks:

``` text
Create Profile
```

the browser fires the `submit` event.

The bound function executes:

``` javascript
submitForm: function(e){
    e.preventDefault();
    this.addUser();
},
```

------------------------------------------------------------------------

# 8. `e.preventDefault()`

Normally, submitting an HTML form causes the browser to perform its
default form-submission behavior, which can reload/navigate the page.

We don't want that.

So:

``` javascript
e.preventDefault();
```

means:

> Stop the browser's default form submission behavior.

Now JavaScript can handle the entire process itself.

------------------------------------------------------------------------

# 9. Calling `addUser()`

Next:

``` javascript
this.addUser();
```

Because of `bind(this)`:

``` text
this
 ↓
userManager
```

Therefore:

``` javascript
this.addUser();
```

is effectively:

``` javascript
userManager.addUser();
```

The flow becomes:

``` text
submitForm()
    ↓
this.addUser()
    ↓
userManager.addUser()
```

------------------------------------------------------------------------

# 10. Adding the User

Inside `addUser()`:

``` javascript
this.users.push({
    username: username.value,
    role: role.value,
    bio: bio.value,
    photo: photo.value,
});
```

A new object is created.

For example, suppose the user enters:

``` text
Name: Shivam
Role: Frontend Developer
Bio: Learning JavaScript and React
Photo: https://example.com/shivam.jpg
```

JavaScript creates:

``` javascript
{
    username: "Shivam",
    role: "Frontend Developer",
    bio: "Learning JavaScript and React",
    photo: "https://example.com/shivam.jpg"
}
```

Then:

``` javascript
this.users.push(...)
```

adds that object to the `users` array.

Again:

``` text
this → userManager
```

so:

``` javascript
this.users
```

means:

``` javascript
userManager.users
```

------------------------------------------------------------------------

# 11. Reading Form Values

Consider:

``` javascript
username.value
```

`username` contains the actual input element:

``` html
<input id="name">
```

`.value` gives us whatever the user typed.

For example:

``` javascript
username.value
```

could return:

``` text
"Shivam"
```

Similarly:

``` javascript
role.value
bio.value
photo.value
```

return the current values entered into those fields.

------------------------------------------------------------------------

# 12. Resetting the Form

After adding the user:

``` javascript
form.reset();
```

clears all form fields.

So:

``` text
Before submit:

Name  → Shivam
Role  → Frontend Developer
Bio   → Learning JavaScript
Photo → https://...


After form.reset():

Name  → ""
Role  → ""
Bio   → ""
Photo → ""
```

The user can immediately enter another profile.

------------------------------------------------------------------------

# 13. Calling `renderUI()`

After resetting the form:

``` javascript
this.renderUI();
```

Again:

``` text
this → userManager
```

so this means:

``` javascript
userManager.renderUI();
```

The purpose of `renderUI()` is:

> Take the data stored inside `users[]` and display it on the webpage.

------------------------------------------------------------------------

# 14. Rendering the UI

The first line of `renderUI()` is:

``` javascript
document.querySelector(".profiles-container").innerHTML = "";
```

The HTML contains:

``` html
<div class="profiles-container"></div>
```

We select it:

``` javascript
document.querySelector(".profiles-container")
```

and then:

``` javascript
.innerHTML = "";
```

clears its existing content.

### Why?

Because `renderUI()` loops over the entire `users` array.

Suppose:

``` text
users = [Shivam]
```

It creates Shivam's card.

Later:

``` text
users = [Shivam, Rahul]
```

If we didn't clear the container, we could accidentally get:

``` text
Shivam
Shivam
Rahul
```

Instead, we clear the container first and render the current state of
the array:

``` text
Clear container
     ↓
Render Shivam
     ↓
Render Rahul
```

So the DOM always represents the current `users` array.

------------------------------------------------------------------------

# 15. Looping Through Users

``` javascript
this.users.forEach(function(user){
```

Again:

``` text
this → userManager
```

Therefore:

``` javascript
this.users
```

is:

``` javascript
userManager.users
```

If the array contains:

``` javascript
[
    {
        username: "Shivam",
        role: "Frontend Developer",
        bio: "Learning JavaScript",
        photo: "..."
    },

    {
        username: "Rahul",
        role: "Backend Developer",
        bio: "Learning Node.js",
        photo: "..."
    }
]
```

`forEach()` runs once for each object.

First:

``` text
user → Shivam object
```

Second:

``` text
user → Rahul object
```

------------------------------------------------------------------------

# 16. Creating HTML Elements Using `createElement()`

Instead of writing HTML directly:

``` html
<div class="profile-card">
    <img>
    <h2></h2>
    <p></p>
    <p></p>
</div>
```

we create every element using JavaScript.

First:

``` javascript
let card = document.createElement("div");
```

This creates:

``` html
<div></div>
```

Then:

``` javascript
card.className = "profile-card";
```

turns it into:

``` html
<div class="profile-card"></div>
```

------------------------------------------------------------------------

# 17. Creating the Image

``` javascript
let img = document.createElement("img");
```

creates:

``` html
<img>
```

Then:

``` javascript
img.src = user.photo;
```

sets the image source.

And:

``` javascript
img.alt = "User Photo";
```

sets the alternative text.

So JavaScript has effectively created:

``` html
<img
    src="user's photo URL"
    alt="User Photo"
>
```

------------------------------------------------------------------------

# 18. Creating the Username

``` javascript
let h2 = document.createElement("h2");
```

creates:

``` html
<h2></h2>
```

Then:

``` javascript
h2.textContent = user.username;
```

puts the user's name inside it.

For example:

``` html
<h2>Shivam</h2>
```

------------------------------------------------------------------------

# 19. Creating the Role

``` javascript
let role = document.createElement("p");

role.className = "role";

role.textContent = user.role;
```

This creates:

``` html
<p class="role">
    Frontend Developer
</p>
```

------------------------------------------------------------------------

# 20. Creating the Bio

``` javascript
let bio = document.createElement("p");

bio.className = "bio";

bio.textContent = user.bio;
```

This creates:

``` html
<p class="bio">
    Learning JavaScript and React
</p>
```

------------------------------------------------------------------------

# 21. Building the DOM Tree with `appendChild()`

This is another major concept in this project.

We have separately created:

``` text
card
img
h2
role
bio
```

But they are not connected yet.

We need to build the hierarchy.

First:

``` javascript
card.appendChild(img);
```

Now:

``` text
card
└── img
```

Then:

``` javascript
card.appendChild(h2);
```

Now:

``` text
card
├── img
└── h2
```

Then:

``` javascript
card.appendChild(role);
```

Now:

``` text
card
├── img
├── h2
└── role
```

Finally:

``` javascript
card.appendChild(bio);
```

Now:

``` text
card
├── img
├── h2
├── role
└── bio
```

This produces the equivalent HTML:

``` html
<div class="profile-card">

    <img src="..." alt="User Photo">

    <h2>Shivam</h2>

    <p class="role">Frontend Developer</p>

    <p class="bio">
        Learning JavaScript and React
    </p>

</div>
```

------------------------------------------------------------------------

# 22. Appending the Complete Card to the Webpage

Finally:

``` javascript
document
    .querySelector(".profiles-container")
    .appendChild(card);
```

This selects:

``` html
<div class="profiles-container"></div>
```

and puts the complete card inside it.

Before:

``` html
<div class="profiles-container">
</div>
```

After:

``` html
<div class="profiles-container">

    <div class="profile-card">
        <img src="..." alt="User Photo">

        <h2>Shivam</h2>

        <p class="role">Frontend Developer</p>

        <p class="bio">Learning JavaScript</p>
    </div>

</div>
```

------------------------------------------------------------------------

# Understanding `appendChild()` Visually

The complete operation is:

``` text
                    profiles-container
                           │
                           │ appendChild(card)
                           ↓
                     profile-card
                      /    |    \
                     /     |     \
                   img     h2    role
                                  \
                                   bio
```

Or in DOM hierarchy:

``` text
document
   │
   └── .profiles-container
          │
          └── .profile-card
                 ├── img
                 ├── h2
                 ├── p.role
                 └── p.bio
```

This is how JavaScript dynamically modifies the webpage.

------------------------------------------------------------------------

# Most Important `this` Usage in This Project

There are several places where `this` matters.

## 1. Inside `init()`

``` javascript
userManager.init();
```

Therefore:

``` javascript
this === userManager
```

So:

``` javascript
this.submitForm
```

means:

``` javascript
userManager.submitForm
```

------------------------------------------------------------------------

## 2. `bind(this)`

``` javascript
this.submitForm.bind(this)
```

This permanently binds the event handler's `this` to `userManager`.

Therefore when the form submits:

``` javascript
this.addUser();
```

works correctly.

------------------------------------------------------------------------

## 3. Inside `submitForm()`

``` javascript
submitForm: function(e){
    e.preventDefault();
    this.addUser();
}
```

Here:

``` text
this → userManager
```

Therefore:

``` javascript
this.addUser()
```

means:

``` javascript
userManager.addUser()
```

------------------------------------------------------------------------

## 4. Inside `addUser()`

``` javascript
this.users.push(...)
```

Here:

``` text
this → userManager
```

Therefore:

``` javascript
this.users
```

means:

``` javascript
userManager.users
```

And:

``` javascript
this.renderUI()
```

means:

``` javascript
userManager.renderUI()
```

------------------------------------------------------------------------

## 5. Inside `renderUI()`

``` javascript
this.users.forEach(function(user){
```

Here, `this` is still referring to `userManager` when accessing
`this.users`.

However, the `function(user)` passed to `forEach()` has its **own `this`
behavior**. We don't use `this` inside that callback, so it doesn't
cause a problem.

The `user` variable is provided directly by `forEach()` and represents
the current user object.

------------------------------------------------------------------------

# `this` vs `user`

These two are completely different:

``` javascript
this.users
```

and:

``` javascript
user
```

### `this`

Refers to the `userManager` object in the relevant methods:

``` text
this → userManager
```

### `user`

Represents one individual object from the array:

``` javascript
this.users.forEach(function(user){
```

For example:

``` javascript
user.username
```

means:

> Give me the username of the current user being processed.

Whereas:

``` javascript
this.users
```

means:

> Give me the complete users array belonging to `userManager`.

------------------------------------------------------------------------

# Complete Example of One Submission

Suppose the user enters:

``` text
Name:
Shivam

Role:
Frontend Developer

Bio:
Learning JavaScript and React

Photo:
https://example.com/shivam.jpg
```

Then clicks:

``` text
Create Profile
```

### Step 1

Browser fires:

``` text
submit
```

### Step 2

Bound event handler executes:

``` javascript
submitForm()
```

### Step 3

Default browser behavior is stopped:

``` javascript
e.preventDefault();
```

### Step 4

`addUser()` is called:

``` javascript
this.addUser();
```

### Step 5

Object is created:

``` javascript
{
    username: "Shivam",
    role: "Frontend Developer",
    bio: "Learning JavaScript and React",
    photo: "https://example.com/shivam.jpg"
}
```

### Step 6

Object is pushed:

``` javascript
users.push(user);
```

Array now becomes:

``` javascript
[
    {
        username: "Shivam",
        role: "Frontend Developer",
        bio: "Learning JavaScript and React",
        photo: "https://example.com/shivam.jpg"
    }
]
```

### Step 7

Form is reset:

``` javascript
form.reset();
```

### Step 8

UI rendering begins:

``` javascript
this.renderUI();
```

### Step 9

Container is cleared:

``` javascript
container.innerHTML = "";
```

### Step 10

`forEach()` takes the Shivam object.

### Step 11

JavaScript creates:

``` javascript
div
img
h2
p
p
```

### Step 12

They are connected:

``` javascript
card.appendChild(img);
card.appendChild(h2);
card.appendChild(role);
card.appendChild(bio);
```

### Step 13

The complete card is inserted:

``` javascript
container.appendChild(card);
```

### Final result

The profile appears on the webpage.

------------------------------------------------------------------------

# Why We Used `createElement()` Instead of Writing HTML Directly

We could have used:

``` javascript
container.innerHTML += `
    <div>
        <img src="${user.photo}">
        <h2>${user.username}</h2>
        <p>${user.role}</p>
        <p>${user.bio}</p>
    </div>
`;
```

But this project specifically demonstrates the DOM API.

With:

``` javascript
document.createElement()
```

we manually construct the DOM tree.

This teaches the fundamentals of how JavaScript actually creates and
modifies HTML elements.

------------------------------------------------------------------------

# Important DOM Methods Used

  Method / Property            Purpose
  ---------------------------- -------------------------------
  `document.querySelector()`   Select an HTML element
  `document.createElement()`   Create a new HTML element
  `.className`                 Assign a class
  `.src`                       Set image URL
  `.alt`                       Set image alternative text
  `.textContent`               Insert text into an element
  `.appendChild()`             Add an element as a child
  `.innerHTML = ""`            Clear existing HTML
  `.value`                     Read input value
  `.reset()`                   Reset form fields
  `.addEventListener()`        Listen for events
  `.preventDefault()`          Stop default browser behavior

------------------------------------------------------------------------

# Important JavaScript Concepts Used

  Concept                          Where Used
  -------------------------------- ------------------------------------------
  Object                           `userManager`
  Array                            `users: []`
  Object inside array              User data
  Methods                          `init()`, `addUser()`, `renderUI()`
  `this`                           Accessing `userManager`
  `bind()`                         Keeping `this` attached to `userManager`
  Event listener                   Form submission
  `forEach()`                      Rendering every user
  DOM manipulation                 Creating profile cards
  `createElement()`                Creating HTML elements
  `appendChild()`                  Building and inserting DOM
  Form handling                    Reading and resetting form
  Separation of responsibilities   Data vs UI logic

------------------------------------------------------------------------

# Project Architecture

The project follows a simple flow:

``` text
                 userManager
                      │
        ┌─────────────┼─────────────┐
        │             │             │
      users          init        methods
        │                           │
        │                 ┌─────────┴─────────┐
        │                 │                   │
        │             submitForm()         addUser()
        │                                     │
        │                                     ↓
        │                                users.push()
        │                                     │
        │                                     ↓
        │                                renderUI()
        │                                     │
        │                                     ↓
        └────────────────────────────── DOM manipulation
```

------------------------------------------------------------------------

# Core Lesson of This Project

This project is really teaching two major things.

## 1. `this` is contextual

`this` doesn't automatically mean "the object where the function was
written."

Its value depends on **how the function is called**.

In this project, we deliberately use:

``` javascript
.bind(this)
```

so that the event handler keeps:

``` text
this → userManager
```

This allows:

``` javascript
this.addUser();
this.users;
this.renderUI();
```

to work correctly.

------------------------------------------------------------------------

## 2. The DOM is a tree

When JavaScript creates a profile card, it isn't magically generating a
block of HTML.

It is creating individual DOM nodes:

``` javascript
document.createElement()
```

and connecting them:

``` javascript
appendChild()
```

The process is:

``` text
Create
  ↓
Configure
  ↓
Connect
  ↓
Append to document
```

For example:

``` javascript
let card = document.createElement("div");

let h2 = document.createElement("h2");

h2.textContent = user.username;

card.appendChild(h2);

container.appendChild(card);
```

This is essentially JavaScript constructing:

``` html
<div class="profile-card">
    <h2>Shivam</h2>
</div>
```

------------------------------------------------------------------------

