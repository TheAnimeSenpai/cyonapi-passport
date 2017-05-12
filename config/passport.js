var passport = require('passport');
var localStrategy = require('passport-local').Strategy;
var bcrypt = require('bcryptjs');

passport.serializeUser(function (user, done) {
    done(null, user.userId);
    //done(null, user);
});

passport.deserializeUser(function (userId, done) {
    User.findOne({ userId : userId }, function (err, user) {
        done(err, user);
    });
    //done(null, user);
});

var oAuthCallback = function (token, tokenSecret, profile, done) {
    User.findOne({ uid : profile.id, provider : profile.provider}, function (err, user) {
        if(user) { sails.log(profile); return done(null, user); }
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
};

passport.use(new localStrategy({ usernameField : 'email', passwordField : 'password' }, function (email, password, done) {
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
                userId : user.userId
            };

            return done(null, returnUser, { message : 'Logged in Successfully' });
        });
    });
}));

