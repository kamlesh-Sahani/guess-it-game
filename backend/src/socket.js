import {Server} from "socket.io";
import generateWordAndHints from "./utils/gemini.js";
const socket  = (server,rooms)=>{
    const io  = new Server(server)


    io.on("connection",(socket)=>{

        console.log("User is connected",socket.id);

        // join the room
        socket.on("joinRoom",(roomId,playerName,topic)=>{
            socket.join(roomId);
            if(!rooms[roomId]){
                rooms[roomId] = {players:{},word,hints:[],topic};

            }

            rooms[roomId].players[socket.id] = {playerName,score:0};

            io.to(roomId).emit("updateRoom",rooms[roomId]);

        })


        // start the game;



        socket.on("startGame",async(roomId)=>{
            const topic = rooms[roomId].topic || "echnology, nature, sports, food, or movies or others"
            const  data = await generateWordAndHints(topic);
            console.log(data,"data")
            rooms[roomId].word=data.word;
            rooms[roomId].hints=data.hints;

            io.to(roomId).emit("gameStarted",{word,hints})

        })


        // submit the guesss 

        socket.on("submit",(roomId,guess,playerId,timeLeft)=>{

            const room = rooms[roomId];
            if(guess.toLowerCase()===room.word.toLowerCase()){

                const score = timeLeft<11 ?1 :timeLeft/10;
                room.players[playerId].score +=score;

                io.to(roomId).emit("updateRoom",room);


            }
        })




        socket.on("disconnet",()=>{
            console.log("socket diconnected",socket.id)
        })
    })
}


export default socket;