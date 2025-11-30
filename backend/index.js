import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { createServer } from "http";
import { Server } from "socket.io";           
import sequelize from "./config/database.js";
import taskRoutes from './routes/tasks.routes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST","PUT"]
  }
});

app.use((req, res, next) => {
  req.io = io;
  next();
});
app.use(cors());
app.use(express.json());
app.use('/api/tasks', taskRoutes);

app.get("/", (req, res) => {
  res.send("This is the demo first page for task management API with Socket.IO!");
});

sequelize.authenticate().then(() => {console.log("We have successfully connected to the Database");}).catch((err) => {console.log("Error connecting to Database:", err);});

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

server.listen(PORT, (err) => {
  if (err) {
    console.log("Error in initializing server:", err);
    return;
  }
  console.log(`Server is running on PORT: ${PORT}`);
});