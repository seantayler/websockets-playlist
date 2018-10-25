var express = require('express');
var socket = require('socket.io');
var port = process.env.PORT || 4000; 

//App Setup

var app = express();
var server = app.listen(port, function(){
  console.log('listening to port 4000')
})

//Static Files
app.use(express.static('public'))

//Socket Setup
var io = socket(server);

io.on('connection', function(socket){
  console.log('made socket connection', socket.id)

  //Handle Chat Event
  socket.on('chat', function(data){
    io.sockets.emit('chat', data)
  })

  socket.on('typing', (data)=>{
    socket.broadcast.emit('typing', data)
  })

  socket.on('edit', (data)=>{
    socket.broadcast.emit('edit', data)
  })

})
