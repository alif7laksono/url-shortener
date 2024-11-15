// config.js

import dotenv from "dotenv";

dotenv.config();

const port = process.env.PORT;
const mongoDBURL = process.env.MONGODB_URI;

export { port, mongoDBURL };