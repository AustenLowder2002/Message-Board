import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import morgan from "morgan";
import session from "express-session";
import indexRouter from "./routes/index.js"

const app = express();

app.use(session({ secret: "dogs", resave: false, saveUninitialized: true }));
app.use(morgan("dev"));
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);

export default app;
