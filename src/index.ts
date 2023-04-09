import "reflect-metadata";
import { createConnection } from "typeorm";
import express, { Application } from "express";
import morgan from "morgan";

import Router from "./routes";
import dbConfig from "./config/database";

const app: Application = express();

app.use(express.json());
app.use(morgan("tiny"));
app.use(express.static("public"));

app.use(Router);

createConnection(dbConfig)
  .then(() => {
    app.listen(8000,"0.0.0.0", () => {
      console.log("Server is running on port 8000");
    });
  })
  .catch((err) => {
    console.log("Unable to connect to db", err);
    process.exit(1);
  });
