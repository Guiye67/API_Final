const express = require("express");
const router = express.Router();
const classMid = require("../middleware/classMid")
const controller = require("../controllers/classController")
const auth = require("../middleware/authentication")

router.get('/', auth.verify, controller.getAllClasses);

router.get('/:id', auth.verify, classMid.getClass, controller.getClassById);

router.get('/signedUp/:clientId', auth.verify, controller.getClassBySignedUp);

router.post('/', auth.verify, controller.createClass);

router.put('/:id', auth.verify, classMid.getClass, controller.updateClass);

router.delete('/:id', auth.verify, classMid.getClass, controller.deleteClass);

module.exports = router