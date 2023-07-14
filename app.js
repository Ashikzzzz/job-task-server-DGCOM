const express = require("express");
const app = express();
const cors = require("cors");

// import necessery routes 


// middleware
app.use(express.json());
app.use(cors());




// ---------- Happy Server ----------
app.get("/", (req, res) => {
    res.send("Route is working! YaY!");
})

module.exports = app;