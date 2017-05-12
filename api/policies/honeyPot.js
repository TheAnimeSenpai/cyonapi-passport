//used for User Controller -> create actions

module.exports = function honeyPot (req, res, next) {

    if(req.param('fakeinput') === '') {
        next();
    } else {
        res.status(400).send({
            invalidAttributes : {
                fakeinput : [{
                    message : 'Are you sure you are a Human?'
                }]
            }
        });
    }

};