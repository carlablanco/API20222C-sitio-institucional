const db = require("../models");
const student_studies = db.student_studies;
const Op = db.Sequelize.Op;

exports.createStudies = (req, res) => {
    // Validate request
    if (!req.body.title) {
      res.status(400).send({
        message: "Los estudios no pueden estar vacíos."
      });
      return;
    }
  
    // Create 
    const aStudy = {
        user_id: req.body.user_id,
        title: req.body.title,
        status: req.body.status
    };
  
    // Save in the database
    student_studies.create(aStudy)
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


  exports.updateStudies = (req, res) => {
    const id = req.params.id;
  
    student_studies.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Los estudios fueron actualizados."
          });
        } else {
          res.send({
            message: `Error: Los estudios con id=${id} no existe.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error actualizando Los estudios con id=" + id
        });
      });
  };


  exports.deleteStudies = (req, res) => {
    const id = req.params.id;
  
    student_studies.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Se borró el estudio."
          });
        } else {
          res.send({
            message: `El estudio con id =${id} no existe.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Ocurrió un error, no se pudo borrar el estudio con id=" + id
        });
      });
  };