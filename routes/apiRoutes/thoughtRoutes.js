const router = require('express').Router();

const {
    getAllThoughts,
    getThoughtById,
    addThought,
    updateThought,
    deleteThought,
    postReaction,
    deleteReaction
} = require('../../controllers/thought-controller');

// get all thoughts  -   api/thoughts
router 
    .route('/')
    .get(getAllThoughts)

router
    .route('/:id')
    .get(getThoughtById)
    .put(updateThought)
    .delete(deleteThought)

router
    .route('/:userId')
    .post(addThought)

    // Why isn't this working in insomnia?
router
    .route('/:id/reactions')
    .put(postReaction)

router  
    .route('/:id/reactions/:reactionId')
    .delete(deleteReaction)

module.exports = router;