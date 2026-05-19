const token =
  localStorage.getItem("token");

if (!token) {

  window.location.href =
    "/login";

}

const conversationId =
  "global-chat";

const socket = io(
  "http://localhost:5000",
  {
    auth: {
      token,
    },
  }
);

const messagesDiv =
  document.getElementById(
    "messages"
  );

socket.on("connect", () => {

  socket.emit(
    "join_room",
    conversationId
  );

//   loadMessages();

});

socket.on(
  "receive_message",
  (message) => {

    addMessage(message);

  }
);

socket.on(
  "online_users",
  (users) => {

    document.getElementById(
      "onlineUsers"
    ).innerText =
      `Online Users: ${users.length}`;

  }
);

socket.on(
  "user_typing",
  (data) => {

    document.getElementById(
      "typing"
    ).innerText =
      `${data.user} is typing...`;

  }
);

socket.on(
  "user_stop_typing",
  () => {

    document.getElementById(
      "typing"
    ).innerText = "";

  }
);

// async function loadMessages() {

//   const response = await fetch(
//     `/api/messages/${conversationId}`,
//     {
//       headers: {
//         Authorization:
//           `Bearer ${token}`,
//       },
//     }
//   );

//   const messages =
//     await response.json();

//   messagesDiv.innerHTML = "";

//   messages.forEach(addMessage);

// }

function addMessage(message) {

  const div =
    document.createElement("div");

  div.classList.add("message");

  div.innerHTML = `
    <strong>
      ${message.sender?.name}
    </strong>
    <p>${message.content}</p>
  `;

  messagesDiv.appendChild(div);

}

function sendMessage() {

  const input =
    document.getElementById(
      "messageInput"
    );

  const content =
    input.value;

  if (!content.trim()) return;

  socket.emit(
    "send_message",
    {
      conversationId,
      content,
    }
  );

  input.value = "";

}

document
.getElementById("messageInput")
.addEventListener(
  "input",
  () => {

    socket.emit(
      "typing",
      conversationId
    );

    clearTimeout(
      window.typingTimeout
    );

    window.typingTimeout =
      setTimeout(() => {

        socket.emit(
          "stop_typing",
          conversationId
        );

      }, 1000);

  }
);

function logout() {

  localStorage.removeItem("token");

  window.location.href = "/login";

}