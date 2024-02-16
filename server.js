const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const PORT = 3001;

// Tablica przechowująca promienie
let radii = [];

// Obsługa połączenia klienta
io.on('connection', socket => {
  console.log('Nowy klient połączony');

  // Obsługa otrzymywania geolokalizacji od klienta
  socket.on('userGeolocation', userGeolocation => {
    // Tutaj możesz przetworzyć otrzymaną geolokalizację
    // i dodać nowy promień do tablicy radii
    radii.push(userGeolocation);

    // Aktualizuj wszystkich klientów z nowymi promieniami
    io.emit('radiiUpdate', radii);
  });

  // Obsługa rozłączenia klienta
  socket.on('disconnect', () => {
    console.log('Klient rozłączony');
  });
});

// Uruchomienie serwera
server.listen(PORT, () => {
  console.log(`Serwer działa na porcie ${PORT}`);
});