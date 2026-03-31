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
.get("/hosanna", whatsAppController.VerifyTokenHosanna)
.post("/hosanna", whatsAppController.ReceivedMessageHosanna)
.post("/messages", whatsAppController.SendMessage)
.get("/pepele", whatsAppController.VerifyTokenPepele)
.post("/pepele", whatsAppController.ReceivedMessagePepele)

module.exports = router;