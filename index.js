import express from "express";
import mongoose from 'mongoose';
import initializeRouter from "./routers/index.js";
import bodyParser from "body-parser";

const app = express();
const router = express.Router();

app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "10mb" }));
app.use(router);

mongoose.connect(`mongodb://localhost:27017/categories-microservice`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

initializeRouter(router);

app.listen(3000, () => {
    console.log(`App running at http://localhost:3000`)
})
