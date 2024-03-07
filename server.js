import express from "express";
import http from "http";
// import places from './src/data/places.js';
import { Server as socketIoModule } from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new socketIoModule(server, {
  cors: {
    origin: "*",
  },
});

let places = [];
const PORT = 3001;

server.listen(PORT, () => {
  console.log(`Serwer działa na porcie ${PORT}`);
});

io.on("connection", (socket) => {
  console.log("Nowy klient połączony");

  socket.on("newPlace", (newPlace) => {
    console.log("Nowe miejsce:", newPlace);
    places.push({ id: socket.id, place: newPlace });
    //check if newPlace just exist
    io.emit(
      "placesData",
      places.map((place) => place.place)
    );
  });

  socket.on("getPlaces", () => {
    console.log("Zażądano miejsc");
    io.emit(
      "placesData",
      places.map((place) => place.place)
    );
  });

  socket.on("disconnect", () => {
    console.log("Klient rozłączony");
    places = places.filter((place) => place.id !== socket.id);
    io.emit(
      "placesData",
      places.map((place) => place.place)
    );
  });
});
