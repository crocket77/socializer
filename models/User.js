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
    thoughts: [],
    friends:[]
  });

  // create the Pizza model using the PizzaSchema
const User = model('User', UserSchema);

// export the Pizza model
module.exports = User;