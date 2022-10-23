const express = require('express');
const router = express.Router();

// Controllers
const AuthController = require('./controllers/AuthController');
const ClassController = require('./controllers/ClassController');
const ClassCommentController = require('./controllers/ClassCommentController');
const StudentStudiesController = require('./controllers/StudentStudiesController');
const ProfessorExperienceController = require('./controllers/ProfessorExperienceController');



// Home
router.get('/', (req, res) => res.json({ hello: "World" }));

// Dos rutas: login y registro
router.post('/api/login', AuthController.signIn);
router.post('/api/register', AuthController.signUp);


// Class endpoints
router.get('/api/filter-class', ClassController.findClass);
router.post('/api/create-class', ClassController.createClass);
router.post('/api/update-class', ClassController.updateClass);
router.delete('/api/delete-class', ClassController.deleteClass);

// Comment endpoints
router.post('/api/post-comment', ClassCommentController.createComment);
router.delete('/api/delete-comment', ClassCommentController.deleteComment);

// Student studies endpoints
router.post('/api/create-studies', StudentStudiesController.createStudies);
router.post('/api/update-studies', StudentStudiesController.updateStudies);
router.delete('/api/delete-studies', StudentStudiesController.deleteStudies);


// Professor experience endpoints
router.post('/api/create-studies', ProfessorExperienceController.createExperience);
router.post('/api/update-studies', ProfessorExperienceController.updateExperience);
router.delete('/api/delete-studies', ProfessorExperienceController.deleteExperience);

module.exports = router;