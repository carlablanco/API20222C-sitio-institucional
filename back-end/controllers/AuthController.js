const { User } = require('../models/index');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');
const mailer = require('./MailController.js');

module.exports = {


    // Login
    signIn(req, res) {

        let { email, password } = req.body;

        // Buscar usuario
        User.findOne({
            where: {
                email: email
            }
        }).then(user => {

            if (!user) {
                res.status(404).json({ msg: "Usuario con este correo no encontrado" });
            } else {

                if (bcrypt.compareSync(password, user.password)) {

                    // Creamos el token
                    let token = jwt.sign({ user: user }, authConfig.secret, {
                        expiresIn: authConfig.expires
                    });

                    res.json({
                        user: user,
                        token: token
                    })

                } else {

                    // Unauthorized Access
                    res.status(401).json({ msg: "Contraseña incorrecta" })
                }

            }

        }).catch(err => {
            res.status(500).json(err);
        })

    },

    // Registro
    signUp(req, res) {

        // Encriptamos la contraseña
        let password = bcrypt.hashSync(req.body.password, Number.parseInt(authConfig.rounds));

        // Crear un usuario
        User.create({
            name: req.body.name,
            surname: req.body.surname,
            email: req.body.email,
            password: password,
            phone: req.body.phone,
            type: req.body.type
        }).then(user => {

            // Creamos el token
            let token = jwt.sign({ user: user }, authConfig.secret, {
                expiresIn: authConfig.expires
            });

            res.json({
                user: user,
                token: token
            });

        }).catch(err => {
            res.status(500).json(err);
        });

    },

    // Recupero de contraseña
    sendMail(email) {
        var mailOptions = {
            from: "noreply@culturetour.local",
            to: email,
            subject: "Culture Tour - Recuperá tu contraseña",
        };
    
        mailer.transport.sendMail(mailOptions)
    }



}