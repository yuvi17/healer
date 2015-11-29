// this is model for days

var mongoose = require('mongoose');  // import the mongoose module

var Schema = mongoose.Schema;     // create object of Schema class

var daySchema = new Schema ({

	date   : {type:String,default:""}, // stores the date of a particular day.
	slot1  : [],    // will store array of doctors from 7-9 a.m.
	slot2  : [],  	// 9-11
	slot3  : [],	// 11 -1
	slot4  : [],	// 1-3
	slot5  : [],	// 3-5
	slot6  : [],	// 5-7
	slot7  : [],	// 7-9
	slot8  : []	// 9-11

});


mongoose.model('Days',daySchema);  // save the schema