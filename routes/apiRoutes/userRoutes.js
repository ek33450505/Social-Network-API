const router = require('express').Router();

const {
    getAllUser,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend
} = require('../../controllers/user-controller');

// Set up GET all and POST at /api/users
router
  .route('/')
  .get(getAllUser)
  .post(createUser)

// Set up GET one, PUT, and DELETE at /api/users/:id
router
  .route('/:id')
  .get(getUserById)
  .put(updateUser)
  .delete(deleteUser)

  // set up PUT and DELETE for Friends -api/users/userId/friends/friendId
  router
    .route('/:userId/friends/:friendId')
    .put(addFriend)
    .delete(deleteFriend)

module.exports = router;