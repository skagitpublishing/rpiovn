var async = require('async'),
keystone = require('keystone');
var exec = require('child_process').exec;

var security = keystone.security;

var UserAvatar = keystone.list('UserAvatar');

/**
 * List Images
 */
exports.list = function(req, res) {
        UserAvatar.model.find(function(err, items) {

                if (err) return res.apiError('database error', err);

                res.apiResponse({
                        collections: items
                });

        });
}

/**
 * Get Image by ID
 */
exports.get = function(req, res) {

        UserAvatar.model.findById(req.params.id).exec(function(err, item) {

                if (err) return res.apiError('database error', err);
                if (!item) return res.apiError('not found');

                res.apiResponse({
                        collection: item
                });

        });
}


/**
 * Update Image by ID
 */
exports.update = function(req, res) {
  
  //Ensure the user has a valid CSRF token
	//if (!security.csrf.validate(req)) {
	//	return res.apiError(403, 'invalid csrf');
	//}
  
  //Ensure the user making the request is a Keystone Admin
  //var isAdmin = req.user.get('isAdmin');
  //if(!isAdmin) {
  //  return res.apiError(403, 'Not allowed to access this API. Not Keystone Admin.');
  //}
  
  //Since it's possible to spoof the Keystone Admin setting in the current version of the User model,
  //This is a check to make sure the user is a ConnexstCMS Admin
  //var admins = keystone.get('admins');
  //var userId = req.user.get('id');
  //if(admins.indexOf(userId) == -1) {
  //  return res.apiError(403, 'Not allowed to access this API. Not ConnextCMS Admin')
  //}
  
  UserAvatar.model.findById(req.params.id).exec(function(err, item) {

    if (err) return res.apiError('database error', err);
    if (!item) return res.apiError('not found');

    var data = (req.method == 'POST') ? req.body : req.query;

    item.getUpdateHandler(req).process(data, function(err) {

      if (err) return res.apiError('create error', err);

      res.apiResponse({
              collection: item
      });

    });

  });
}

/**
 * Upload a New Image
 */
exports.create = function(req, res) {

  /*
  //Ensure the user has a valid CSRF token
	if (!security.csrf.validate(req)) {
		return res.apiError(403, 'invalid csrf');
	}
  
  //Ensure the user making the request is a Keystone Admin
  var isAdmin = req.user.get('isAdmin');
  if(!isAdmin) {
    return res.apiError(403, 'Not allowed to access this API. Not Keystone Admin.');
  }
  
  //Since it's possible to spoof the Keystone Admin setting in the current version of the User model,
  //This is a check to make sure the user is a ConnexstCMS Admin
  var admins = keystone.get('admins');
  var userId = req.user.get('id');
  if(admins.indexOf(userId) == -1) {
    return res.apiError(403, 'Not allowed to access this API. Not ConnextCMS Admin')
  }
  */
  
  var item = new UserAvatar.model(),
    data = (req.method == 'POST') ? req.body : req.query;

  item.getUpdateHandler(req).process(req.files, function(err) {

    if (err) return res.apiError('error', err);

    res.apiResponse({
            image_upload: item
    });

  });
}

/**
 * Delete Image by ID
 */
exports.remove = function(req, res) {
  /*
  //Ensure the user has a valid CSRF token
	if (!security.csrf.validate(req)) {
		return res.apiError(403, 'invalid csrf');
	}
  
  //Ensure the user making the request is a Keystone Admin
  var isAdmin = req.user.get('isAdmin');
  if(!isAdmin) {
    return res.apiError(403, 'Not allowed to access this API. Not Keystone Admin.');
  }
  
  //Since it's possible to spoof the Keystone Admin setting in the current version of the User model,
  //This is a check to make sure the user is a ConnexstCMS Admin
  var admins = keystone.get('admins');
  var userId = req.user.get('id');
  if(admins.indexOf(userId) == -1) {
    return res.apiError(403, 'Not allowed to access this API. Not ConnextCMS Admin')
  }
  */
  
	var imageId = req.params.id;
	UserAvatar.model.findById(req.params.id).exec(function (err, item) {

		if (err) return res.apiError('database error', err);
		if (!item) return res.apiError('not found');
		
		item.remove(function (err) {

			if (err) return res.apiError('database error', err);
			
      //Delete the file
      exec('rm public/uploads/images/'+imageId+'.*', function(err, stdout, stderr) { 
        if (err) { 
            console.log('child process exited with error code ' + err.code); 
            return; 
        } 
        console.log(stdout); 
      });

			return res.apiResponse({
				success: true
			});
		});
		
	});
}

