const express = require("express");
const router = express.Router();
const Drone = require("../models/Drone.model");

// require the Drone model here

router.get("/drones", (req, res, next) => {
  // Iteration #2: List the drones
  Drone.find({})
    .then((dronesFromDB) =>
      res.render("./drones/list", { drones: dronesFromDB })
    )
    .catch((err) => console.log(err));
});

router.get("/drones/create", (req, res, next) => {
  // Iteration #3: Add a new drone
  res.render("drones/create-form");
});

router.post("/drones/create", (req, res, next) => {
  // Iteration #3: Add a new drone
  const { name, propellers, maxSpeed } = req.body;
  Drone.create({
    name,
    propellers,
    maxSpeed,
  })
    .then(() => {
      console.log("new drone added");
      res.redirect("/drones");
    })
    .catch(() => res.render("drones/create-form"));
});

router.get("/drones/:id/edit", (req, res, next) => {
  // Iteration #4: Update the drone
  const { id } = req.params;
  Drone.findById(id)
    .then((dataFromDB) => res.render("drones/update-form", dataFromDB))
    .catch((err) => console.log(err));
});

router.post("/drones/:id/edit", (req, res, next) => {
  const { id } = req.params;
  const { name, propellers, maxSpeed } = req.body;
  Drone.findByIdAndUpdate(id, { name, propellers, maxSpeed })
    .then(() => res.redirect("/drones"))
    .catch(() =>
      Drone.findById(id).then((dataFromDB) =>
        res.render("drones/update-form", dataFromDB)
      )
    );

  /*.catch(() => {
      Drone.findById(id)
      .then((dataFromDB) => res.render("drones/update-form", dataFromDB))*/
});

router.post("/drones/:id/delete", (req, res, next) => {
  // Iteration #5: Delete the drone
  // ... your code here
});

module.exports = router;
