const db = require("../models");
const class_comment = db.class_comment;
const Op = db.Sequelize.Op;


exports.createComment = async (req, res) => {
  // Validate request
  if (!req.body.content) {
    res.status(400).send({
      message: "El comentario no puede estar vacío."
    });
    return;
  }

  const project = await class_comment.findOne({ where: { id_class: req.body.id_class, id_student: req.body.id_student } });
  if (project === null) {
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
  } else {
    project.content = req.body.content
    project.stars = req.body.stars
    project.save()
    res.send(project)
  }
};


function sendMail(email, message) {
  var mailOptions = {
    from: "noreply@culturetour.local",
    to: email,
    subject: "Tu comentario fue eliminado",
    text: "El motivo fue:" + message
  };

  mailer.transport.sendMail(mailOptions)
}


exports.deleteComment = (req, res) => {
  const id = req.body.id;

  class_comment.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Se borró el comentario."
        });

        sendMail(req.body.mail, req.body.message)

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
  var conditions = []

  if (req.body.id_class) {
    conditions.push({ name: req.body.id_class })
  }

  if (req.body.id) {
    conditions.push({ type: req.body.id })

    class_comment.findAll({
      where: conditions,
      include: {
        as: 'student',
        model: db.sequelize.model('User'),
        attributes: {
          exclude: ['password']
      }
      }
    })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving comments."
        });
      });
  }
};