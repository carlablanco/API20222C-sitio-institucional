const db = require("../models");
const class_comment = db.class_comment;
const Op = db.Sequelize.Op;

exports.createComment = (req, res) => {
    // Validate request
    if (!req.body.content) {
      res.status(400).send({
        message: "El comentario no puede estar vacío."
      });
      return;
    }
  
    // Create 
    const aComment = {
        id_class: req.body.id_class,
        id_student: req.body.id_student,
        content: req.body.content,
        stars: req.body.stars
    };
  
    // Save in the database
    class_comment.create(aComment)
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


  exports.deleteComment = (req, res) => {
    const id = req.params.id;
  
    class_comment.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Se borró el comentario."
          });

          // implementar mail al estudiante con el motivo del bloqueo.
          
        } else {
          res.send({
            message: `El comentario con id =${id} no existe.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Ocurrió un error, no se pudo borrar el comentario con id=" + id
        });
      });
  };


  exports.findAllComments = (req, res) => {
    const id_class = req.query.id_class;
    var condition = id_class ? { title: id_class } : null;
  
    class_comment.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving comments."
        });
      });
  };