# Intersection Observer + Lazy Loading

## 1. Sabse pehle: Lazy Loading kya hai?

Lazy loading ka simple meaning hai:

> **Kisi resource ko tabhi load karo jab uski actually zarurat ho.**

Hamare case mein resource hai **image**.

Normally agar HTML mein ye likha hai:

```html
<img src="image.jpg">
```

to browser page load hote hi image ko download karna start kar deta hai.

Chahe image screen par visible ho ya nahi.

Suppose page par 50 images hain:

```text
Page load
   ↓
50 images ke URLs mil gaye
   ↓
Browser 50 images download karna start karega
```

Lekin user shayad first 3 images hi dekhe.

To baaki 47 images ko immediately download karna wasteful ho sakta hai.

Lazy loading ka idea:

```text
Page load
   ↓
Images abhi load mat karo
   ↓
User scroll kare
   ↓
Image viewport ke paas aaye
   ↓
Ab image load karo
```

Isi kaam ke liye hum **Intersection Observer** use karenge.

---

# 2. Intersection Observer kya hai?

`IntersectionObserver` browser ka ek built-in Web API hai jo humein ye detect karne deta hai ki:

> **Koi particular element kisi doosre element ya viewport ke saath intersect/overlap kar raha hai ya nahi.**

Yahan sabse important word hai:

### Intersection

Intersection ka simple meaning hai:

> Do cheezein ek doosre ke area mein aa rahi hain ya overlap kar rahi hain.

Hamare case mein:

```text
Browser Viewport
┌──────────────────────────┐
│                          │
│       IMAGE              │
│                          │
└──────────────────────────┘
```

Jab image viewport ke andar aati hai, hum keh sakte hain:

```text
Image intersects viewport
```

Aur `IntersectionObserver` humein ye information de deta hai.

---

# 3. Viewport kya hota hai?

Viewport simply browser window ka woh portion hai jo user ko currently dikh raha hai.

Suppose webpage bahut lamba hai:

```text
        WEBPAGE
┌────────────────────┐
│ Image 1            │ ← visible
│                    │
├────────────────────┤
│ Image 2            │ ← visible
├────────────────────┤
│ Image 3            │
│                    │
│ Image 4            │
│                    │
│ Image 5            │
└────────────────────┘
```

Browser screen par sirf upar ka portion visible hai.

Ye visible area:

```text
Viewport
```

hai.

User scroll karega:

```text
Scroll ↓
```

to viewport neeche move hota hua feel hota hai.

Ab Image 3 viewport mein aa sakti hai.

Intersection Observer detect kar sakta hai:

```text
Image 3
   ↓
Viewport ke andar aa gayi
   ↓
Intersection detected
```

---

# 4. Intersection Observer ki zarurat kyu hai?

Tum theoretically scroll event se bhi ye kaam kar sakte ho:

```js
window.addEventListener("scroll", function(){
    // check karo image viewport mein hai ya nahi
});
```

Lekin problem ye hai ki scroll events bahut frequently fire ho sakte hain.

User scroll karega:

```text
scroll
scroll
scroll
scroll
scroll
scroll
scroll
...
```

Aur har event par manually calculate karna expensive ho sakta hai.

`IntersectionObserver` browser ko ye monitoring efficiently handle karne deta hai.

Conceptually:

```text
Without IntersectionObserver:

Scroll
 ↓
Manually calculate position
 ↓
Is image visible?
 ↓
Repeat
 ↓
Repeat
 ↓
Repeat


With IntersectionObserver:

Browser
 ↓
Element ko observe karo
 ↓
Browser intersection detect karega
 ↓
Intersection hone par callback
 ↓
Tumhara code execute
```

Isliye visibility-based tasks ke liye `IntersectionObserver` bahut useful API hai.

---

# 5. Basic Syntax of IntersectionObserver

Hamare code mein:

```js
const observer = new IntersectionObserver(function(entries, observer){

});
```

Yahan:

```js
new IntersectionObserver(...)
```

ek **IntersectionObserver object** create karta hai.

Is observer ka kaam hoga:

> "Main jin elements ko observe karunga, unke viewport ke saath intersection ko monitor karna."

---

# 6. `new` yahan kya kar raha hai?

`IntersectionObserver` browser dwara provided constructor/API hai.

Jab hum:

```js
new IntersectionObserver(...)
```

likhte hain, hum uska ek naya observer instance create kar rahe hain.

Conceptually:

```text
IntersectionObserver
        ↓
    Blueprint/API
        ↓
new
        ↓
Observer instance
        ↓
observer
```

Ab:

```js
const observer
```

mein woh observer store ho gaya.

---

# 7. Intersection Observer ko Callback Function kyu chahiye?

Observer ko ye pata chalega ki intersection hua.

