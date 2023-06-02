const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./utils/db");
const autRoutes = require("./routes/auth.route");
dotenv.config();
colors.enable();

const app = express();
const PORT = process.env.PORT || 5001;
/**
 * Middlewares
 */
app.use(cors({origin: ["http://localhost:3000","*"], secure: true}));
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

app.use("/auth",autRoutes)

db((database) => {
    if (database) {
        app.listen(PORT, () => {
            console.info(`INFO: Server started on port ${PORT}`.bgGreen);
        });
    }else {
        console.error(`ERROR: Error starting application`.bgRed)
    }
}).then(()=>console.log(`LOG: Just a log`.bgBlue))

