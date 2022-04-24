const { Schema, model } = require('mongoose');

const ThoughtSchema = new Schema({
  thoughtBody: {
    type: String,
    required:true,
    maxlength:280,
    minlength:1
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  username:{
    type:String,
    required:true
  },
},
  // {
  //   toJSON:{
  //     getters:true,
  //     virtuals:true
  //   },
  //   id:false
  // }
);

const Thought= model('Thought', ThoughtSchema);

module.exports = Thought;