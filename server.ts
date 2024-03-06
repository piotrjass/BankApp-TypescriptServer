import app from "./app";
import connectToDatabase from "./utils/connect_to_db";

const port = 8000;

const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
connectToDatabase();
