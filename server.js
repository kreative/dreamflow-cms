const express = require('express');
const dotenv = require("dotenv");
const bodyParser = require('body-parser');
const helmet = require("helmet");

dotenv.config();

const PORT = process.env.PORT || 4000;
const server = express();
const DB = require("./config/db");

const faqs = require("./components/faqs/routes");

server.use(helmet());
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended: true}));

server.use(faqs);

DB.authenticate().catch((err) => console.log("Error: " + err))
.then(() => server.listen(PORT, '127.0.0.1', console.log(`Server started on port ${PORT}`)));