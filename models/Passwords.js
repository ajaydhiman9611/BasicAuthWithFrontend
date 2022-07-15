var mongoose 	= require('mongoose');
const ObjectId 	= mongoose.Schema.ObjectId;


var PasswordSchema = new mongoose.Schema(
	{
		aid             : { type : ObjectId, required : true },  // account id
        pwd			    : { type : String, required : true },  // password bcrypt level 8 here
        wrng_at		    : { type : Number, required : false , default : 0 },  // password wrong attempts
		act             : { type : Boolean , required : false , default : true } , 
	},
	{ 
		timestamps : true
	}
);
PasswordSchema.statics = {
	insert : function(password_obj_obj , cb){
		var bookmark = new Password(password_obj_obj) ;
		bookmark.save(cb);
	} ,
}


PasswordSchema.index({aid:1} , {unique : true});

const Password = mongoose.model('Passwords',PasswordSchema);
module.exports = Password;