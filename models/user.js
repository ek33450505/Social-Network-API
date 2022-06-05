const { Schema, model } = require('mongoose');

const UserSchema = new Schema(
    {
    username: {
        type: String,
        required: true,
        unique: true
        // need to add vailid email address match
    },
    thoughts: { 
        // array of id ref thought model
    },
    friends: {
        // array of _id ref the User model self reference
    }
 }
);
