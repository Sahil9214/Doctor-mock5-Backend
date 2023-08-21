const express = require("express");
const app = express();
const cors = require("cors");
const { userRouter } = require("./Routes/User.Routes");
const { connection } = require("./db");
const { doctorRouter } = require("./Routes/Doctor.routes");
const { auth } = require("./Middleware/auth.middleware");
require("dotenv").config();
app.use(express.json());

app.use(cors());

app.use("/user", userRouter);

app.use("/", doctorRouter);
app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log(`${process.env.PORT}is Running`);
  } catch (err) {
    console.log("err", err);
  }
});
