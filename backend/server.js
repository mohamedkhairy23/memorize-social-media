import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import "dotenv/config";
import postsRoutes from "./routes/postsRoutes.js";
const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb" }));
app.use(cors());

app.use("/posts", postsRoutes);

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(process.env.PORT || 8888, () =>
      console.log(
        `Success connection to DB && server running on port ${process.env.PORT}`
      )
    )
  )
  .catch((err) => {
    console.log(err.message);
  });
