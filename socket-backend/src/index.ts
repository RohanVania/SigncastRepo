import express from "express";
import http from "http";
import router from "../routes/testRoute";
import prismaConnection from "../config/prismaConnectionObject";
import { Server } from "socket.io";
import { exit } from "node:process";
import cors from "cors";
import { disconnect } from "process";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        credentials: true
    }
});

/**
 *  For handling Cors issues as react will send us the request.
 */
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use(express.json());

// Test API
app.get('/', (req, res) => {
    res.send("<h1>Hello World</h1>");
});

// Express Router
app.use("/api/", router);

io.on('connection', (socket) => {
    console.log("Some One Connected to this server", socket.id);

    // If someone joins a particular room
    socket.on('join-room', ({ fileId }) => {
        if (fileId) {
            socket.join(fileId);

            // Emit to all user except current in a room
            socket.to(fileId).emit('user-joined', { userId: socket.id });
        }
    });

    // Object is being moved
    socket.on('object:moving', (data) => {
        if (data.FileId) {
            // Emit the event to all other clients in the same room (FileId)
            socket.to(data.FileId).emit('object:moving-server', { userId: socket.id, event: data.event });
        }
    });

    // Object added to the canvas
    socket.on('object-added', (data) => {
        if (data.FileId) {
            // Broadcast the newly added object to other clients
            socket.to(data.FileId).emit('object:added-server', data);
        }
    });

    // If someone leaves a particular room event
    socket.on('leave-room', ({ fileId }) => {
        if (fileId) {
            socket.leave(fileId);
        }
    });

    // Disconnect Event if someone exits
    socket.on("disconnect", (reason) => {
        console.log("Disconnected =>", reason);
    });
});

// Port Where Server will Run
const port = process.env.PORT || 3005;

// Server Initialization
server.listen(port, async () => {
    try {
        console.log(`Server is started Running on ${port}`);
        await prismaConnection.$connect();
        console.log('Prisma connected to the database successfully.');
    } catch (err) {
        console.log(err);
        exit(1);
    }
});
