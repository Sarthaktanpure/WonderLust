const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose').default;

// creating the user schema
const userSchema = new mongoose.Schema({
    email : {
        type : String,
        required : true,
    },
});

// Apply plugin BEFORE creating model
userSchema.plugin(passportLocalMongoose);   // it help to implement the username,salting and and hashing automaticcaly by itself

// model
const User = mongoose.model("User", userSchema);

module.exports = User;