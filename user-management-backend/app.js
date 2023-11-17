import express from "express"
import cors from "cors"
const app =express()

import  "./helper/dbConnection.js"
import routes from './routes/index.js'


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(cors());
app.use(express.json());

// Use routes
app.use('/', routes);

// Home route
app.get('/', (_req, res) => {
  res.status(200).json({ message: 'Hello There!! You are at Backend' });
});

// handle the error safely
process.on('uncaughtException', (err) => {
  console.log(err);
});

export default app;