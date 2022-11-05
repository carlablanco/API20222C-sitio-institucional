const db = require("../models");
const class_comment = require("../models/class_comment");
const Class = db.classes;
const Op = db.Sequelize.Op;
const { QueryTypes } = require('sequelize');

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
  console.log(db)
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


exports.findClass = async (req, res) => {

  var conditions = []

  if (req.body.name) {
    conditions.push({ name: req.body.name })
  }

  if (req.body.type) {
    conditions.push({ type: req.body.type })
  }

  if (req.body.frequency) {
    conditions.push({ frequency: req.body.frequency })
  }

  if(req.body.rating) {
    let subQueryRating = await db.sequelize.query(
      'SELECT c.id, avg(cc.stars) as avgStars FROM sitioinstitucional.classes c JOIN sitioinstitucional.class_comments cc ON c.id = cc.id_class GROUP BY c.id HAVING avgStars >= ?',
      {
        replacements: [req.body.rating],
        type: QueryTypes.SELECT
      }
    )
    subQueryRating = subQueryRating.map(value => {
      return value.id
    });
  
    if(subQueryRating) {
      conditions.push({id: subQueryRating})
    }
  }


  Class.findAll(
    {
      where: conditions,
      include: [
        {
          as: 'comments',
          model: db.sequelize.model('class_comment'),
          include: {
            as: 'student',
            model: db.sequelize.model('User'),
          }
        },
        {
          as: 'professor_fk',
          model: db.sequelize.model('professor_experience')
        },
      ],
      atrributes: {
        include: [
          [db.sequelize.fn('AVG', db.sequelize.col('class_comment.stars', 'avgStars'))]
        ]
      }

    })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred."
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