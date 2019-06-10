import express from "express";
import bodyParser from "body-parser";
import session from "express-session";
import connectMongo from "connect-mongo";
import cookieParser from "cookie-parser";
import jobs from "./routes/jobs";
import filterSlots from "./routes/filterSlots";
import sortCriteriaSlots from "./routes/sortCriteriaSlots";
import { accountsConnection } from "./db";
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

app.use("/job-dashboard", express.static("public"));

jobs(app);
filterSlots(app);
sortCriteriaSlots(app);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(typeof err === "number" ? err : 500).send(); // TODO: Better error handling
});

app.listen(port, "localhost", () => console.log(`Listening on port ${port}!`));
