// Rutas para usuariso
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { check } = require('express-validator');

// api/auth
router.post('/',
  [
    check('email', 'Agrega un email valido').isEmail(),
    check('password', 'Minimo 6 caracteres').isLength({ min: 6 })
  ],
  authController.authUser
);

module.exports = router;