const express = require("express");
const router = express.Router();
const dietMid = require("../middleware/dietMid")
const controller = require("../controllers/dietController")
const auth = require("../middleware/authentication")

router.get('/', auth.verify, controller.getAllDiets);

router.get('/:id', auth.verify, dietMid.getDiet, controller.getDietById);

router.get('/byClient/:clientId', auth.verify, controller.getDietByClient);

router.post('/', auth.verify, controller.createDiet);

router.put('/:id', auth.verify, dietMid.getDiet, controller.updateDiet);

router.delete('/:id', auth.verify, dietMid.getDiet, controller.deleteDiet);

module.exports = router