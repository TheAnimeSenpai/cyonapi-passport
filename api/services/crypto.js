var bcrypt = require('bcryptjs');
var crypto = require('crypto');

module.exports = {
    /*
        Generate a bycrpt hash from input
        @param {object}                     options objects of options
        @param {string} input               the input to be hashed
        @param {function} cb[err, hash]     the callback to call when hashing is finished
    */

    generate : function(options, input, cb) {
        var saltComplexity = options.saltComplexity || 10;
        bcrypt.genSalt(saltComplexity, function(err, salt) {
            bcrypt.hash(input, salt, function(err, hash) {
                if(err) return cb(err);
                return cb(null, hash);
            });
        });
    },

    /*
        Compares a given string against a hash,
        bcrypt.compare returns true/false whether there's a match or not
        @param {string} input               the string to use to compare
        @param {string} hash                the hash to compare the input against
        @param {function} cb[booloan]       the callback to call when comparison is done
    */

    compare : function(input, hash, cb) {
        bcrypt.compare(input, hash, function(err, res) {
            return cb(res);
        });
    },

    /*
        Generate an md5 token from input
        @param {string} input               the input to be hashed
        @param {function} cb[err, hash]     the callback to call when hashing is finished
    */

    token : function(input) {
        var hash = crypto.createHash('md5').update(input).digest('hex');
        return hash;
    }
}