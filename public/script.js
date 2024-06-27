const socket = new WebSocket('ws://localhost:3000');

socket.onopen = () => {
  console.log('WebSocket connected');
};

socket.onmessage = (event) => {
  const data = JSON.parse(event.data);
  const { username, content, timestamp } = data;
  const messages = document.getElementById('messages');
  const message = document.createElement('div');
  message.className = 'message';
  message.innerHTML = `<strong>${timestamp} - ${username}:</strong> ${content}`;
  messages.appendChild(message);
  messages.scrollTop = messages.scrollHeight;
};

function sendMessage() {
  const username = document.getElementById('usernameInput').value;
  const messageInput = document.getElementById('messageInput');
  const message = messageInput.value.trim();
  if (message !== '') {
    const payload = JSON.stringify({ username, content: message });
    socket.send(payload);
    messageInput.value = '';
  }
}

function login() {
  const username = document.getElementById('usernameInput').value;
  const password = document.getElementById('passwordInput').value;
  fetch('/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Login failed');
      }
      console.log('Login successful');
      document.getElementById('chatInput').style.display = 'flex';
      document.getElementById('userInput').style.display = 'none';
      showNotification('Login Successful');
    })
    .catch((error) => {
      console.error('Login error:', error);
    });
}

function register() {
  const username = document.getElementById('usernameInput').value;
  const password = document.getElementById('passwordInput').value;
  const email = document.getElementById('emailInput').value;
  fetch('/users/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password, email }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Registration failed');
      }
      console.log('Registration successful');
      showNotification('Successfully registered');
    })
    .catch((error) => {
      console.error('Registration error:', error);
    });
}

function logout() {
  socket.close();
  document.getElementById('chatInput').style.display = 'none';
  document.getElementById('userInput').style.display = 'flex';
  document.getElementById('messages').innerHTML = '';
  document.getElementById('usernameInput').value = '';
  document.getElementById('passwordInput').value = '';
  document.getElementById('emailInput').value = '';
  console.log('Logged out');
  showNotification('Logout Successful');
}

function showNotification(message) {
  const notification = document.getElementById('notification');
  notification.textContent = message;
  notification.classList.add('show');
  setTimeout(() => {
    notification.classList.remove('show');
  }, 3000);
}
