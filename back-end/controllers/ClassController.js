

exports.CreateClass = async function (req, res, next) {
    var Class = {
        professor: req.body.professor,
        name: req.body.name,
        duration: req.body.duration,
        frequency: req.body.frequency,
        type: req.body.type,
        cost: req.body.cost,
        status: "No publicada" //que iria acá inicialmente? no publicada
    }
}


//si la clase arranca no publicada entonces necesitamos exports.ChangeClass
//costo no negativo
// fq enum
