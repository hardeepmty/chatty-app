const express = require('express');
const app = express();


const http = require('http');
const server = http.createServer(app);


const io = require('socket.io')(server, {
  cors: {
    origin: "*",
  }
})

io.on("connection",(socket) => {       
  console.log("What is socket: ",socket) ;
  console.log("Socket is active to be connected") ;

  socket.on("chat", (payload) => {        //listening the event
    console.log("What is payload", payload) ;
    io.emit("chat", payload)              //responding to the event
  });

})

// app.listen(5000, () => console.log("Server is active!!!")) ;
server.listen(5000, () => console.log("Server is active at port 5000!!!")) ;
