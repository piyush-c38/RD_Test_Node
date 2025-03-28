const express = require('express');
const connectDb = require("./config/db");
const errorHandler = require("./middleware/errorHandler");

connectDb();
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use("/api/person", require("./routes/person.routes"));
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
