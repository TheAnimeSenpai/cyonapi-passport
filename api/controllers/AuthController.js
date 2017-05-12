/**
 * AuthController
 *
 * @description :: Server-side logic for managing Auths
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */


var passport = require('passport');
var nodemailer = require('nodemailer');
var smtpTransport = nodemailer.createTransport(sails.config.nodemailer.mailgunTransporter);

module.exports = {
	
    _config : {
        actions : false,
        shortcuts : false,
        rest : false
    },

    signup : function(req, res) {
        var params = req.params.all();
        User.create(params, function(err, user) {
            if(err) { res.send(500, err); }
            else {
                if(sails.config.user.requireUserActivation) {
                    //res.render('email/email.ejs', {user : user}, function(err, list) {
                        var mailOptions = {
                            to : user.email,
                            from : sails.config.nodemailer.mailOptions.from,
                            subject : 'New Account Created',
                            //html : list - email attachment
                            html: '<h1> Welcome to our App </h1> Kindly activate your account <a href="' + sails.config.utilities.baseUrl + '/api/activateAccount?email=' + user.email + '&token=' + user.activationToken + '">here</a>.'
                        };

                        smtpTransport.sendMail(mailOptions, function(err) {
                            if(!err) {
                                res.send({
                                    message : 'An email has been sent to ' + user.email + ' with further instructions.'
                                });
                            }
                            else {
                                return res.status(400).send({
                                    message : 'Failure sending email.',
                                    error : err
                                });
                            }
                        });
                    //})
                }
                else {
                    res.send(200, user);
                }
            }
        });
    },

    /*
        Activates a given user based on the Id and activationToken provided.
    */
    activate : function(req, res) {
        var params = req.params.all();

        //activate the user that was requested.
        User.findOne({ email : params.email }).exec(function(err, user) {
            if((err) || (!user)) return res.send(500, '<h1>Cyon Website</h1><br/><p>Activation Failed. Please send a mail to executives.cyon.akute@gmail.com for quick resolution.</p>');
            
            if(user.activated == true) return res.send(200, '<h1>Cyon Website</h1><br/><p>Account already activated.</p>');

            if(user.activationToken !== params.token) return res.send(400, '<h1>Cyon Website</h1><br/><p>Activation Failed. Please send a mail to executives.cyon.akute@gmail.com for quick resolution.</p>');

            User.update(
                { 
                    email : params.email, 
                    activationToken : params.token 
                },
                {
                    activated : true
                },
                function(err, user) {
                    if(err) {
                        res.send(500, err);
                    }
                    else {
                        res.send(200, '<h1> Welcome to our Cyon Website </h1><br/><p>Your Account has been sucessfully activated.</p>');
                    }
                });
        });
    },

    /*
        Local login for users.
    */
    login : function(req, res) {
        passport.authenticate('local', function(err, user, info) {
            if((err) || (!user)) {
                sails.log(err);
                return res.send({
                    message : info.message,
                    user : req.user
                });
            }

            req.login(user, function(err) {
                if(err) { sails.log(err); res.send(err); }
                return res.send({
                    message : info.message,
                    user : req.user
                });
            })
        })(req, res);
    },

    /*
        Logout function for users.
    */
    logout : function(req, res) {
        req.logout();
        res.send();
    },

    /*
        forget password function for users.
    */
    forgotPassword : function(req, res) {
        var params = req.params.all();
        var mailOptions = {
            to : params.email,
            from : sails.config.nodemailer.from,
            subject : 'Reset Password required!',
            html : '<p>You can reset the password in <a href="localhost/password?email="' + params.email + '"target=" _blank" title="Reset Password required">here</a></p>'
        };

        smtpTransport.sendMail(mailOptions, function(err) {
            if(!err) {
                return res.send({
                    message : 'An email has been sent to ' + param.email + ' with further instructions.'
                });
            }
            else {
                return res.status(400).send({
                    message : 'Failure sending emails'
                });
            }
        });
    },

    /*
        password update.
    */
    password : function(req, res) {
        var params = req.params.all();
        User.update(
            {
                email : params.email
            },
            {
                password : params.password,
                passwordConfirmation : params.password
            },
            function (err, user) {
                if(err) { res.send(500, err); }
                else { res.send(200, user); }
            });
    }
};

