const { User } = require('../models');

const userController = {
          // get all users
          getAllUser(req, res) {
           User.find({})
              .select('-__v')
              .then(dbUserData => res.json(dbUserData))
              .catch(err => {
                console.log(err);
                res.status(400).json(err);
              });
          },
        
          // get one user by id
          getUserById({ params }, res) {
            User.findOne({ _id: params.id })
              .then(dbUserData => {
                // If no pizza is found, send 404
                if (!dbUserData) {
                  res.status(404).json({ message: 'No User found with this id!' });
                  return;
                }
                res.json(dbUserData);
              })
              .catch(err => {
                console.log(err);
                res.status(400).json(err);
              });
          },
          //create user
          createUser({ body }, res) {
            User.create(body)
              .then(dbUserData => res.json({message:'user created'}))
              .catch(err => res.status(400).json(err));
          },
          updateUser({ params, body}, res) {
            User.findOneAndUpdate({_id: params.id}, body, {new: true, runValidators: true})
                .then(data => {
                    if(!data){
                        res.status(404).json( {message: 'No user found with this id!'})
                        return
                    }
                    res.json(data)
                })
                .catch(err => res.status(400).json(err))
            },
            deleteUser({ params }, res) {
                User.findOneAndDelete({ _id: params.id})
                    .then(data => {
                        if(!data) {
                            res.status(404).json({ message: 'No user found with this id!'})
                            return;
                        }
                        res.json(data)
                    })
                    .catch(err => res.status(400).json(err))
            },
            addFriend({params}, res){
              User.findOneAndUpdate(
                {_id:params.userId},
                {$push: {friends:params.friendId}},
                {new:true}
                )
                .then(data=>{
                  if(!data){
                    res.status(404).json({message:'No user found with this id!'});
                    return;
                  }
                  res.json(data)
                })
                .catch(err=>res.json(err))
            },
            deleteFriend({params},res){
              User.findOneAndUpdate(
                {_id:params.userId},
                {$pull:{friends:params.friendId}},
                {new:true}
              )
              .then(data=>res.json({message:'friend deleted'}))
              .catch(err=>res.json(err));
            }
          }


module.exports = userController;