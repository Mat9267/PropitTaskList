import express from 'express';
import bodyParser from 'body-parser';
import { TaskRouter } from './api/routes/task';
import mongoose from 'mongoose';
import cors from 'cors';
require('dotenv').config();

const app = express();
mongoose.connect(process.env.MONGODB_URI);
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use('/task', TaskRouter);
app.get("/", function(req, res) {
    res.send("App works!!");
});
const server = app.listen(process.env.PORT, () => {
    console.log("running server on port: " + process.env.PORT);
});