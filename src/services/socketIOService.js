import Service from './service.js';

class SocketServices {
  //connection socket
  async connection(socket) {
    socket.on('disconnect', () => {
      console.log(`User disconnect id is: ${socket.id}`)
    })
    //event on here

    socket.on('chat message', (msg) => {
      _io.emit('chat message', msg);
    })
  }
}

export default new SocketServices();