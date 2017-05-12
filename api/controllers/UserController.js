/**
 * UserController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var async = require('async');
var _ = require('lodash');

module.exports = {

    getUser : function(req, res) {

    },
	
    uploadImage : function(req, res) {
        var params = req.params.all();
        if(req.method === 'GET')
            return res.json({ 'status' : 'GET not allowed' });

        var uploadFile = req.file('uploadImage');
        uploadFile.upload({ dirname : '../../assets/images/upload'}, function onUploadComplete(err, files) {
            if(err) return res.serverError(err);

            var image = files[0];
            if(image) {
                var fd = image.fd;
                var index = fd.lastIndexOf('\/');
                var imageName = fd.substring(index+1, fd.length);
                imageName = '/images/upload/' + imageName;
                req.user.imageUrl = imageName;
                delete req.user.password;
                req.user.save(function(err, users) {
                    if(err) console.log(err);
                    else console.log('success');
                });
            }
        });

        return res.send(200, imageName);
    }
};

