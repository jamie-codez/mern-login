const mongoose = require("mongoose");
const db = async (callback) => {
    const db = mongoose.connect(process.env.DB_CON_STRING, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        authSource: "admin",
        autoIndex: true,
        socketTimeoutMS: 45000,
        serverSelectionTimeoutMS: 30000
    });
    mongoose.connection.once("connected", () => {
        console.info("INFO: Connected to DB".bgGreen);
        callback(db)
    });
    mongoose.connection.on("disconnected", () => {
        console.warn("WARN: Disconnected from DB".bgYellow)
    });
    mongoose.connection.on("reconnected", () => {
        console.info("INFO: Reconnected to DB".bgGreen)
    });
    mongoose.connection.on("error", e => {
        console.error(`ERROR: Error occurred connecting to DB. ${e.message}`.bgRed);
    });
}

module.exports = db;