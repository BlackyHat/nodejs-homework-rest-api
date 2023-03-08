<<<<<<< Updated upstream
const express = require('express')
const logger = require('morgan')
const cors = require('cors')

const contactsRouter = require('./routes/api/contacts')
=======
const express = require("express");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();
require("colors");

const contactsRouter = require("./src/routes/contacts.routes");
>>>>>>> Stashed changes

const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())

<<<<<<< Updated upstream
app.use('/api/contacts', contactsRouter)
=======
app.use(require("./src/middlewares/errorHandler"));
app.use("/api/contacts", contactsRouter);
app.use(require("./src/middlewares/badUrlError"));
>>>>>>> Stashed changes

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message })
})

module.exports = app
