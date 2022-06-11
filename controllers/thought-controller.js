const { Thought, User } = require('../models');

const thoughtController = {
    // get all thoughts
    getAllThoughts(req, res) {
        Thought.find({})
            .populate({
                path: 'reactions',
                select: '-__v'
            })
            .select('-__v')
            .sort({ _id: -1 })
            .then(thoughtData => res.json(thoughtData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    // get a single thought -   api/thoughts/:thought_id
    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.id })
        .populate({
            path: 'reactions',
            select: '-__v'
        })
        .select('-__v')
        .then(thoughtData => res.json(thoughtData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },

    // create a new thought   -   api/thoughts/:thought_id   -   thoughtText, username
    addThought({ params, body }, res) {
        console.log(body);
        Thought.create(body)
        .then(({ _id }) => {
            return User.findOneAndUpdate(
                { _id: params.userId },
                { $push: { thoughts: _id } },
                { new: true }
              );
        })
        .then(thoughtData => {
            if (!thoughtData) {
              res.status(404).json({ message: 'No user found with this id!, Try again' });
              return;
            }
            res.json(thoughtData);
          })
          .catch(err => res.json(err));
    },

    // update a thought   -   api/thoughts/:thought_id  
    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.id }, body, { new: true })
        .then(thoughtData => {
            if(!thoughtData) {
                res.status(404).json({ message: 'No thought found with this id!, Try again'});
                return;
            }
            res.json(thoughtData);
        })
        .catch(err => res.status(400).json(err));
    },

    // delete a thought   -   api/thoughts/:thought_id
    deleteThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.id })
        .then(thoughtData => {
            if (!thoughtData) {
                res.status(404).json({ message: 'No thought found with this id! Try again!' });
                return;
            }
            res.json(thoughtData)
        })
        .catch(err => res.status(400).json(err));
    },

    // post reaction to thought   -   api/thoughts/:thoughtId/reactions
    postReaction({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.id },
            {$push: { reactions: body } },
            { new: true, runValidators: true }
            )
            .then(thoughtData => {
                if(!thoughtData) {
                    res.status(404).json({ message: 'No thought found with this id!'});
                    return;
                }
                res.json(thoughtData)
            })
            .catch(err => res.status(400).json(err));
    },

    // delete a reaction   -   api/thoughts/:thoughtId/reactions/:reactionId
    deleteReaction({ params }, res) {
        Thought.findOneAndUpdate (
            { _id: params.id },
            { $pull: { reactions: { _id: params.reactionId } } },
            { new: true, runValidator: true }
        )
        .then(thoughtData => res.json(thoughtData))
        .catch(err => res.json(err));
    }

}



module.exports = thoughtController;