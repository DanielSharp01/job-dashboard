import express from "express";
import bodyParser from "body-parser";
import jobs from "./routes/jobs"
import filterSlots from "./routes/filterSlots"
import sortCriteriaSlots from "./routes/sortCriteriaSlots"
import cors from "cors";

const port = 3100;
const app = express();

app.use(cors());
app.use(bodyParser.json());

jobs(app);
filterSlots(app);
sortCriteriaSlots(app);

app.listen(port, () => console.log(`Listening on port ${port}!`));