const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, application/json');
    res.setHeader('Access-Control-Request-Method', 'POST');
    next();
});

const server = app.listen(3000);

const allUsers = [];

const io = require('./socket').init(server);
io.on('connection', socket => {
    console.log(`${socket.id} CONNECTED`);
    let aloneUsers = allUsers.find(user => user.pair === null);
    console.log(aloneUsers);
    socket.on('joinqueue', data => {
        if(allUsers.find(user => user.pair == null)) {
            allUsers.push({ userid: socket.id, pair: null, nickname: data });
            console.log('USERS FOUND');
            if(aloneUsers.userid) {
                io.emit(aloneUsers.userid, { socketid: socket.id, message: 'JOINED!', sender: 'SOMEONE' });
                io.emit(socket.id, { socketid: aloneUsers.userid, message: 'JOINED!', sender: 'SOMEONE' });
                allUsers.find(user => user.userid == aloneUsers.userid).pair = socket.id;
                allUsers.find(user => user.userid == socket.id).pair = aloneUsers.userid;
            }
        } else {
            allUsers.push({ userid: socket.id, pair: null, nickname: data });
            console.log('NO USERS FOUND');
        }
    });

    socket.on('message', data => {
        io.emit(data.pairId, { message: data.message, sender: data.sender, socketid: socket.id });
    });

    socket.on('disconnect', () => {
        allUsers.splice(allUsers.findIndex(user => user.userid == socket.id), 1);
        console.log(`${allUsers}`);
        console.log(`${socket.id} disconnected`);
    });
});

