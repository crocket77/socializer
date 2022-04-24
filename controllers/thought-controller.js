const { Thought, User } = require('../models');

const thoughtController = {
  getAllThoughts(req,res){
    Thought.find({})
      .select('-__v')
      .then(data=>res.json(data))
      .catch(err=>{
        console.log(err)
        res.status(400).json(err);
      })
  },

  // add thought
  addThought({ body }, res) {
    console.log(body);
    Thought.create(body)
      .then(({ _id }) => {
        console.log(_id)
        return User.findOneAndUpdate(
          { _id: body.userId },
          { $push: { thoughts: _id } },
          { new: true }
        );
      })
      .then(dbThoughtData => {
        // if (!dbThoughtData) {
        //   res.status(404).json({ message: 'No thought found with this id!' });
        //   return;
        // }
      res.json({message:'thought created'});
      })
      .catch(err => res.json(err));
  },
  getSingleThought({params},res){
    Thought.findOne({_id:params.id})
    .select('-__v')
    .then(data=>{
      if(!data){
        res.stat(404).json({message:'No thought with this id'})
      }
      res.json(data)
    })
    .catch(err=>{
      console.log(err);
      res.status(400).json(err);
    })
  },

  updateThought({params,body},res){
    Thought.findOneAndUpdate({_id:params.id}, body, {new:true, runValidators:true})
    .then(data=>{
      if(!data){
        res.status(404).json({message:'cant find this thought'})
        return;  
      }
      res.json(data)
    })
      .catch(err=>{
        console.log(err);
        res.status(400).json(err);
      })
    
  },

  // remove comment
    removeThought({ params }, res) {
      Thought.findOneAndDelete({ _id: params.id })
        .then(deletedThought => {
          if (!deletedThought) {
            return res.status(404).json({ message: 'No thought with this id to delete!' });
          }
          return User.findOneAndUpdate(
            { _id: params.userId },
            { $pull: { comments: params.thoughtId } },
            { new: true }
          );
        })
        .then(data => { 
          res.json({ message: 'thought removed' });
        })
        .catch(err => res.json(err));
    },    
    createReaction({params,body},res){
      Thought.findOneAndUpdate(
        {_id:params.thoughtId},
        {$push:{reactions:body}},
        {new:true}
      )
      .select('-__v')
      .then(data=>{
        if(!data){
          res.status(404).json({message:'No thought found with this id!'});
          return;
        }
        res.json(data);
      })
      .catch(err=>res.json(err));
    },
    removeReaction({params},res){
      Thought.findOneAndUpdate(
        {_id:params.thoughtId},
        {$pull:{comments:params.thoughtId}},
        {new:true}
      )
    .then(data=>res.json({message:"reaction removed"}))
  }

};

module.exports = thoughtController;