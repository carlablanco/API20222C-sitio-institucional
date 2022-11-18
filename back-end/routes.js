const express = require('express');
const router = express.Router();

// Controllers
const AuthController = require('./controllers/AuthController');
const ClassController = require('./controllers/ClassController');
const ClassCommentController = require('./controllers/ClassCommentController');
const StudentStudiesController = require('./controllers/StudentStudiesController');
const ProfessorExperienceController = require('./controllers/ProfessorExperienceController');
const ClassEnrollmentController = require('./controllers/ClassEnrollmentController');




// Home
router.get('/', (req, res) => res.json({ hello: "World" }));

// Dos rutas: login y registro
router.post('/api/login', AuthController.signIn);
router.post('/api/register', AuthController.signUp);
router.post('/api/reset-password', AuthController.forgotPassword);
router.post('/api/change-password', AuthController.passwordReset);




// Class endpoints
router.post('/api/filter-class', ClassController.findClass);
router.post('/api/create-class', ClassController.createClass);
router.post('/api/update-class', ClassController.updateClass);
router.delete('/api/delete-class', ClassController.deleteClass);

// Comment endpoints
router.post('/api/post-comment', ClassCommentController.createComment);
router.post('/api/block-comment', ClassCommentController.deleteComment);

// Student studies endpoints
router.post('/api/create-studies', StudentStudiesController.createStudies);
router.post('/api/update-studies', StudentStudiesController.updateStudies);
router.delete('/api/delete-studies', StudentStudiesController.deleteStudies);
router.post('/api/get-student-studies', StudentStudiesController.findStudent);



// Professor experience endpoints
router.post('/api/create-experience', ProfessorExperienceController.createExperience);
router.post('/api/update-experience', ProfessorExperienceController.updateExperience);
router.delete('/api/delete-experience', ProfessorExperienceController.deleteExperience);
router.post('/api/get-professor-experience', ProfessorExperienceController.findProfessor);

//Class Request endpoints
router.post('/api/request-class',  ClassEnrollmentController.requestClass);
router.get('/api/get-class-requests',  ClassEnrollmentController.findAllRequests);
router.post('/api/update-class-requests',  ClassEnrollmentController.updateStudentRequest);



module.exports = router;