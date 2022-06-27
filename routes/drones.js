const express = require('express');
const DroneModel = require('../models/Drone.model');
const router = express.Router();

// require the Drone model here

router.get('/drones', (req, res, next) => {
  DroneModel.find()
  .then(allTheDronesFromDB => {
    console.log('Retrieved drones from DB:', allTheDronesFromDB);
    res.render('drones/list.hbs', { drones: allTheDronesFromDB})
  })
  .catch(error => {
    console.log('Error while getting drones from the DB', error)
  })
});


// Iteration #3: Add a new drone
router.get('/drones/create', (req, res, next) => {
  res.render('drones/create-form.hbs')
});

router.post('/drones/create', (req, res, next) => {
  const { name, propellers, maxSpeed} = req.body;

  DroneModel.create({ name, propellers, maxSpeed})
    .then(createdDrone => console.log(`New drone created: ${createdDrone.name}`))
    .catch(error => next(error));
});

// Iteration #4: Update the drone
router.get('/drones/:id/edit', (req, res, next) => {
  
  const { id } = req.params
  console.log(id)
  DroneModel.findById(id)
    .then(droneToEdit => {
      console.log(droneToEdit)
      res.render('drones/update-form.hbs', { drone: droneToEdit})
    })
    .catch(error => next(error));
});

router.post('/drones/:id/edit', (req, res, next) => {
  const { id } = req.params;
  const { name, propellers, maxSpeed} = req.body;

  DroneModel.findByIdAndUpdate (id, { name, propellers, maxSpeed}, {new: true})
    .then(updatedDrone => res.redirect(`/drones/${updatedDrone.id}/edit`))
    .catch(error => next(error));
});

// Iteration #5: Delete the drone
router.post('/drones/:id/delete', (req, res, next) => {
  const { id } = req.params;
  DroneModel.findByIdAndDelete(id)
    .then(() => res.redirect('/drones'))
    .catch(error => next(error));
});

module.exports = router;
