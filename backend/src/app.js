import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import morgan from "morgan";
import session from "express-session";
import removeMessage from "./controllers/removeMessage.js";
import likesController from "./controllers/likesController.js";
import retrieveMessages from "./controllers/retrieveMessages.js";
import addMessage from "./controllers/addMessage.js";

const app = express();

app.use(session({ secret: "dogs", resave: false, saveUninitialized: true }));
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.post("/api/add/message", );
app.delete("/api/remove/message/:id", removeMessage);

app.post("/api/upadate/message/:id");
app.post("/api/like/message/:id", likesController);

app.get("/api/messages", retrieveMessages);

app.post('/api/add/message', addMessage);

export default app;
