import express from "express"
import cors from "cors"
import "./helper/dbConnection.js"
import routes from './routes/index.js'
import errorHandler from "./middlewares/errorHandler.js"

const PORT = process.env.PORT || 4000

const app = express()


app.use(cors());
app.use(express.json());

// Use routes
app.use('/', routes);

// Home route
app.get('/', (_req, res) => {
  res.status(200).json({ message: 'Hello There!! You are at Backend' });
});


app.use(errorHandler)


// handle the error safely
process.on('uncaughtException', (err) => {
  console.log(err);
});

app.listen(PORT, () => console.log("App listening on PORT", PORT))