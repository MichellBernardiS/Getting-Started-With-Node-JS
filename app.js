const exp = require('constants');
var express = require('express');
const router = require('./routes/route');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
var path = require('path');

//view engine setup
app.set('views', path.resolve('./views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(router);

var server = app.listen(3000, () => {
    console.log("Listening on port ", server.address().port);
});

const activeUsers = new Set();

io.on('connection', function(socket) {
    console.log('Made connection');

    socket.on("new user", function(data){
        socket.userId = data;
        activeUsers.add(data);
        io.emit("New user", [...activeUsers]);
    });

    socket.on("disconnect", () => {
        activeUsers.delete(socket.userId);
        io.emit("User disconnected", socket.userId);
    });
});

//make io accessible to another file
app.use(function(req, res, next){
    req.io = io;
    next();
});

module.exports = app;