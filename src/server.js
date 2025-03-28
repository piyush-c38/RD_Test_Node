const express = require('express');
const connectDb = require("./config/db");
const errorHandler = require("./middleware/errorHandler");
require("dotenv").config();

connectDb();
const app = express();

const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/person", require("./routes/person.routes"));
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
