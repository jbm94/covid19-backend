require('dotenv').config();

const express = require('express');
// const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const app = express();

// Database
// const db = process.env.NODE_ENV === 'production' ? process.env.DATABASE : 'mongodb://localhost:27017/covid19';
// mongoose.connect(db, {useNewUrlParser: true, useUnifiedTopology: true});
// mongoose.connection.on('error', err => {
//     console.error(`→ ${err.message}`)
// });

// Middleware
app.use(helmet())
if (process.env.NODE_ENV === 'development') {
    app.use(morgan(':status | :method :url :response-time ms | :remote-addr', {
        skip: req => req.method !== 'GET'
    }));
}
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(cors());

// Routes
const apiRouter = require('./routes/apiRouter');
app.use('/api', apiRouter);

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('\x1b[34m%s\x1b[0m', `
  COVID-19 API (Cuba)
  ${process.env.NODE_ENV || 'Development'}

  REST      → http://localhost:${PORT}/api/
  `
    //Database  → ${mongoose.connection.host}/${mongoose.connection.name}
));

module.exports = app;