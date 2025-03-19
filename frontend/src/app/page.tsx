// pages/index.js
"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center p-6">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" // Dark-themed Unsplash image
          alt="Background"
          
          className="opacity-30"
        />
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative bg-[#1A1A1A] rounded-2xl shadow-2xl p-8 max-w-md w-full border border-[#333333]"
      >
        {/* Heading */}
        <h1 className="text-4xl font-bold text-center text-white mb-4">
          Welcome to <span className="text-purple-500">GuessMaster</span>
        </h1>
        <p className="text-center text-[#A3A3A3] mb-8">
          Join a room, guess the word, and win big!
        </p>

        {/* Join Room Form */}
        <form className="space-y-6">
          <div>
            <label htmlFor="roomId" className="block text-sm font-medium text-[#A3A3A3]">
              Room ID
            </label>
            <input
              type="text"
              id="roomId"
              placeholder="Enter Room ID"
              className="mt-1 block w-full px-4 py-2 bg-[#333333] border border-[#444444] rounded-lg text-white placeholder-[#666666] focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div>
            <label htmlFor="playerName" className="block text-sm font-medium text-[#A3A3A3]">
              Your Name
            </label>
            <input
              type="text"
              id="playerName"
              placeholder="Enter Your Name"
              className="mt-1 block w-full px-4 py-2 bg-[#333333] border border-[#444444] rounded-lg text-white placeholder-[#666666] focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            Join Room
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-[#A3A3A3] mt-6 text-sm">
          Don't have a room?{" "}
          <a href="#" className="text-purple-500 hover:underline">
            Create one
          </a>
        </p>
      </motion.div>
    </div>
  );
}