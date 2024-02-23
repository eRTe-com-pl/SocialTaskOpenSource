import express from 'express';
import http from 'http';
import places from './src/data/places.js';
import { Server as socketIoModule } from 'socket.io';

const app = express();
const server = http.createServer(app);
const io = new socketIoModule(server);

const PORT = 3000;

server.listen(PORT, () => {
  console.log(`Serwer działa na porcie ${PORT}`);
});

io.on('connection', socket => {
  console.log('Nowy klient połączony');

  socket.on('newPlace', newPlace => {
    places.push(newPlace);
    io.emit('placesData', placesData);
  });

  socket.on('disconnect', () => {
    console.log('Klient rozłączony');
  });
});
