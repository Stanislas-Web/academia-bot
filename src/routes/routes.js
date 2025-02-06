const expres = require("express");
const router = expres.Router();
const whatsAppController = require("../controllers/whatsappControllers");

router
.get("/resto1", whatsAppController.VerifyTokenResto)
.post("/resto1", whatsAppController.ReceivedMessageResto)
.get("/bellekinoise", whatsAppController.VerifyTokenRestoBelleKinoise)
.post("/bellekinoise", whatsAppController.ReceivedMessageRestoBelleKinoise)
.get("/artcore", whatsAppController.VerifyTokenArtcore_matos)
.post("/artcore", whatsAppController.ReceivedMessageArtcore_matos)
.post("/messages", whatsAppController.SendMessage)

module.exports = router;