Lekin uske baad **kya karna hai**, ye usse khud nahi pata.

Isliye hum callback function dete hain:

```js
new IntersectionObserver(function(entries, observer){

});
```

Meaning:

> "Jab bhi observed element ke intersection mein relevant change aaye, ye function chala dena."

So:

```text
Intersection detected
        ↓
Callback function
        ↓
Tumhara code
```

---

# 8. `entries` kya hai?

Callback mein:

```js
function(entries, observer)
```

do parameters hain.

Pehla:

```js
entries
```

`entries` mein observer ke dwara detect ki gayi intersection information hoti hai.

Ye generally **array-like collection of IntersectionObserverEntry objects** hota hai.

Important distinction:

```text
entries
   ↓
multiple intersection records

entry
   ↓
one intersection record
```

Isliye hum likhte hain:

```js
entries.forEach(function(entry){
```

Hum har individual intersection entry ko process kar rahe hain.

---

# 9. `entry` kya hai?

Ye important hai.

```js
entries.forEach(function(entry){
```

Yahan `entry` **image nahi hai**.

`entry` ek `IntersectionObserverEntry` object hai.

Is object mein information hoti hai, jaise:

* Kaunsa element observe hua?
* Kya woh intersect kar raha hai?
* Kitna portion visible hai?
* Intersection rectangle kya hai?
* etc.

Hamare code mein sabse important properties hain:

```js
entry.isIntersecting
```

aur:

```js
entry.target
```

---

# 10. `entry.isIntersecting`

Code:

```js
if(entry.isIntersecting){
```

Ye check karta hai:

> "Kya observed element viewport/root ke saath currently intersect kar raha hai?"

Agar:

```js
entry.isIntersecting === true
```

to element intersection mein hai.

Hamare case mein:

```text
Image viewport mein aa gayi
        ↓
isIntersecting = true
```

Agar image viewport se bahar hai:

```text
Image viewport ke bahar
        ↓
isIntersecting = false
```

Lazy loading mein humein exactly yehi information chahiye.

---

# 11. `entry.target`

Ab:

```js
const img = entry.target;
```

Yahan hum `entry` ke andar se actual observed element nikal rahe hain.

Suppose humne observe kiya:

```html
<img class="lazy-img">
```

Then:

```js
entry.target
```

us actual `<img>` element ko refer karega.

So:

```text
entry
 ↓
IntersectionObserverEntry
 ↓
entry.target
 ↓
actual <img>
```

Isliye:

```js
const img = entry.target;
```

ka matlab:

> "Jis image ke intersection ke baare mein observer ne mujhe information di hai, us actual image ko `img` variable mein store kar do."

---

# 12. Ab aate hain HTML ke `src` → `data-src` change par

Ye lazy loading ka **most important part** hai.

Normally hum likhte:

```html
<img src="image.jpg">
```

Browser isse dekhta hai aur bolta hai:

> "Achha, mujhe image URL mil gaya. Is image ko download karo."

So:

```text
<img src="image.jpg">
       ↓
Browser immediately knows the image source
       ↓
Image download
```

But lazy loading mein humein ye nahi chahiye.

Humein chahiye:

```text
Page load
   ↓
Image download mat karo
   ↓
User scroll kare
   ↓
Image viewport mein aaye
   ↓
Tab image download karo
```

To hum `src` hata dete hain.

---

# 13. `data-src` kya hai?

Hum likhte hain:

```html
<img data-src="image.jpg">
```

`data-src` browser ka actual image source attribute nahi hai.

Ye simply ek **custom data attribute** hai.

HTML mein `data-*` attributes ka use hum apna custom data store karne ke liye kar sakte hain.

Example:

```html
<div data-user-id="123"></div>
```

```html
<button data-product-id="456"></button>
```

Similarly:

```html
<img data-src="image.jpg">
```

mein hum image ka actual URL temporarily store kar rahe hain.

---

# 14. `src` ki jagah `data-src` kyu?

Because:

```html
<img src="image.jpg">
```

ka matlab browser ke liye:

> "Is image ko load karo."

Whereas:

```html
<img data-src="image.jpg">
```

ka matlab:

> "Yahan ek custom piece of data hai. Browser ise image source ke roop mein automatically load nahi karega."

Exactly isi behaviour ka hum lazy loading ke liye advantage le rahe hain.

So:

```text
src
↓
Browser automatically loads image


data-src
↓
Browser automatically image load nahi karta
↓
JavaScript decide karegi kab load karna hai
```

---

# 15. `dataset` kya hai?

Ab hamare JavaScript mein:

```js
img.dataset.src
```

likha hai.

Ye ek **new concept** hai.

HTML:

```html
<img data-src="image.jpg">
```

JavaScript mein:

```js
img.dataset.src
```

se hum `data-src` ki value access kar sakte hain.

