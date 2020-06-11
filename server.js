const express = require('express');
const dotenv = require("dotenv");
const Sentry = require('@sentry/node');
const bodyParser = require('body-parser');
const helmet = require("helmet");
const exphbs = require('express-handlebars');
const path = require("path");
const cors = require("cors");

dotenv.config();
Sentry.init({dsn:process.env.SENTRY_DSN});

const PORT = process.env.PORT || 8080;
const HOST = process.env.HOST || '0.0.0.0';
const server = express();
const DB = require("./config/db");

const faqs = require("./components/faqs/routes");
const authors = require("./components/authors/routes");
const posts = require("./components/posts/routes");
const admin = require("./components/admin/routes");

server.use(helmet());
server.use(cors());
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended: true}));
server.use(express.static(path.join(__dirname, '/public')));

server.engine('handlebars', exphbs({defaultLayout: 'main'}));
server.set('view engine', 'handlebars');


server.get("/", (req, res) => {
  res.send(`
    Welcome Dreamer! <br>
    The Dreamflow CMS is online. <br>
    DBHOST: ${process.env.PGHOST} <br>
    DBDATABASE: ${process.env.PGDATABASE}
  `);
});

server.use(faqs);
server.use(authors);
server.use(posts);
server.use(admin);

DB.authenticate().catch((err) => console.log("Error: " + err))
.then(() => server.listen(PORT, HOST, console.log(`Server started on ${HOST}:${PORT}`)));