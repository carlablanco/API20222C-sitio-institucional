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
    forgotPassword(res,req) {
        const {email} = req.body;

        User.findOne({email}, (err,user) => {
            if (err || !user) {
                return res.status(400).json({error: "No existe un usuario con este mail."});
            }

            const token = jwt.sign({id: user.id}, process.env.RESET_PASSWORD_KEY, {expiresIn: '30m'});

            const sendMail = {
                from: "noreply@culturetour.local",
                to: email,
                subject: "Culture Tour - Recuperá tu contraseña",
                text: `Clickeá en el link para recuperar tu contraseña ${process.env.CLIENT_URL}/resetpassword/${token}`
            };

            mailer.transport.sendMail(sendMail)

            return user.updateOne({resetLink: token}, (err, success) => {
                if (err){
                    return res.status(400).json({error: "ocurrió un error"});
                } else {

                }
            })
        })

    },

    passwordReset(res,req) {
        const {token, password} = req.body;

        var decoded = jwt.verify(token, process.env.RESET_PASSWORD_KEY);
        
        User.findOne({
            where: {
                resetLink: token,
                id: decoded.id
            }
        }, (err,user) => {
            if (err || !user) {
                return res.status(400).json({error: "Token invalido."});
            }
            return user.updateOne({password: password}, (err, success) => { 
                if (err){
                    return res.status(400).json({error: "ocurrió un error"});
                } else {

                }
            })
        })

    }

}