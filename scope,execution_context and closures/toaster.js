

function createToaster(config) {

    return function (message) {

        // Create a new toast element
        const div = document.createElement("div");

        // Set the message
        div.textContent = message;

        // Apply theme-based styling
        div.className = `inline-block px-6 py-3 rounded shadow-lg pointer-events-none ${
            config.theme === "dark"
                ? "bg-gray-800 text-white"
                : "bg-gray-200 text-black"
        }`;

        // Find the parent container
        const parent = document.querySelector(".parent");

        // Add the toast to the page
        parent.appendChild(div);

        // Remove the toast after the specified duration
        setTimeout(() => {
            parent.removeChild(div);
        }, config.duration * 1000);
    };
}

// Create a toaster instance
const toaster = createToaster({
    positionX: "right",
    positionY: "top",
    theme: "dark",
    duration: 3,
});

// Display the first notification
toaster("Download Done");

// Display another notification after 2 seconds
setTimeout(() => {
    toaster("Shivam Accepted Your Request");
}, 2000);