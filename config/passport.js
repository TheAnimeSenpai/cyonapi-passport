var passport = require('passport');
var localStrategy = require('passport-local').Strategy;
var bcrypt = require('bcryptjs');

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.findOne({ id : id }, function (err, user) {
        done(err, user);
    });
});

var oAuthCallback = function (token, tokenSecret, profile, done) {
    User.findOne({ uid : profile.id, provider : profile.provider}, function (err, user) {
        if(user) { return done(null, user); }
        else {
            var data = {
                provider : profile.provider,
                uid : profile.id,
                username : profile.username
            };

            var shortid = require('shortid');
            var generatePassword = require('password-generator');

            //line to generate a fake email and fake password to match the user model attributes...
            var fakeEmail = 'fake_' + new Date().getTime() + '_' + shortid.generate() + '@fake.com';
            data.email = fakeEmail;

            var password = generatePassword(12, false);
            data.password = password;

            User.create(data, function(err, user) {
                if(err) {
                    return done(err);
                }

                return done(null, user, {
                    message : 'Logged in Successfully'
                });
            });
        }
    });
}

passport.use(new localStrategy({ usernameField : 'email', passwordField : 'password' }, function () {
    User.findOne({ email : email }, function (err, user) {
        if(err) { return done(err); }
        if(!user) {
            return done(null, false, { message : 'Incorrect email.' });
        }
        bcrypt.compare(password, user.password, function (err, res) {
            if(!res) { 
                return done(null, false, { message : 'Incorrect Password' });
            }
            var returnUser = {
                username : user.username,
                createdAt : user.createdAt,
                id : user.id
            };

            return done(null, returnUser, { message : 'Logged in Successfully' });
        });
    });
}));

