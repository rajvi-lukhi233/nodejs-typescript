import express from "express";
import { dbConnect } from "./config/db.config.js";
import indexRoute from "./route/index.js";
const app = express();
const port: number = Number(process.env.PORT);

app.use(express.json());
dbConnect();
app.use("/api", indexRoute);
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
