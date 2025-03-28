const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    //BUG: The connection string is hardcoded in the code. It should be stored in an environment variable.
    const connect = await mongoose.connect('mongodb+srv://chandrakarpiyush36:qwertyuiop@cluster0.kissl6y.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
    console.log(
      "Database connected: ",
      connect.connection.host,
      connect.connection.name
    );
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

module.exports = connectDb;
