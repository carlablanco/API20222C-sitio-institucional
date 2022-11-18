const db = require("../models");
const class_comment = db.class_comment;
const Op = db.Sequelize.Op;
const nodemailer = require('nodemailer')


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
      // create reusable transporter object using the default SMTP transport
      const transport = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            auth: {
                user: 'scot.weimann@ethereal.email',
                pass: 'svbFjXnMJFshPB1jzu'
            }
      });
      const sendMail = {
            from: "noreply@culturetour.local",
            to: email,
            subject: "Culture Tour - Comentario Borrado",
            text: message
      };

        transport.sendMail(sendMail, (error, info) => {
            if (error) {
                console.log(error)
            }
            console.log('Message sent: %s', info?.messageId)
        });
}


exports.deleteComment = (req, res) => {
  const id = req.body.id;

  class_comment.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        const message = "Se borró el comentario con id: " + id + " la razon de bloqueo fue: " + req.body.message
        res.send({
          message
        });

        sendMail(req.body.mail, message)

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