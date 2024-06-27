const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const path = require('path');
const userRoutes = require('./routes/userRoutes');
const db = require('./models/user');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files from the 'public' directory
app.use('/users', userRoutes);

wss.on('connection', (ws) => {
  console.log('WebSocket connected');

  ws.on('message', async (message) => {
    console.log('Received:', message);

    const parsedMessage = JSON.parse(message);
    const { username, content } = parsedMessage;
    const timestamp = new Date().toLocaleTimeString();

    try {
      const user = await new Promise((resolve, reject) => {
        db.get('SELECT * FROM users WHERE username = ?', [username], (err, row) => {
          if (err) reject(err);
          resolve(row);
        });
      });

      if (user) {
        const broadcastMessage = JSON.stringify({ username, content, timestamp });
        console.log('Broadcasting:', broadcastMessage);

        wss.clients.forEach((client) => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(broadcastMessage);
          }
        });
      } else {
        console.error('User not found or unauthorized');
        ws.send(JSON.stringify({ error: 'Unauthorized' }));
      }
    } catch (error) {
      console.error('Error handling message:', error);
      ws.send(JSON.stringify({ error: 'Error processing message' }));
    }
  });

  ws.on('close', () => {
    console.log('WebSocket disconnected');
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
