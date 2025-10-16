const socket = io('http://localhost:3000');
const currentUser = 'Ziba';

function sendMessage() {
  const messageInput = document.getElementById('input-message');
  const message = messageInput.value.trim();
  console.log('Trying to send message:', message);
  if (message) {
    socket.emit('chatMessage', { sender: currentUser, text: message });
    messageInput.value = '';
  }
}

socket.on('chatMessage', (message) => {
  const messages = document.getElementById('messages');
  const messageDiv = document.createElement('div');

  messageDiv.textContent = message.text || message;

  messageDiv.classList.add(
    message.sender === currentUser ? 'own-message' : 'others-message'
  );

  messages.appendChild(messageDiv);
  messages.scrollTop = messages.scrollHeight;
});


const sendButton = document.getElementById('send-button');
const input = document.getElementById('input-message');

sendButton.addEventListener('click', sendMessage);
input.addEventListener('keypress', e => {
  if (e.key === 'Enter') sendMessage();
});
