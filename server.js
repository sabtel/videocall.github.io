const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static('public'));

io.on('connection', socket => {
    console.log('A user connected');

    socket.on('offer', data => {
        socket.broadcast.emit('offer', data);
    });

    socket.on('answer', data => {
        socket.broadcast.emit('answer', data);
    });

    socket.on('candidate', data => {
        socket.broadcast.emit('candidate', data);
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(Server is running on port ${PORT});
});