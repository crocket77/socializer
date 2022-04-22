const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
    username: {
      type: String,
      required:true,
      trim:true
    },
    email: {
      type: String,
      required:true,
      validate:{
          validator(isEmail){
              return /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(isEmail);
          },
          message:"That email was not valid. Please enter a valid one"          
      }
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'thoughts'
      }
    ],
    friends:[]
  });

// get total count of thoughts and replies on retrieval
UserSchema.virtual('thoughtCount').get(function() {
  return this.thoughts.length;
});

  // create the User model using the PizzaSchema
const User = model('User', UserSchema);

// export the User model
module.exports = User;