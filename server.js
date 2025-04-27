import express from "express";
import URLrouter from "./src/routes/url.routes.js";
import redirectionRouter from "./src/routes/redirection.routes.js";
import { databaseConnect } from "./src/config/db.js";

const app = express();
const port = 3000;
const mongodb = process.env.DB_URL;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

await databaseConnect(mongodb);

app.use("/api/url/", URLrouter);
app.use("", redirectionRouter);

app.listen(port, () => {
  console.log("Server is running....>");
});
