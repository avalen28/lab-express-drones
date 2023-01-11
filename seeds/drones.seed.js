// Iteration #1  ----- seed data and Mongoose call
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const drones = [
  { name: "Creeper XL 500", propellers: 3, maxSpeed: 12 },
  { name: "Racer 57", propellers: 4, maxSpeed: 20 },
  { name: "Courier 3000i", propellers: 6, maxSpeed: 18 },
];

const Drone = require("../models/Drone.model");

const MONGO_URL = "mongodb://localhost:27017/lab-express-drones";

mongoose
  .connect(MONGO_URL)
  .then(() => console.log("conected with Mongo"))
  .then(() => Drone.deleteMany())
  .then(() => Drone.create(drones))
  .then((dronesData) => console.log(`${dronesData.length} Drones created`))
  .catch((err) => console.log(err))
  .finally(() => mongoose.disconnect());

module.exports = drones;
