//Make connection
var socket = io.connect('http://localhost:4000');

//Query DOM
let message = document.getElementById('message');
let handle = document.getElementById('handle');
let btn = document.getElementById('send');
let output = document.getElementById('output');
let feedback = document.getElementById('feedback');
let codewindow = document.getElementById('code-window');


//Chat Event
btn.addEventListener('click', (e)=>{
  socket.emit('chat', {
    message: message.value,
    handle: handle.value
  })
})

socket.on('chat', (data)=>{
  feedback.innerHTML = "";
  output.innerHTML += '<p><strong>' + data.handle + ':</strong> ' + data.message + '</p>'
})

//Typing Event
message.addEventListener('keypress', ()=>{
  socket.emit('typing', handle.value);
})

socket.on('typing', (data)=>{
  feedback.innerHTML = '<p><em>' + data + 'is typing message...</em></p>'
})

//Edit Event
codewindow.addEventListener('keyup', (e)=>{
  socket.emit('edit', codewindow.value);
})

socket.on('edit', (data)=>{
  codewindow.value = data;
})
