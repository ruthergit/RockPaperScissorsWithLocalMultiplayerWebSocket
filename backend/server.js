const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

let players = {};
let choices = {};
let scores = { player1: 0, player2: 0 };

io.on('connection', (socket) => {
  console.log(`Player connected: ${socket.id}`);

  socket.on('joinGame', (name) => {
    if (Object.keys(players).length < 2) {
      const role = Object.keys(players).length === 0 ? 'player1' : 'player2';
      players[socket.id] = { name, role };
      socket.emit('playerAssigned', role);

      if (Object.keys(players).length === 2) {
        io.emit('gameStart', Object.values(players).map((p) => p.name));
      }
    } else {
      socket.emit('gameFull');
    }
  });

  socket.on('playerChoice', ({ choice }) => {
    choices[socket.id] = choice;

    if (Object.keys(choices).length === 2) {
      const [p1, p2] = Object.keys(players);
      const result = determineWinner(choices[p1], choices[p2]);

      if (result === 'Player 1 Wins') scores.player1++;
      if (result === 'Player 2 Wins') scores.player2++;

      io.emit('roundResult', {
        result,
        choices,
        scores,
      });

      choices = {};
    }
  });

  socket.on('readyForNewRound', () => {
    io.emit('gameStart', Object.values(players).map((p) => p.name));
  });

  socket.on('disconnect', () => {
    console.log(`Player disconnected: ${socket.id}`);
    delete players[socket.id];
    choices = {};
    scores = { player1: 0, player2: 0 };
    io.emit('playerDisconnected');
  });
});

const determineWinner = (choice1, choice2) => {
  if (choice1 === choice2) return 'Draw';
  if (
    (choice1 === 'Rock' && choice2 === 'Scissors') ||
    (choice1 === 'Paper' && choice2 === 'Rock') ||
    (choice1 === 'Scissors' && choice2 === 'Paper')
  ) {
    return 'Player 1 Wins';
  }
  return 'Player 2 Wins';
};

server.listen(4000, () => {
  console.log('Server running on http://localhost:4000');
});
