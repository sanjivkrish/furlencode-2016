'use strict';

var _ = require('lodash');
var fs = require('fs');
var count = 1;
// Get list of ratings
exports.index = function(req, res) {
	var obj = {
		userId: req.body.user.data.id,
		user: req.body.user.data.name,
		rating: req.body.data.value,
		comment: req.body.data.comment
	};
	fs.writeFile(count + '.json', JSON.stringify(obj), function () {
		console.log('File created');
		count += 1;
	});
  	res.json([]);
};