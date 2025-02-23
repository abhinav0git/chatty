const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // Your Vite frontend URL
    methods: ["GET", "POST"],
    credentials: true,
  },
});

const users = new Set();

io.on("connection", (socket) => {
  console.log("Client connected");

  socket.on("join", ({ username }) => {
    users.add(username);
    console.log(`${username} joined`);
    socket.username = username;

    socket.emit("welcome", {
      user: "Admin",
      text: `Welcome ${username}!`,
    });

    io.emit("roomData", {
      users: Array.from(users),
    });
  });

  socket.on("sendMessage", ({ message, user }) => {
    console.log(`${user}: ${message}`);
    io.emit("message", { user, text: message });
  });

  socket.on("disconnect", () => {
    if (socket.username) {
      users.delete(socket.username);
      io.emit("roomData", {
        users: Array.from(users),
      });
    }
    console.log("Client disconnected");
  });
});

const PORT = 3001;
server.listen(PORT, () => {
  console.log(`Socket.IO server running on http://localhost:${PORT}`);
});
