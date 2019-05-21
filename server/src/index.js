import express from "express";
import bodyParser from "body-parser";
import jobs from "./routes/jobs"
import filterSlots from "./routes/filterSlots"
import sortCriteriaSlots from "./routes/sortCriteriaSlots"
import cors from "cors";
import db from "./db";

const port = 3100;
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use("/job-dashboard", express.static("public"));

jobs(app);
filterSlots(app);
sortCriteriaSlots(app);

app.use((err, req, res, next) => {
  res.status(typeof err === "number" ? err : 500).send(); // TODO: Better error handling
});

app.listen(port, "localhost", () => console.log(`Listening on port ${port}!`));