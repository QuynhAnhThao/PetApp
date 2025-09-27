// routes/petRoutes.js (CJS)
const express = require('express');
// const { protect } = require('../middleware/authMiddleware');
// const { requireAdmin } = require('../middleware/roleMiddleware');
const {
  createPet,
  getPets,
  getPetById,
  updatePet,
  deletePet,
  getTreatments,
  addTreatment,
  deleteTreatment
} = require('../controllers/petController');
const { Protect, AdminOnly } = require('../middleware/chain');
const router = express.Router();


// Build a chain
const protect = new Protect();
const adminOnly = new AdminOnly();
protect.setNext(adminOnly); // Protect -> AdminOnly

// Wrap the chain for Express
const protectOnly = (req, res, next) => new Protect().handle(req, res, next);
const protectAndAdmin = (req, res, next) => protect.handle(req, res, next);
console.log("debug:",protectOnly)

// Pets
router.route('/')
  .get(protectOnly, getPets)
  .post(protectOnly, createPet);

router.route('/:id')
  .get(protectOnly, getPetById)
  .put(protectOnly, updatePet)
  .delete(protectAndAdmin, deletePet);

// Treatments
router.route('/:id/treatment')
  .get(protectOnly, getTreatments)
  .post(protectOnly, addTreatment);

router.route('/:id/treatment/:treatId')
  .delete(protectAndAdmin, deleteTreatment);

module.exports = router;
