//Used for the user Controller --> Create Actions
module.exports = function termsAndConditions (req, res, next) {

    if(!req.param('terms')) {
        res.status(400).send({
            invalidAttributes : {
                terms : [
                    {
                        message: 'You are to accept our Terms before signup!'
                    }
                ]
            }
        });
    }
    else {
        next();
    }
};