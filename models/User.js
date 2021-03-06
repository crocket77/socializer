const { Schema, model, Types } = require('mongoose');

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
        ref: 'Thought'
      }
    ],
    friends:[this]
  },
  {
    toJSON:{
      virtuals:true,
      getters:true
    },
    id:false
  }
  );


UserSchema.virtual('friendCount').get(function(){
  return this.friends.length;
});

  // create the User model using the PizzaSchema
const User = model('User', UserSchema);

// export the User model
module.exports = User;