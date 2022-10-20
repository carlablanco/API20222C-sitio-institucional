const db = require("../models");
const Class = db.Class;
const Op = db.Sequelize.Op;

exports.createClass = (req, res) => {
    // Validate request
    if (!req.body.name) {
      res.status(400).send({
        message: "La clase no puede estar vacía."
      });
      return;
    }
  
    // Create a Class
    const aClass = {
        professor: req.body.professor,
        name: req.body.name,
        duration: req.body.duration,
        frequency: req.body.frequency,
        type: req.body.type,
        cost: req.body.cost,
        status: "No publicada"
    };
  
    // Save Class in the database
    Class.create(aClass)
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


  exports.updateClass = (req, res) => {
    const id = req.params.id;
  
    Class.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "La clase fue actualizada."
          });
        } else {
          res.send({
            message: `Error: La clase con id=${id} no existe.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error actualizando la clase con id=" + id
        });
      });
  };


  exports.deleteClass = (req, res) => {
    const id = req.params.id;
  
    Class.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Se borró la clase"
          });
        } else {
          res.send({
            message: `La clase con id =${id} no existe.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Ocurrió un error, no se pudo borrar la clase con id=" + id
        });
      });
  };