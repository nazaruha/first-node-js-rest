// Dotenv
import 'dotenv/config'
// Express
import express from 'express';
import bodyParser from 'body-parser';
// Swagger
import swaggerUI from 'swagger-ui-express'; // for swagger UI
import specs from './swagger.js'; // import swagger specs
// MongoDB
import mongoose from "mongoose";
// Routes
import usersRoutes from './routes/users.js'; // include users routes
//CORS Policy
import cors from 'cors';

// init express
const app = express();
const PORT = process.env.PORT || 3000;

// connect to mongodb
const MONGO_URL = process.env.MONGO_URL;
mongoose.connect(MONGO_URL)
    .then((result) => {
        console.log("connected to DB");
        // listen for requests
        app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}/api-docs`)); // automatically infers to the localhost
        // replaced, because we want to connect to the server when we successfully connected to the DB. IT LOGICAL
    }).catch((err) => {
    console.log(`Error: ${err}`);
})

// setup swagger
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs));
// setup json data converter
//app.use(express.json()); // tells that we gonna use json data in our app
app.use(bodyParser.json());
app.use(express.urlencoded({extended: false})); // for some kind of shit for insomnia
// CORS
//app.use(cors()); // allow access to any URL

// var corsOptions = {
//     origin: `http://localhost:${PORT}`,
//     optionsSuccessStatus: 200 // some on 204 works
// }
// app.use(cors(corsOptions)); // allow access to the specified URL

var corsOptions = {
    origin: [`http://localhost:${PORT}`, `http://127.0.0.1:${PORT}`],
    optionsSuccessStatus: 200 // some on 204 works
}
app.use(cors(corsOptions)); // allow access to the specified URLs

//routes
app.use('/users', usersRoutes);
app.use("/*", (req, res) => {
    res.status(404).send("Pade not found");
})

