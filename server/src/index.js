import express from "express";
import bodyParser from "body-parser";
import session from "express-session";
import connectMongo from "connect-mongo";
import cookieParser from "cookie-parser";
import fs from "fs";
import path from "path";
import jobs from "./routes/jobs";
import filterSlots from "./routes/filterSlots";
import sortCriteriaSlots from "./routes/sortCriteriaSlots";
import { accountsConnection } from "./db";
import User from "./model/User";
import auth from "./middlewares/auth";

const port = 3100;
const app = express();
const MongoStore = connectMongo(session);

app.use(bodyParser.json());
app.use(
  session({
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: true,
    store: new MongoStore({ mongooseConnection: accountsConnection })
  })
);
app.use(cookieParser());

app.use(auth(true, true));

app.get("/job-dashboard/", async (req, res, next) => {
  let loggedInUser = await User.findOne({ _id: req.userId });
  if (!loggedInUser) return next("There was an error!");
  req.session.redirectUrl = req.originalUrl;

  let html = fs.readFileSync(path.join(__dirname, "../public/index.html"), "utf8");
  html = html.replace("<LOGGED IN USER>", loggedInUser.username.replace(/<.?script>/gi, ""));
  res.send(html);
});

app.use("/job-dashboard", express.static("public"));

jobs(app);
filterSlots(app);
sortCriteriaSlots(app);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(typeof err === "number" ? err : 500).send(); // TODO: Better error handling
});

app.listen(port, "localhost", () => console.log(`Listening on port ${port}!`));
