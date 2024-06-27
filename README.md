# Chat Application

## Overview
This is a simple chat application built with Node.js, Express, WebSocket (ws), and SQLite. It allows users to register, login, and communicate in real-time via WebSocket.

## Features
- **User Registration**: Allows new users to register with a username, password, and optional email.
- **User Login**: Existing users can log in securely using their credentials.
- **Real-time Messaging**: Enables users to send and receive messages in real-time through WebSocket.
- **SQLite Database**: Stores user credentials and chat messages persistently using SQLite.

## Technologies Used
- **Frontend**: HTML, CSS, JavaScript (Vanilla)
- **Backend**: Node.js, Express.js, WebSocket (ws), SQLite
- **Deployment**: Heroku (or Vercel for frontend)

## Project Structure
chat-app/
├── models/
│   └── user.js
├── routes/
│   └── userRoutes.js
├── public/
│   ├── index.html
│   ├── script.js
│   └── styles.css
├── data/
│   └── chat.db
├── server.js
└── package.json

## Functionality

- **User Authentication**: Users can register with a username, password, and optional email. Login is required to access the chat.
- **Real-time Chat**: Messages are sent and received using WebSockets, allowing for instant communication.
- **SQLite Database**: Stores user information and chat messages locally using SQLite.

## Setup

### Prerequisites

- Node.js installed on your machine
- SQLite database setup (already included in `data/chat.db`)
  
### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd chat-app
2. Install dependencies:

   ```bash
   npm install
### Running the Application

1. Start the server:
   ```bash
   node server.js
This will start the server at http://localhost:3000.

4. **Access the Application:**
Open your web browser and go to http://localhost:3000 to access the chat application.

## API Endpoints
- **POST /users/register**: Register a new user.
- **POST /users/login**: Log in an existing user.


## Notes
- This project uses SQLite for simplicity. For production, consider using a more scalable database like PostgreSQL.
- Ensure that environment variables such as database credentials and session secrets are securely managed in production.


   


