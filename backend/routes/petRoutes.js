const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { createPet, getPets, getPetById, updatePet, deletePet, getTreatments, addTreatment, deleteTreatment } = require('../controllers/petController');


router.use((req,res,next)=>{
  console.log('petRoutes hit:', req.method, req.originalUrl);
  next();
});

// GET: Retrieve all pets for the authenticated user
// POST: Create a new pet for the authenticated user
router.route('/').get(protect, getPets).post(protect, createPet);

// GET: Retrieve a pet by id for the authenticated user
// PUT: Update an existing pet
// DELETE: Remove an existing pet
router.route('/:id').get(protect, getPetById).put(protect, updatePet).delete(protect, deletePet);

// GET: Retrieve all treatments for a pet
// POST: Create a new treatment for a pet
// DELETE: Remove an existing treatment
router.route('/:id/treatment').get(protect, getTreatments).post(protect, addTreatment);
router.route('/:id/treatment/:treatId').delete(protect, deleteTreatment);

module.exports = router;