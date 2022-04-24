const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const ReactionSchema= new Schema(
  {
    reactionId:{
      type: Schema.Types.ObjectId,
      default:()=>new Types.ObjectId()
    },
    replyBody:{
      type:String,
      required:true
    },
    writtenBy:{
      type:String,
      required:true
    },
    createdAt:{
      type:Date,
      default:Date.now,
      get:createdAtVal => dateFormat(createdAtVal)
    },
  },
);

const ThoughtSchema = new Schema({
  thoughtBody: {
    type: String,
    required:true,
    maxlength:280,
    minlength:1
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get:createdAtVal => dateFormat(createdAtVal)
  },
  username:{
    type:String,
    required:true
  },
  reactions:[ReactionSchema]
},
  {
    toJSON:{
      virtuals:true
    },
    id:false
  }
);

const Thought= model('Thought', ThoughtSchema);

module.exports = Thought;