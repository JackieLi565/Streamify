import express from "express";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const port = process.env.LOCAL_PORT;

app.get("/", (req, res) => {
  res.json({ msg: "Hello, Streamify ... Backend!" });
});

app.listen(port, () => {
  console.log(`Server is listening @ http://localhost:${port}`);
});
