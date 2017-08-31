// app/models/user.js
// load the things we need
const mongoose = require('mongoose');
const bcrypt   = require('bcrypt-nodejs'); //NOTE: more compatible with express 4


// define the schema for our user model
const UserSchema = mongoose.Schema({

    local            : {
        firstName    : String,
        lastName     : String,
        username     : {
                        type: String,
                        required: true,
                        unique: true
                      },
        password     : {
                        type: String,
                        required: true
                      },
    }

});

UserSchema.methods.apiRepr = function() {
  return {
    id: this.local._id,
    username: this.local.username || '',
    firstName: this.local.firstName || '',
    lastName: this.local.lastName || ''
  };
}

UserSchema.methods.validatePassword = function(password) {
  return bcrypt.compareSync(password, this.local.password);
}

UserSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};


//let User = mongoose.model('User', UserSchema);

// create the model for users and expose it to our app
module.exports = mongoose.model('User', UserSchema)
