const express = require("express");
const app = new express();
const connectDB = require("./database/connectDB");
connectDB().then(() => {
  console.log("Database connected.");
  app.listen(7777, () => {
    console.log("Server is listening now...");
  });
});
