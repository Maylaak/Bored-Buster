document.addEventListener("DOMContentLoaded", function() {
    const userMessageInput = document.getElementById("user-message");
    const sendButton = document.getElementById("send-button");
    const messageHistory = document.getElementById("message-history");

    // Load past messages from local storage and display them
    function displayPastMessages() {
        const messages = JSON.parse(localStorage.getItem("messages")) || [];
        messageHistory.innerHTML = messages.map(message => `<div class="message">${message}</div>`).join("");
    }

    // Save a new message to local storage and display it
    function saveAndDisplayMessage(message) {
        const messages = JSON.parse(localStorage.getItem("messages")) || [];
        messages.push(message);
        localStorage.setItem("messages", JSON.stringify(messages));
        displayPastMessages();
    }

    // Send user message and get a response
    sendButton.addEventListener("click", async function() {
        const userMessage = userMessageInput.value;
        if (userMessage) {
            saveAndDisplayMessage(`You: ${userMessage}`);
            
            // Fetch a response from the Bored API
            const response = await fetch("https://www.boredapi.com/api/activity");
            const responseData = await response.json();
            const responseMessage = responseData.activity;

            saveAndDisplayMessage(`Bored Bot: ${responseMessage}`);

            userMessageInput.value = "";
        }
    });

    // Display past messages on page load
    displayPastMessages();
});
