// import express from 'express';
// import bodyParser from 'body-parser';
// import usersRoutes from './routes/_users.js'; // include users routes
//
// const app = express(); // init our express obj
// const PORT = 3000; // create port for the server
//
// app.use(bodyParser.json()); // tells that we gonna use json data in our app
//
// //routes
// app.use('/users', usersRoutes);
//
// app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}`));

import express from 'express';
import bodyParser from 'body-parser';
import swaggerUI from 'swagger-ui-express'; // for swagger UI
import usersRoutes from './routes/users.js'; // include users routes
import specs from './swagger.js'; // import swagger specs

// init express
const app = express();

// setup swagger
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs));
// setup json data converter
//app.use(express.json()); // tells that we gonna use json data in our app
app.use(bodyParser.json());

//routes
app.use('/users', usersRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}/api-docs`));
