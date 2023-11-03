import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const PORT = 3000;

app.use(bodyParser.json()); // tells that we gonna use json data in our app

app.get("/", (req, res) => {
    console.log("[TEST]!");

    res.send('Hello from Homepage.');
})

app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}`));