import mongoose from "mongoose"
import config from "../config/index.js"




const connect = () => {

    const dbName = process.env.NODE_ENV === "TEST" ? "test1" : config.DB_NAME

    mongoose.connect(config.MONGO_DB_URL, {
        dbName: dbName
    })

    mongoose.Promise = Promise;

    // Database connection events
    // When successfully connected
    mongoose.connection.on('connected', () => {
        console.log(`Mongoose default connection open for worker ${process.pid}`);
    });

    // If the connection throws an error
    mongoose.connection.on('error', (err) => {
        console.log(`Mongoose default connection error: ${err}`);
    });

    // When the connection is disconnected
    mongoose.connection.on('disconnected', () => {
        console.log(`Mongoose default connection disconnected for worker ${process.pid}`);
    });

    // If the Node process ends, close the Mongoose and Redis connection
    process.on('SIGINT', () => {
        mongoose.connection.close(() => {
            console.log('Mongoose default connection disconnected through app termination');
            // eslint-disable-next-line no-process-exit
            process.exit();
        });
    });
}

export default connect();