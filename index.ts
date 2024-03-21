import app from "./src/app";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

async function main() {
  try {
    await mongoose.connect(process.env.DB_URI || "");
    console.log("database terhubung");

    app.listen(3000, function () {
      console.log("server is listening");
    });
  } catch (err) {
    console.log(err);
  }
}
main();
