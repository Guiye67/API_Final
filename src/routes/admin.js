const express = require("express");
const router = express.Router();
const adminMid = require("../middleware/adminMid")
const controller = require("../controllers/adminController")
const auth = require("../middleware/authentication")

router.get('/', auth.verify, controller.getAllAdmins);

router.get('/:id', auth.verify, adminMid.getAdmin, controller.getAdminById);

router.post('/', auth.verify, adminMid.checkEmailExists, controller.createAdmin);

router.put('/:id', auth.verify, adminMid.getAdmin, adminMid.checkEmailExists, controller.updateAdmin);

router.delete('/:id', auth.verify, adminMid.getAdmin, controller.deleteAdmin);

router.post('/login', controller.login);

module.exports = router