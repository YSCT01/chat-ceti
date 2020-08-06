//Connection to the socket
var socket = io.connect('localhost:5000', { 'forceNew': true });

var date = new Date();
var time = date.toString();

var user = prompt("Enter your nickname: ");

//Conexión al servidor y recibir mensajes
socket.on('messages', function(data) {
    render(data);
});

//Recibir mensajes y mostrar
function render(data) {
    //ForEach
    var html = data.map(function(object, index) {
        return (`
            <div class="message">
            <strong>${object.username} : </strong> 
            <p>${object.message} <br> <br> ${object.date}  </p>
            </div>
        `);
    }).join("  ");

    var div_msg = document.getElementById("content");
    div_msg.innerHTML = html;
    div_msg.scrollTop = div_msg.scrollHeight;
}

function addMessage(event) {
    var message = {
        username: this.user,
        message: document.getElementById("msj").value,
        date: this.time,
    }
    socket.emit('addMessage', message);
    event.reset();
    return false;
}