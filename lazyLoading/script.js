let imgs = document.querySelectorAll("img");

const observer = new IntersectionObserver(function(entries,observer){
    entries.forEach(function(entry) {
        if(entry.isIntersecting){
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.add("loaded");
            observer.unobserve(img);
        }
    })
},{
    root: null,
    threshold: 0.2,
    }
);

imgs.forEach(function(img) {
    observer.observe(img);
});