const { Schema, model } = require('mongoose');

const UserSchema = new Schema(
    {
    username: {
        type: String,
        required: 'You must provie a unique username to continue',
        trim: true,
        unique: true
    },
    email: {
        type: String,
        required: 'You must provide a vaild email address to continue',
        unique: true,
        match: [/^([a-zA-Z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/]
    },
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Thought'
        }
    ],
    friends: [
        {
            type: Schema.Types.ObjectId, ref: 'User'
        }
    ],
},

    {
        toJSON: {
            virtuals: true,
            getters: true
        }
    }
);

UserSchema.virtual('friendCount').get(function() {
    return this.friends.length;
});

// create the User model using the UserSchema
const User = model('User', UserSchema);

module.exports = User;