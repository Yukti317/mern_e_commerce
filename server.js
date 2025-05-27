const express = require('express');
require('./config') //db connection
const cookie_parser = require('cookie-parser')
const cors = require('cors')
const app = express()
app.use(express.json())

const port = process.env.Port || 5000
app.listen(port)