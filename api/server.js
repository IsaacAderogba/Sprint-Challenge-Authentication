require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const api = require('../services');

// const configureRoutes = require('../config/routes.js');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use(api);

// configureRoutes(server);

module.exports = server;
