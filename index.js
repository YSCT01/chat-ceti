//Importar modulos de express
const express = require('express');
//Asignar función de express a variable
var app = express();
//Cargar servidor con método http de la función de express
var server = require('http').Server(app);
//Importar modulos de socket.io junto a servidor
var io = require('socket.io')(server);

//Usar app con función de express
app.use(express.static('client'));

//Crear puerto
var PORT = process.env.PORT || 5000;

var date = new Date();
var time = date.toString();

//Objeto que carge los mensajes(En lugar de constructor)
var messages = [{
    id: "1",
    username: 'BOT',
    message: 'Chat initialized',
    date: date
}];

server.listen(PORT, function() {
    console.log("The server functions in server: " + PORT);
    //emitir mensaje

});

io.on('connection', function(socket) {
    console.log("IP" + socket.handshake.address + "connected");
    socket.emit("messages", messages);
    socket.emit('messages', messages);
    //recibir mensaje
    socket.on('addMessage', function(data) {
        messages.push(data);
        io.sockets.emit('messages', messages);
    });

});