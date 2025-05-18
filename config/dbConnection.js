import mongoose from "mongoose";

export default async function connect() {
  await mongoose
    .connect(process.env.MONGODB_CONN)
    .then(() => {
      console.log("Database is connected!");
    })
    // Handling connection error after initial connection.
    .catch((err) => {
      console.error(err);
    });

  // Handling connection error after initial connection.
  mongoose.connection.addListener("error", (err) => {
    console.error(err);
  });

  mongoose.connection.addListener("disconnected", () => {
    console.log("Database is disconnected!");
  });
}
