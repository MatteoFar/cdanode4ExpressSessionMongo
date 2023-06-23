import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import MongoStore from "connect-mongo";
import cors from "cors";

import route from "./routes/routes.js";
import session from "express-session";
import cookieParser from "cookie-parser";

dotenv.config();
const { APP_HOSTNAME, APP_PORT, SECRET_API_KEY } = process.env;

const app = express();

// App middlewares
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use(
  session({
    name: "login",
    secret: SECRET_API_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: {
      path: "/",
      sameSite: "none",
      secure: false,
      httpOnly: false,
      maxAge: 60000,
    },
    store: MongoStore.create({ mongoUrl: "mongodb://127.0.0.1:27017/blog" }),
  })
);

// App routers

app.use("/", route);

// App start

try {
  await mongoose.connect("mongodb://127.0.0.1:27017/blog");
  console.log("Connected locally to DB");
} catch (err) {
  console.log("ERROR CO DB = ", err.message);
}

app.listen(APP_PORT, () => {
  console.log(`App listening at http://${APP_HOSTNAME}:${APP_PORT}`);
});
