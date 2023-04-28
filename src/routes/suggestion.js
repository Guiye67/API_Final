const express = require("express");
const router = express.Router();
const suggestionMid = require("../middleware/suggestionMid")
const controller = require("../controllers/suggestionController")
const auth = require("../middleware/authentication")

router.get('/', auth.verify, controller.getAllSuggestions);

router.get('/:id', auth.verify, suggestionMid.getSuggestion, controller.getSuggestionById);

router.post('/', auth.verify, controller.createSuggestion);

router.put('/:id', auth.verify, suggestionMid.getSuggestion, controller.updateSuggestion);

router.delete('/:id', auth.verify, suggestionMid.getSuggestion, controller.deleteSuggestion);

module.exports = router