const express = require('express')
const mongoose = require('mongoose')

require('dotenv').config()

const routes = require('./Routes')

const app = express()

mongoose.connect(process.env.MONGO_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true
}, (error) => {
  if (error) {
    console.error(error);
  } else {
    console.log('Connected to database');
  }
});

app.use(express.json())
app.use(routes)

app.listen(3000, () => {
    console.log('Server running on port 3000');
  });