const { Thought, User } = require('../models');

const thoughtController = {
  // add comment to pizza
  addThought({ params, body }, res) {
    console.log(body);
    Thought.create(body)
      .then(({ _id }) => {
        console.log(_id)
        return User.findOneAndUpdate(
          { _id: params.userId },
          { $push: { thoughts: _id } },
          { new: true }
        );
      })
      .then(dbThoughtData => {
        if (!dbThoughtData) {
          res.status(404).json({ message: 'No thought found with this id!' });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch(err => res.json(err));
  },

  // remove comment
    removeThought({ params }, res) {
      Thought.findOneAndDelete({ _id: params.commentId })
        .then(deletedThought => {
          if (!deletedThought) {
            return res.status(404).json({ message: 'No comment with this id!' });
          }
          return User.findOneAndUpdate(
            { _id: params.userId },
            { $pull: { comments: params.thoughtId } },
            { new: true }
          );
        })
        .then(dbPizzaData => {
          if (!dbPizzaData) {
            res.status(404).json({ message: 'No pizza found with this id!' });
            return;
          }
          res.json(dbPizzaData);
        })
        .catch(err => res.json(err));
    }
};

module.exports = thoughtController;