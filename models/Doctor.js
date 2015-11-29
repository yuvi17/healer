// this is a model for Doctors

var mongoose = require('mongoose');
 var Schema = mongoose.Schema;

var blogSchema = new Schema ({
	_id			:{type:Number, default:""},
	email 		:{type:String, default:""},
	password 	:{type:String, default:""},
	name        :{firstName:"",lastName:""}

});

mongoose.model('Doctor',blogSchema);