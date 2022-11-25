const { User } = require('../models/index');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');
const mailer = require('./MailController.js');
const nodemailer = require('nodemailer')


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
    async forgotPassword(req, res) {
        // create reusable transporter object using the default SMTP transport
        const email = req.body.email;
        try {
            await User.findOne({ where: { email: req.body.email } }).then(async (userFound) => {
                if (!userFound) {
                    return res.status(400).json({ error: "No existe un usuario con este mail." });
                }
                const token = jwt.sign({ id: userFound.dataValues.id }, process.env.RESET_PASSWORD_KEY, { expiresIn: '30m' });
                await userFound.update({ resetLink: token }, (err, success) => {
                    if (err) {
                        res.status(400).json({ error: "ocurrió un error" });
                    } else {
                    }
                }).then(async () => {
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
                        subject: "Culture Tour - Recuperá tu contraseña",
                        text: `Clickeá en el link para recuperar tu contraseña ${process.env.FRONT_URL}/change-password?token=${token}`
                    };

                    

                    await transport.sendMail(sendMail, (error, info) => {
                        if (error) {
                            console.log(error)
                        }
                        res.send('success');
                        console.log('Message sent: %s', info?.messageId)
                    });
                });
            });

        } catch (error) {
            res.status(400)
            console.log(error)
        }
    },

    async passwordReset(req, res) {
        const { token } = req.body;
        let {newPassword} = req.body;
        newPassword = bcrypt.hashSync(newPassword, Number.parseInt(authConfig.rounds));

        var decoded = jwt.verify(token, process.env.RESET_PASSWORD_KEY);

        await User.findOne({
            where: {
                resetLink: token,
                id: decoded.id
            }
        }).then((userFound) => {
            if (!userFound) {
                res.status(400).json({ error: "Token invalido." });
            }
            userFound.update({ password: newPassword }).then(() => {
                res.send('success');
            }, (error) => {
                res.status(400).json({ error: "ocurrió un error" });
            })
        })
    }

}