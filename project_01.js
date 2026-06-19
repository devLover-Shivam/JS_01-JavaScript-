const users = [
  {
    name: "Amisha Rathore",
    pic: "https://i.pinimg.com/736x/43/89/ad/4389ad7f3d3be19ed3efb1abc32385e1.jpg",
    bio: "pretty face, savage mind 💋✨ | not here to impress anyone"
  },
  {
    name: "Kiara Malhotra",
    pic: "https://i.pinimg.com/736x/e7/83/6d/e7836da9ae4115b8098496ce1d743875.jpg",
    bio: "too glam to give a damn 💅🔥"
  },
  {
    name: "Ayesha Kapoor",
    pic: "https://i.pinimg.com/736x/e4/ae/21/e4ae2177891b051a5c76eba788f9e01c.jpg",
    bio: "main character energy 🎀👑 | stay mad, i'm thriving"
  },
  {
    name: "Riya Sethi",
    pic: "https://i.pinimg.com/736x/75/55/06/755506f6147cbaffd7ba59d33476c3ec.jpg",
    bio: "soft heart, sharp tongue 🖤🥀"
  },
  {
    name: "Ananya Mehra",
    pic: "https://i.pinimg.com/736x/f1/12/4a/f1124a3c656d256a7b288061a8a5da71.jpg",
    bio: "born to stand out, never to fit in ✨😌"
  },
  {
    name: "Tanya Arora",
    pic: "https://i.pinimg.com/736x/fa/11/6e/fa116e6f7c90ae6b033a3b812a1ed5ce.jpg",
    bio: "expensive taste, free advice 💸😉"
  },
  {
    name: "Myra Khanna",
    pic: "https://i.pinimg.com/736x/70/d9/b1/70d9b1e2b3e101fe42a2d62b062b9d65.jpg",
    bio: "collecting memories, not opinions 🦋💖"
  }
];

//first we need to show all the users
//showUsers function me arr pass karenge aur har ek user k liye ek naya function chalege through forEach.
function showUsers(arr){
    arr.forEach(function(user) {
        // Main container
        const cardContainer = document.querySelector(".flex.gap-10");

        // Card
        const card = document.createElement("div");
        card.classList.add("card");

        // Image
        const img = document.createElement("img");
        img.src =
        user.pic;
        img.classList.add("bg-img");

        // Blurred Layer
        const blurredLayer = document.createElement("div");
        blurredLayer.style.backgroundImage = `url(${user.pic})`;
        blurredLayer.classList.add("blurred-layer");

        // Content
        const content = document.createElement("div");
        content.classList.add("content");

        // Heading
        const heading = document.createElement("h3");
        heading.textContent = user.name;

        // Paragraph
        const para = document.createElement("p");
        para.textContent = user.bio;

        // Build Structure
        content.appendChild(heading);
        content.appendChild(para);

        card.appendChild(img);
        card.appendChild(blurredLayer);
        card.appendChild(content);
       
       document.querySelector(".cards").appendChild(card) ;
    });
}
showUsers(users);
//second - filter karna har baar input karne par
let inp = document.querySelector(".inp");
inp.addEventListener("input",function(){
    /* filter actually me andar jo bhi element match kar jaaega input value se usme true return kar dega aur wo value fir pass ho jaaega newUsers variable me */
    let newUsers = users.filter((user) => {
        return user.name.toLowerCase().includes(inp.value.toLowerCase());
    });
    console.log(newUsers);
    document.querySelector(".cards").innerHTML = "";
    showUsers(newUsers);
})

//third- show karna filtered users

//new changes :- no users found message if the user is not found, and highlighted search text functionality