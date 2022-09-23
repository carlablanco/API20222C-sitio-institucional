const express = require('express');
const router = express.Router();

// Controllers
const AuthController = require('./controllers/AuthController');

// Home
router.get('/', (req, res) => res.json({ hello: "World" }));

// Dos rutas: login y registro
router.post('/api/login', AuthController.signIn);
router.post('/api/register', AuthController.signUp);

module.exports = router;