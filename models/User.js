const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
    username: {
      type: String,
      require:true
    },
    email: {
      type: String,
      require:true
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    size: {
      type: String,
      default: 'Large'
    },
    thoughts: [],
    friends:[]
  });

  // create the Pizza model using the PizzaSchema
const User = model('User', UserSchema);

// export the Pizza model
module.exports = User;