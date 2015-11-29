// this is the controller for doctor applications
module.exports.controller = function(app){

	var mongoose = require('mongoose'); // to include the mongoose 

	var days = mongoose.model('Days'); // to include Days model

	app.get('/doctor/setTime', function (request, response){

		if(request.session.loggedIn){
			response.render('setTime.jade',{message:null});   // open the selection page
		}
		else
		{
			response.redirect('/login/form');
		}
	});

	app.get('/patient/logout', function (req,res) {
			req.session.destroy();
			res.render('login.jade',{err:null}); 
		});

	app.post('/doctor/update', function (request , response){      // logic for form handling
		var date = request.body.date; 
		var slot =[];
		// check later why can't I automate this thing
		slot.push("Nothing at slot zero")   // dummy value for slot[0]
		slot.push(request.body.slot1);
		slot.push(request.body.slot2);
		slot.push(request.body.slot3);
		slot.push(request.body.slot4);
		slot.push(request.body.slot5);
		slot.push(request.body.slot6);
		slot.push(request.body.slot7);
		slot.push(request.body.slot8);
		
		//console.log(date+" "+check);
		console.log(slot);
		days.findOne({"date":date},function (error, result){
			if(error)
			{
				console.log(error+"Happened while checking");
			}
			else if(result!=null)  // if records exist for that day, add name of doctor to it.
			{
				for(var i=1;i<9;i++)             // if the value is on, push name and email of the doctor to the array 
				{
					if(slot[i]=="on"){
						slot[i]={"name":request.session.name, "email":request.session.email}  // get name and email from sesssion
						{
								var key ="slot"+i.toString();
								key.toString();
								var query ={};
								query[key]=slot[i];
								console.log(slot[i]);
								days.findOneAndUpdate(   // !!read more about the method, key causing troubles
									{"date":date},
								    {$push: query},
								    {safe: true, upsert: true},
								    function (error, model) {
								        if(error)
										{
											console.log(error+"Some error while saving");
										}
										else
										{
											//console.log(slot);
											response.render('setTime.jade',{message:"Successfully Updated"});// redirect to update page
										}
								    }
								);
							}
						}
					}
				
			}
			else                  // if no record for that exists, create one an enter the values
			{
				for(var i=1;i<9;i++)             // if the value is on, push name and email of the doctor to the array 
					{
						if(slot[i]=="on")
							slot[i]={"name":request.session.name, "email":request.session.email}  // get name and email from session 
						else
							slot[i]={};   // if value is off, send noting
					}
				var newDay = new days({   // format of Days model
					date		: date,
					slot1		: slot[1],
					slot2		: slot[2],
					slot3		: slot[3],
					slot4		: slot[4],
					slot5		: slot[5],
					slot6		: slot[6],
					slot7		: slot[7],
					slot8		: slot[8]
					});

				newDay.save(function (error){
					if(error)
					{
						console.log(error+"Some error while saving");
					}
					else
					{
						//console.log(slot);
						response.render('setTime.jade',{message:"Successfully Updated"});   // redirect again to update page
					}
				});
			}
		});
	});

	app.get('/check', function (request, response){
		days.find({}, function (err, result){
			if(err)
			{
				console.log(err+" This is show function");
			}
			else
			{
				response.send(result);
			}
		});
	});
}