So:

```html
data-src="image.jpg"
```

becomes:

```js
img.dataset.src
```

which gives:

```text
"image.jpg"
```

---

# 16. `data-*` aur `dataset` ka relation

Ye mapping yaad rakho:

```html
data-src
   ↓
dataset.src
```

Example:

```html
<div data-user-name="Shivam"></div>
```

JavaScript:

```js
element.dataset.userName
```

Similarly:

```html
<img data-src="image.jpg">
```

JavaScript:

```js
img.dataset.src
```

So `dataset` ek convenient way hai HTML ke `data-*` attributes ko JavaScript se access karne ka.

---

# 17. Ab `img.src = img.dataset.src`

Ye line actual magic karti hai:

```js
img.src = img.dataset.src;
```

Suppose HTML mein:

```html
<img data-src="image.jpg">
```

Then:

```js
img.dataset.src
```

gives:

```text
image.jpg
```

So:

```js
img.src = img.dataset.src;
```

effectively becomes:

```js
img.src = "image.jpg";
```

Now browser ko finally actual `src` mil gaya.

Then:

```text
data-src
   ↓
JavaScript reads it
   ↓
src mein put karta hai
   ↓
Browser image load karta hai
```

This is the actual lazy-loading mechanism.

---

# 18. Complete Lazy Loading Flow

Ab poora concept connect karo:

```text
HTML loads
    ↓
<img data-src="image.jpg">
    ↓
No real src
    ↓
Browser image download nahi karta
    ↓
IntersectionObserver image ko observe karta hai
    ↓
User scroll karta hai
    ↓
Image viewport mein aati hai
    ↓
entry.isIntersecting = true
    ↓
entry.target = actual image
    ↓
img.dataset.src = "image.jpg"
    ↓
img.src = img.dataset.src
    ↓
img.src = "image.jpg"
    ↓
Browser image download karta hai
    ↓
Image display hoti hai
```

That's lazy loading.

---

# 19. `classList.add("loaded")`

Next line:

```js
img.classList.add("loaded");
```

Yahan `classList` ka concept hai.

`classList` element ki CSS classes ko manipulate karne ka API hai.

Suppose HTML:

```html
<img class="lazy-img">
```

JavaScript:

```js
img.classList.add("loaded");
```

ke baad:

```html
<img class="lazy-img loaded">
```

ho jayega.

So JavaScript dynamically ek class add kar raha hai.

---

# 20. `loaded` class ka purpose kya hai?

Tumhari current CSS mein agar:

```css
.loaded {
    /* some styling */
}
```

nahi hai, to visually kuch change nahi hoga.

But conceptually ye class useful hai.

For example:

```css
.lazy-img {
    opacity: 0;
}

.lazy-img.loaded {
    opacity: 1;
    transition: opacity 0.5s;
}
```

Then:

```text
Image initially
opacity = 0
        ↓
Image loads
        ↓
loaded class added
        ↓
opacity = 1
        ↓
Fade-in effect
```

So `loaded` class basically ek **state indicator** hai:

> "Ye image ab load ho chuki hai."

---

# 21. `observer.unobserve(img)`

Last important line:

```js
observer.unobserve(img);
```

Observer currently image ko monitor kar raha hai:

```text
Observer
   ↓
Image
   ↓
Monitor intersection
```

Image viewport mein aa gayi.

Hum:

```js
img.src = img.dataset.src;
```

kar chuke hain.

Image load karne ka kaam complete ho gaya.

Ab humein is image ko dobara observe karne ki zarurat nahi.

So:

```js
observer.unobserve(img);
```

means:

> "Is image ko observation se remove kar do."

---

# 22. `observe()` vs `unobserve()`

Hum neeche likhte hain:

```js
observer.observe(img);
```

Meaning:

> "Is image ko observe karo."

Aur:

```js
observer.unobserve(img);
```

Meaning:

> "Is image ko observe karna band karo."

So:

```text
observe()
   ↓
Start monitoring


unobserve()
   ↓
Stop monitoring
```

---

# 23. Ab `root` samjho

Observer ke options mein:

```js
{
    root: null,
    threshold: 0.1
}
```

`root` define karta hai:

> "Kis area ke reference mein intersection calculate karna hai?"

Humne:

```js
root: null
```

likha hai.

`null` ka matlab hai:

> **Browser viewport ko root maana jaayega.**

So hum basically pooch rahe hain:

```text
"Kya image browser ke visible viewport ke andar aa gayi?"
```

For lazy loading, ye exactly wahi hai jo humein chahiye.

---

# 24. `threshold: 0.1`

Ye bhi important concept hai.

```js
threshold: 0.1
```

Threshold define karta hai:

> **Observed element ka kitna portion intersect hone par callback trigger ho sakta hai.**

`0.1` means approximately:

