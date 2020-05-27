const express = require('express');
const dotenv = require("dotenv");
const Sentry = require('@sentry/node');
const bodyParser = require('body-parser');
const helmet = require("helmet");

dotenv.config();
Sentry.init({dsn:process.env.SENTRY_DSN});

const PORT = process.env.PORT || 8080;
const HOST = process.env.HOST || '0.0.0.0';
const server = express();
const DB = require("./config/db");

const faqs = require("./components/faqs/routes");

server.use(helmet());
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended: true}));

server.get("/", (req, res) => res.send("dreamflow cms online"));
server.use(faqs);

DB.authenticate().catch((err) => console.log("Error: " + err))
.then(() => server.listen(PORT, HOST, console.log(`Server started on ${HOST}:${PORT}`)));