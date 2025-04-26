import app from "./app.js";
import {Server} from "socket.io";
import http from 'http';

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*'
    }
});

io.on('connection', (socket) => {
    socket.on('disconnect', () => {
    });
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

export { io };
