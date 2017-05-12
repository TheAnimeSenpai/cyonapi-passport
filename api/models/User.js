/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

var bcrypt = require('bcryptjs');

module.exports = {

  schema : true,

  types : {
      password : function(password) {
          return password === this.passwordConfirmation;
      }
  },

  attributes: {
      userId : {
          type : 'string',
          required : true,
          primaryKey: true,
          unique: true
      },
      imageUrl : {
          type : 'string'
      },
      surname : {
          type : 'string',
          required : true
      },
      middlename : {
          type : 'string'
      },
      firstname : {
          type : 'string',
          required : true
      },
      dateOfBirthDay : {
          type : 'integer',
          required : true
      },
      dateOfBirthMonth : {
          type : 'integer',
          required : true
      },
      dateOfBirthYear : {
          type : 'integer',
          required : true
      },
      username : {
          type : 'string',
          unique: true,
          required : true
      },
      password : {
          type : 'string',
          password : true,
          required : true,
          minLength : 8
      },
      passwordConfirmation : {
          type : 'string'
      },
      state : {
          type : 'string',
          enum : ['pending', 'approved', 'denied'],
          defaultsTo : 'pending'
      },
      provider : {
          type : 'string',
          enum : ['local', 'facebook'],
          defaultsTo : 'local'
      },
      activated : {
          type : 'boolean',
          defaultsTo : false
      },
      activationToken : {
          type : 'string'
      },
      mobile : {
          type : 'string',
          size : 11,
          required : true
      },
      email : {
          type : 'email',
          unique: true,
          required : true
      },
      createdAt : {
          type : 'datetime',
          required : true
      },
      toJSON : function() {
          var obj = this.toObject();
          delete obj.password;
          return obj;
      }
  },

  beforeValidate : function(user, cb) {
      if(user.hasOwnProperty('fakeinput')) delete user.fakeinput;
      cb();
  },

  afterValidate : function(user, cb) {
      if(user.hasOwnProperty('passwordConfirmation')) delete user.passwordConfirmation;
      cb();
  },

  beforeCreate : function(user, cb) {
      crypto.generate({ saltComplexity : 10}, user.password, function(err, hash) {
          if(err) return cb(err);
          else {
            user.password = hash;
            user.activated = false;
            user.activationToken = crypto.token(new Date().getTime() + user.email);

            return cb(null, user);
          }
      })
  },

  beforeUpdate : function(user, cb) {
      if(user.password) {
          crypto.generate({ saltComplexity : 10}, user.password, function(err, hash) {
              if(err) return cb(err);
              else {
                  user.password = hash;
                  return cb(null, user);
              }
          });
      }
      else {
          return cb(null, user);
      }
  }
};

