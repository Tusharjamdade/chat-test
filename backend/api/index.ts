import express from 'express';
import { Server } from 'socket.io';
import http from 'http';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        credentials: true,
        methods: ["GET", "POST"]
    }
});

io.on('connection', (socket) => {
    console.log('connected', socket.id);

    socket.on("click", (msg) => {
        console.log(msg)
        io.emit("msg", msg);
    });

    // Example of handling disconnect event
    socket.on('disconnect', (socket) => {
        console.log('Client disconnected',socket);
    });
});

const PORT =  3002;

server.listen(PORT, () => {
    console.log(`Server ready on port ${PORT}.`);
});

// Export the app instance if needed
export default app;
