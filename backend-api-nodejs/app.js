require('dotenv').config();
const express = require("express");
const app = express();
const morgan = require("morgan")("dev");
const mongoose = require('mongoose');

mongoose
  .connect(process.env.mongodbUrl, {
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Successful connection to MongoDB!");
    
    app.use((req, res, next) => {
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
      );
      res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, PATCH, OPTIONS"
      );
      next();
    });
    app.use(morgan);
    app.use(express.json());
    app.use(process.env.rootAPI , require("./routes/task"));
  
  })
  .catch((err) => {
    console.log("Error", err.message);
    console.log("Connexion à MongoDB échouée !");
    process.exit();
  });

mongoose.set("debug", !process.env.isProduction);


module.exports = app;
