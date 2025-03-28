const express = require('express');
const connectDb = require("./config/db");
const errorHandler = require("./middleware/errorHandler");
const methodOverride = require('method-override');

connectDb();
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const path = require('path');
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views')); // Ensure this path points to your views folder

app.use(methodOverride('_method'));
app.use("/person", require("./routes/person.routes"));
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
