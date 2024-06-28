/*
  Rutas de usuarios / auth
  hoast + /api/auth
*/

const express = require('express');
const { check } = require('express-validator')
const router = express.Router();
const { createUser, loginUser, renewToken } = require('../controllers/auth');
const { fieldValidators } = require('../middlewares/field-validators');
const { validatorJWT } = require('../middlewares/jsw-validator');

router.post(
  '/new',
  [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password debe de ser de 6 caracteres').isLength({min: 6}),
    fieldValidators
  ],
  createUser);

router.post(
  '/',
  [
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password debe de ser de 6 caracteres').isLength({min: 6}),
    fieldValidators
  ],
  loginUser);

router.get('/renew', validatorJWT, renewToken);


module.exports = router;