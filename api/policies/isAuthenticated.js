module.exports = function (req, res, next) {

    if(req.isSocket) {
        if(req.session && req.session.passport && req.session.passport.user) {
            
            //Use this : 
            //Initialize Passport
            sails.config.passport.Initialize() (req, res, function () {

                //Use the built in session
                sails.config.passport.session() (req, res, function () {

                    //Make the user available through the frontend
                    //res.locals.user = req.user;
                    //the user should be deserialized by passport now;

                    next();
                })
            });

            //or use this if you don't careabout deserializing the user
            /*
            req.user = req.session.passport.user;
            return next();
            */
        }
        else {
            res.json(401);
        }
    }
    else if (req.isAuthenticated()) {
        return next();
    }
    else {
        //user is not allowed...
        //(default res.forbidden() behaviour can be overidden in 'config/403')
        return res.redirect('/login');
    }

};