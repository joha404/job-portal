import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
dotenv.config();

const port = process.env.PORT || 3000;
const app = express();

app.use(cookieParser());
app.get("/", (req, res) => {
  res.send("home page");
});
app.use(express.json());

import useRoute from "./routes/userRoutes.js";
app.use("/user", useRoute);
import jobRoute from "./routes/jobRoutes.js";
app.use("/job", jobRoute);

app.listen(port, () => {
  console.log("Server Running on", port);
});
