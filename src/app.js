const express = require("express");
const app = new express();
const cors = require("cors");
const connectDB = require("./database/connectDB");
const cookieParser = require("cookie-parser");
const authRouter = require("./routers/authRouter");
const twowheelerRouter = require("./routers/twowheelerRouter");
const serviceRouter = require("./routers/serviceRouter");
const dummydataRouter = require("./routers/dummydatarouter");

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:1234",
    credentials: true,
  })
);
app.use("/", authRouter);
app.use("/", twowheelerRouter);
app.use("/", serviceRouter);
app.use("/", dummydataRouter);
connectDB().then(() => {
  console.log("Database connected.");
  app.listen(7777, () => {
    console.log("Server is listening now...");
  });
});
