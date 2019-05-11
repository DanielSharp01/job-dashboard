import express from "express";
const app = express();
import requestSchonherz from "./middlewares/requestSchonherz";
import requestMuisz from "./middlewares/requestMuisz";
const port = 3100;

app.get('/', (req, res) => res.send('Hello World!'));

app.get('/sconherz', requestSchonherz(), (req, res, next) => { res.send(res.html.text()) });
app.get('/muisz', requestMuisz(), (req, res, next) => res.send(res.html.text()));

app.listen(port, () => console.log(`Listening on port ${port}!`));