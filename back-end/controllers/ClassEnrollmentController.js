const db = require("../models");
const Class = db.classes;
const student_class = db.student_class;
const Op = db.Sequelize.Op;


exports.requestClass = (req, res) => {
    // Validate request
    if (!req.body.id_class) {
      res.status(400).send({
        message: "El contenido no puede estar vacío."
      });
      return;
    }
  
    // Create a Tutorial
    const class_request = {
      id_class: req.body.id_class,
      id_student: req.body.id_student,
      status: 'Solicitada',
      timeslot: req.body.timeslot,
      message: req.body.message
    };
  
    // Save Tutorial in the database
    student_class.create(class_request)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Ocurrió un error"
        });
      });
  };


exports.findAllRequests = (req, res) => {
    var condition = []

    if (req.body.status) {
      condition.push({ status: req.body.status })
    }

    Tutorial.findAll({ where: condition,
    include: [{
        as: 'user_student',
        model: db.sequelize.model('User')
    }]})
        .then(data => {
        res.send(data);
        })
        .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while retrieving tutorials."
        });
        });
    };