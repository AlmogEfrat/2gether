// const WebSocket = require("ws");

// const wss = new WebSocket.Server({ port: 8080 });

// wss.on("connection", (ws) => {
//   console.log("Client connected");

//   ws.on("message", (message) => {
//     console.log("Received:", message);
//     // Broadcast the message to all connected clients except the sender
//     wss.clients.forEach((client) => {
//       if (client !== ws && client.readyState === WebSocket.OPEN) {
//         client.send(message);
//       }
//     });
//   });

//   ws.on("close", () => {
//     console.log("Client disconnected");
//   });
// });

// console.log("WebSocket server running on port 8080");

const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 8080 });

const clients = new Set();

wss.on("connection", (ws) => {
  clients.add(ws);
  console.log("New client connected");

  ws.on("message", (message) => {
    console.log("Received:", message);

    // Broadcast the message to all other clients
    clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  ws.on("close", () => {
    clients.delete(ws);
    console.log("Client disconnected");
  });
});

console.log("WebSocket server is running on port 8080");
