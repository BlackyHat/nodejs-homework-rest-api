const app = require("./app");
const { connectDB } = require("./src/config/connection");

const PORT = process.env.PORT || 8081;

(async () => {
  await connectDB();
})();

app.listen(PORT, () => {
  console.log(`Server running. Use our API on port: ${PORT}`.bgBlue);
});