```text
10%
```

So jab image ka around 10% portion root/viewport ke saath intersect karta hai, observer relevant callback de sakta hai.

Imagine image:

```text
┌──────────────┐
│              │
│              │
│              │
│              │
│              │
└──────────────┘
```

Agar sirf 10% image viewport mein enter karti hai:

```text
┌──────────────┐
│              │
│              │
├──────────────┤ ← viewport boundary
│  10% image   │
└──────────────┘
```

Threshold:

```js
0.1
```

means approximately 10% intersection threshold.

---

# 25. Threshold ke Different Values

### `threshold: 0`

Element ka smallest intersection bhi enough ho sakta hai.

### `threshold: 0.1`

Around 10% intersection.

### `threshold: 0.5`

Around 50% intersection.

### `threshold: 1`

Element ka 100% intersection.

For lazy loading, usually humein image ka completely visible hona wait nahi karna hota.

We want it to start loading when it is approaching/entering the viewport.

---

# 26. `imgs.forEach()`

Ab final part:

```js
imgs.forEach(function(img) {
    observer.observe(img);
});
```

Earlier:

```js
let imgs = document.querySelectorAll("img");
```

se humein multiple images milti hain.

Conceptually:

```text
imgs
 ↓
img1
img2
img3
```

`forEach()` har image ke liye function execute karega.

So:

```js
observer.observe(img);
```

har image ke liye chalega.

Result:

```text
Image 1 → observe
Image 2 → observe
Image 3 → observe
```

---

# 27. `querySelectorAll("img")`

Tumne:

```js
let imgs = document.querySelectorAll("img");
```

likha hai.

`querySelectorAll()` matching **multiple elements** select kar sakta hai.

Tumhare HTML mein:

```html
<img>
<img>
<img>
```

hain.

So:

```js
document.querySelectorAll("img");
```

in teeno ko select karega.

Important difference:

```js
document.querySelector("img")
```

→ first matching image.

```js
document.querySelectorAll("img")
```

→ all matching images.

Isi wajah se hum `forEach()` use kar sakte hain.

---

# 28. Complete Code — Ab Har Line Ka Meaning

```js
let imgs = document.querySelectorAll("img");
```

**All images select karo.**

```js
const observer = new IntersectionObserver(function(entries, observer){
```

**Ek Intersection Observer banao jo intersection hone par callback function execute kare.**

```js
entries.forEach(function(entry) {
```

**Observer se milne wali har intersection entry ko process karo.**

```js
if(entry.isIntersecting){
```

**Check karo ki element viewport/root ke saath intersect kar raha hai ya nahi.**

```js
const img = entry.target;
```

**Us intersection entry se actual `<img>` element nikalo.**

```js
img.src = img.dataset.src;
```

**HTML ke `data-src` mein stored URL ko actual `src` mein daal do, taaki browser image load kare.**

```js
img.classList.add("loaded");
```

**Image ko `loaded` CSS class de do.**

```js
observer.unobserve(img);
```

**Image load trigger ho chuki hai, ab ise observe karna band kar do.**

```js
root: null
```

**Browser viewport ko root/reference area use karo.**

```js
threshold: 0.1
```

**Approximately 10% intersection threshold use karo.**

```js
imgs.forEach(function(img) {
```

**Har selected image ke liye ye function chalao.**

```js
observer.observe(img);
```

**Har image ko Intersection Observer se observe karna start karo.**

---

# 29. Final Mental Model

Is poore code ko ratne ki zarurat nahi hai. Bas ye architecture samajh lo:

```text
                LAZY LOADING
                     │
                     ▼
        ┌─────────────────────────┐
        │ HTML: data-src          │
        │ Image URL temporarily    │
        │ stored here              │
        └────────────┬────────────┘
                     │
                     ▼
        IntersectionObserver
                     │
                     ▼
          Image viewport mein?
                /          \
              NO            YES
              │              │
              │              ▼
              │       entry.target
              │              │
              │              ▼
              │      img.dataset.src
              │              │
              │              ▼
              │         img.src =
              │       img.dataset.src
              │              │
              │              ▼
              │       Browser loads
              │           image
              │              │
              │              ▼
              │       loaded class
              │              │
              │              ▼
              │      observer.unobserve
              │
              └────── Keep observing
```

### The three concepts you should especially remember

**1. `IntersectionObserver`**

> "Mujhe batao jab ye element viewport ke andar aaye."

**2. `data-src`**

> "Image URL ko abhi browser ke actual `src` ke roop mein mat do. Bas temporarily store karke rakho."

**3. `img.src = img.dataset.src`**

> "Ab image ki zarurat pad gayi hai. Stored URL ko actual `src` bana do, ab browser image load karega."

And that is the entire idea behind **lazy loading using Intersection Observer**.
