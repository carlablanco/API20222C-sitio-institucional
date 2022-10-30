const db = require("../models");
const professor_experience = db.professor_experience;
const Op = db.Sequelize.Op;

exports.createExperience = (req, res) => {
    // Validate request
    if (!req.body.type) {
      res.status(400).send({
        message: "La experiencia no puede estar vacía."
      });
      return;
    }
  
    // Create 
    const anExperience = {
        user_id: req.body.user_id,
        type: req.body.type,
        years: req.body.years
    };
  
    // Save in the database
    professor_experience.create(anExperience)
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


  exports.updateExperience = (req, res) => {
    const id = req.params.id;
  
    professor_experience.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "La experiencia fue actualizada."
          });
        } else {
          res.send({
            message: `Error: La experiencia con id=${id} no existe.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error actualizando la experiencia con id=" + id
        });
      });
  };


  exports.deleteExperience = (req, res) => {
    const id = req.params.id;
  
    professor_experience.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Se borró la experiencia"
          });
        } else {
          res.send({
            message: `La experiencia con id =${id} no existe.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Ocurrió un error, no se pudo borrar la experiencia con id=" + id
        });
      });
  };


  exports.findProfessor = (req, res) => {
    const user_id = req.query.user_id;
    var condition = user_id ? { user_id: user_id } : null;
  
    User.findOne({ where: condition,
      include: {
        model: professor_experience } })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving the professor."
        });
      });
  };