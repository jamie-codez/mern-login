const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./utils/db");
dotenv.config();
colors.enable();

const app = express();
const PORT = process.env.PORT || 5001;
/**
 * Middlewares
 */
app.use(cors({origin: ["http://localhost:3000"], secure: true}));
app.use(express.json());
app.use(express.raw());
app.use(bodyParser.json());
app.use(bodyParser.raw());
app.use(bodyParser.urlencoded({extended:false}));


/**
 * Route middlewares
 */

app.get("/",(req,res)=>{
    res.status(200).contentType("application/json").json({message:"Server is alive"});
});

db((db) => {
    if (db) {
        app.listen(PORT, () => {
            console.info(`INFO: Server started on port ${PORT}`.bgGreen);
        });
    }
})

