const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const route = require("./routes/route")

const app = express();

app.use(express.json());

app.use("/", route)
const PORT = process.env.PORT||3000
mongoose.connect(process.env.DB_URL)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error(err);
  });
