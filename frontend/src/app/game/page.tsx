// pages/game.js
"use client";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { motion } from "framer-motion";
import Image from "next/image";

const socket = io("http://localhost:3001");

export default function GamePage() {
  const [room, setRoom] = useState(null);
  const [guess, setGuess] = useState("");
  const [hints, setHints] = useState([]);
  const [timeLeft, setTimeLeft] = useState(60); // 60 seconds timer

  useEffect(() => {
    socket.on("updateRoom", (room) => {
      setRoom(room);
    });

    // Start game with hints
    socket.on("gameStarted", ({ word, hints }) => {
      setHints(hints);
      setTimeLeft(60); // Reset timer
    });

    // Handle correct guess
    socket.on("correctGuess", ({ playerId, word }) => {
      alert(`${room.players[playerId].name} guessed the word: ${word}`);
    });

    // Timer countdown
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const submitGuess = () => {
    socket.emit("submitGuess", room.id, guess, socket.id);
    setGuess("");
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex">
      {/* Sidebar */}
      <motion.div
        initial={{ x: -100 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.5 }}
        className="w-64 bg-[#1A1A1A] p-6 border-r border-[#333333]"
      >
        <h2 className="text-xl font-bold text-white mb-6">Players</h2>
        <ul className="space-y-4">
          {room &&
            Object.entries(room.players).map(([playerId, player]) => (
              <li key={playerId} className="flex items-center">
                <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                  {player.name[0]}
                </div>
                <div className="ml-3">
                  <p className="text-white">{player.name}</p>
                  <p className="text-[#A3A3A3] text-sm">{player.score} pts</p>
                </div>
              </li>
            ))}
        </ul>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-8">
        {/* Timer */}
        <div className="text-white text-2xl font-bold mb-8">
          Time Left: {timeLeft}s
        </div>

        {/* Hints */}
        <div className="bg-[#1A1A1A] p-6 rounded-lg shadow-lg w-full max-w-2xl mb-8">
          <h3 className="text-lg font-bold text-white mb-4">Hints</h3>
          <ul className="space-y-2">
            {hints.map((hint, index) => (
              <li key={index} className="text-[#A3A3A3]">
                {hint}
              </li>
            ))}
          </ul>
        </div>

        {/* Guess Input */}
        <div className="w-full max-w-2xl">
          <input
            type="text"
            placeholder="Enter your guess"
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
            className="w-full px-4 py-2 bg-[#333333] border border-[#444444] rounded-lg text-white placeholder-[#666666] focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button
            onClick={submitGuess}
            className="w-full mt-4 bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            Submit Guess
          </button>
        </div>
      </div>
    </div>
  );
}