/* =========================================
   KRISHIMITRA AI — CHATBOT
========================================= */

function initializeChatbot() {

  const chatbotToggle =
    document.getElementById("chatbotToggle");

  const chatbotWindow =
    document.getElementById("chatbotWindow");

  const chatbotClose =
    document.getElementById("chatbotClose");

  const sendBtn =
    document.getElementById("sendBtn");

  const chatInput =
    document.getElementById("chatInput");

  const chatbotBody =
    document.getElementById("chatbotBody");

  const typingIndicator =
    document.getElementById("typingIndicator");

  /* SAFETY CHECK */

  if (
    !chatbotToggle ||
    !chatbotWindow
  ) {

    console.log(
      "Chatbot elements missing"
    );

    return;
  }

  /* FORCE HIDDEN INITIALLY */

  chatbotWindow.classList.add(
    "hidden"
  );

  /* OPEN / CLOSE CHAT */

  chatbotToggle.onclick = () => {

    chatbotWindow.classList.toggle(
      "hidden"
    );
  };

  chatbotClose.onclick = () => {

    chatbotWindow.classList.add(
      "hidden"
    );
  };

  /* SEND MESSAGE */

  function sendMessage() {

    const message =
      chatInput.value.trim();

    if (!message) return;

    const userMessage =
      document.createElement("div");

    userMessage.className =
      "chat-message user-message";

    userMessage.innerHTML = `
      <div class="message-content">
        <p>${message}</p>
      </div>
    `;

    chatbotBody.appendChild(
      userMessage
    );

    chatInput.value = "";

    chatbotBody.scrollTop =
      chatbotBody.scrollHeight;

    typingIndicator.classList.remove(
      "hidden"
    );

    // Make real request to backend Gemini AI
    const contextData = window.recommendationData || {};

    fetch("http://localhost:5000/api/chatbot/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: message, context: contextData })
    })
    .then(response => response.json())
    .then(data => {
      typingIndicator.classList.add("hidden");

      const aiMessage = document.createElement("div");
      aiMessage.className = "chat-message ai-message";

      let replyText = "Sorry, I could not generate a response.";
      if (data.success && data.reply) {
        // Simple formatting to make Gemini output readable (convert newlines to <br>)
        replyText = data.reply.replace(/\n/g, "<br>");
      } else if (data.message) {
        replyText = "Error: " + data.message;
      }

      aiMessage.innerHTML = `
        <div class="message-avatar">
          🤖
        </div>
        <div class="message-content">
          <p>${replyText}</p>
        </div>
      `;

      chatbotBody.appendChild(aiMessage);
      chatbotBody.scrollTop = chatbotBody.scrollHeight;
    })
    .catch(error => {
      console.error("Chatbot Fetch Error:", error);
      typingIndicator.classList.add("hidden");
      
      const errorMessage = document.createElement("div");
      errorMessage.className = "chat-message ai-message";
      errorMessage.innerHTML = `
        <div class="message-avatar">🤖</div>
        <div class="message-content"><p>Sorry, my servers are currently unreachable.</p></div>
      `;
      chatbotBody.appendChild(errorMessage);
      chatbotBody.scrollTop = chatbotBody.scrollHeight;
    });
  }

  /* SEND BUTTON */

  sendBtn?.addEventListener(
    "click",
    sendMessage
  );

  /* ENTER KEY */

  chatInput?.addEventListener(
    "keypress",
    (e) => {

      if (e.key === "Enter") {

        sendMessage();
      }
    }
  );

  /* QUICK CHIPS */

  const chips =
    document.querySelectorAll(
      ".quick-chip"
    );

  chips.forEach((chip) => {

    chip.addEventListener(
      "click",
      () => {

        chatInput.value =
          chip.innerText;

        sendMessage();
      }
    );
  });
}