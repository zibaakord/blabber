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

const members = document.getElementById('members');

socket.on('userConnected', (user) => {
  const userDiv = document.createElement('div');
  userDiv.classList.add('members-profile');

  const profPic = document.createElement('img');
  profPic.classList.add('profile-picture');
  profPic.src = user.profilePic || 'default.png';

  const infoDiv = document.createElement('div');

  const userName = document.createElement('p');
  userName.classList.add('user-name');
  userName.textContent = user.name;

  const userLastSeen = document.createElement('p');
  userLastSeen.classList.add('user-lastseen');
  userLastSeen.textContent = 'Online';

  infoDiv.appendChild(userName);
  infoDiv.appendChild(userLastSeen);

  userDiv.appendChild(profPic);
  userDiv.appendChild(infoDiv);

  members.appendChild(userDiv);
  members.scrollTop = members.scrollHeight;
});

