const router = require('express').Router();
const { getAllThoughts,getSingleThought, addThought, updateThought, removeThought } = require('../../controllers/thought-controller');

router.route('/').get(getAllThoughts)

// /api/<userId>
router.route('/:id').get(getSingleThought).put(updateThought).delete(removeThought);

// /api/<userId>
router.route('/:userId').post(addThought);

// /api/comments/<pizzaId>/<commentId>
router.route('/:userId/:thoughtId').delete(removeThought);

module.exports = router;