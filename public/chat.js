const socket = io('http://localhost:3000');

socket.on('', (messages) => {
  updateMessagesOnScreen(messages);
});

const updateMessagesOnScreen = (msg) => {
  const div_messages = document.querySelector("#messages");

  let list_messages = '<ul>';

  messages.forEach();
}