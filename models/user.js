var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
    username: { type : String , unique : true, required : true },
    email: { type : String , unique : true, required : true },
    userType: { type : String , required : true },
    password: String,
    ethAddr: { type : String , unique : true, required : true }
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);