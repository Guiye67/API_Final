const express = require("express");
const router = express.Router();
const clientMid = require("../middleware/clientMid")
const controller = require("../controllers/clientController")
const auth = require("../middleware/authentication")

router.get('/', auth.verify, controller.getAllClients);

router.get('/:id', auth.verify, clientMid.getClient, controller.getClientById);

router.post('/', clientMid.checkEmailExists, controller.createClient);

router.put('/:id', auth.verify, clientMid.getClient, clientMid.checkEmailExists, controller.updateClient);

router.delete('/:id', auth.verify, clientMid.getClient, controller.deleteClient);

router.post('/login', controller.login);

module.exports = router;