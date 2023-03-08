const { connect } = require("mongoose");

const connectDB = async () => {
  try {
    const db = await connect(process.env.MONGODB_HOST_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const { port, host, name } = db.connections[0];
    console.log(
      `MongoDB connected on port ==> ${port}, on host ==> ${host}, name ==> ${name}`
        .bgYellow
    );
    return db;
  } catch (error) {
    console.log(`${error.message}`.red);
    process.exit(1);
  }
};

module.exports = {
  connectDB,
};
