const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { fieldValidators } = require('../middlewares/field-validators');
const { validatorJWT } = require('../middlewares/jsw-validator');
const { getEvent, updateEvent, createEvent, deleteEvent } = require('../controllers/events');
const { isDate } = require('../helpers/isDate');

router.use(validatorJWT);

router.get(
  '/',
  getEvent
)

router.post(
  '/',
  [
    check('title', 'Title is required').not().isEmpty(),
    check('start', 'Fecha de inicio is required').custom(isDate),
    check('end', 'Fecha de fin is required').custom(isDate),
    fieldValidators
  ],
  createEvent
)

router.put(
  '/:id',
  updateEvent
)

router.delete(
  '/:id',
  deleteEvent
)

module.exports = router;