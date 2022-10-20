
const { Class } = require("./models/Class.js");

exports.createClass = (req, res) =>
    new Class({ 
        professor: req.body.professor,
        name: req.body.name,
        duration: req.body.duration,
        frequency: req.body.frequency,
        type: req.body.type,
        cost: req.body.cost,
        status: "No publicada"
     })
    .save((err, data) => {
        if (err) res.json({ error: err });
        else     res.json(data);
    });


exports.publishClass = (req, res) =>
    Class.findOneAndUpdate(
        { _id: req.params.id },
        { $set: {
            status: "Publicada"
         } }, 
        (err, data) => {
            if (err) res.json({ error: err });
            else     res.json(data);
        }
    );


exports.updateClass = (req, res) =>
    Class.findOneAndUpdate(
        { _id: req.params.id },
        { $set: {         professor: req.body.professor,
            name: req.body.name,
            duration: req.body.duration,
            frequency: req.body.frequency,
            type: req.body.type,
            cost: req.body.cost,
            status: req.body.status // aca que iria??
         } }, 
        (err, data) => {
            if (err) res.json({ error: err });
            else     res.json(data);
        }
    );


exports.deleteClass = (req, res) =>
    Class.findOneAndRemove({ _id: req.params.id }, (err, data) => {
        if (err) res.json({ error: err });
        else     res.json(data);
    });