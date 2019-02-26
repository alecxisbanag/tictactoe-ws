import cors from "cors";
import dotenv from "dotenv";
import express from "express";

import {DummyController} from "./controllers/";

dotenv.config();

const app: express.Application = express();
const port = process.env.PORT;
const url = process.env.URL;

app.use(cors());
app.use(express.json());
app.use("/dummy", DummyController);

app.listen(port, () => {
    console.log(`Listening at http://${url}:${port}/`);
    console.log(app.routes);
});
