const router = require('express').Router();
const { addThought, removeThought } = require('../../controllers/thought-controller');

// /api/comments/<pizzaId>
router.route('/:userId').post(addThought);

// /api/comments/<pizzaId>/<commentId>
router.route('/:userId/:thoughtId').delete(removeThought);

module.exports = router;