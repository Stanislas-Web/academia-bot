
const whatsappModel = require("../shared/whatsappmodels");
const whatsappService = require("../services/whatsappService");
const whatsappServiceResto = require("../services/whatsappServiceResto");
const { messageResponse } = require("../shared/message");

function getCandidatesData() {
    return [
        { title: "LES CRACKS", image: "", votes: 27925, video: "" },
        { title: "BKG SUPREME", image: "", votes: 1735, video: "" },
        { title: "DJAUST POUNGA", image: "", votes: 1312, video: "" }
    ];
}

function getCategoriesResto(idResto) {
    return {
        restoName: "Mon Restaurant",
        photoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Good_Food_Display_-_NCI_Visuals_Online.jpg/1200px-Good_Food_Display_-_NCI_Visuals_Online.jpg",
        data: [
            { _id: "cat1", name: "Entrées", description: "Nos délicieuses entrées" },
            { _id: "cat2", name: "Plats principaux", description: "Nos savoureux plats principaux" },
            { _id: "cat3", name: "Desserts", description: "Nos gourmands desserts" },
            { _id: "cat4", name: "Boissons", description: "Nos boissons fraîches" }
        ]
    };
}

function getZonesResto(idResto) {
    return [
        { _id: "zone1", district: "Lukunga", commune: "Ngaliema", deliveryCoast: 5 },
        { _id: "zone2", district: "Lukunga", commune: "Kintambo", deliveryCoast: 5 },
        { _id: "zone3", district: "Funa", commune: "Kalamu", deliveryCoast: 3 },
        { _id: "zone4", district: "Funa", commune: "Bumbu", deliveryCoast: 3 },
        { _id: "zone5", district: "Mont-amba", commune: "Lemba", deliveryCoast: 4 },
        { _id: "zone6", district: "Mont-amba", commune: "Ngaba", deliveryCoast: 4 },
        { _id: "zone7", district: "Tshangu", commune: "Masina", deliveryCoast: 6 },
        { _id: "zone8", district: "Tshangu", commune: "N'djili", deliveryCoast: 6 }
    ];
}

function getTableResto(idResto) {
    return [
        { _id: "table1", number: "1" },
        { _id: "table2", number: "2" },
        { _id: "table3", number: "3" },
        { _id: "table4", number: "4" },
        { _id: "table5", number: "5" }
    ];
}

function getPlatsByIdNumberAndCategory(idResto, category) {
    const menu = {
        "Entrées": [
            { _id: "p1", name: "Salade César", price: 5, description: "Salade fraîche avec poulet grillé", photoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Caesar_salad_%281%29.jpg/1200px-Caesar_salad_%281%29.jpg" },
            { _id: "p2", name: "Soupe du jour", price: 3, description: "Soupe maison de la journée", photoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Soupe_de_potiron.jpg/1200px-Soupe_de_potiron.jpg" }
        ],
        "Plats principaux": [
            { _id: "p3", name: "Poulet rôti", price: 12, description: "Poulet rôti aux herbes avec frites", photoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Roast_chicken.jpg/1200px-Roast_chicken.jpg" },
            { _id: "p4", name: "Poisson grillé", price: 10, description: "Poisson frais grillé avec légumes", photoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Grilled_fish.jpg/1200px-Grilled_fish.jpg" }
        ],
        "Desserts": [
            { _id: "p5", name: "Gâteau au chocolat", price: 4, description: "Fondant au chocolat maison", photoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/A_small_cup_of_coffee.JPG/1200px-A_small_cup_of_coffee.JPG" }
        ],
        "Boissons": [
            { _id: "p6", name: "Jus de fruit frais", price: 2, description: "Jus pressé du jour", photoUrl: "" },
            { _id: "p7", name: "Eau minérale", price: 1, description: "Eau minérale fraîche", photoUrl: "" }
        ]
    };
    return menu[category] || [];
}


async function OTP(textUser, number, idNumber, token, numberServer) {

    let modelMessage = whatsappModel.MessageText(textUser, number);
    whatsappServiceResto.SendMessageWhatsAppRestoWithParams(modelMessage, idNumber, token);
}


async function Process(textUser, number) {
    let helloMessage = "Bonjour, Resto c'est un plaisir de vous saluer. 👋";
    let models = [];



    // Données candidates locales
    const candidatesData = getCandidatesData();

    switch (true) {
        case textUser.toLowerCase().includes("bsr") || textUser.toLowerCase().includes("bonjour") || textUser.toLowerCase().includes("bonsoir") || textUser.toLowerCase().includes("salut") || textUser.toLowerCase().includes("slt") || textUser.toLowerCase().includes("bjr") || textUser.toLowerCase().includes("mbote") || textUser.toLowerCase().includes("hello"):

            let modelMessage = whatsappModel.MessageText(helloMessage, number);
            models.push(modelMessage);




            let modelMenuFirst = whatsappModel.MessageComprar(number);
            models.push(modelMenuFirst);



            break;
        case textUser.includes("Liste des candidats"):

            console.log("notre tableau " + candidatesData);

            for (let i = 0; i < candidatesData.length; i++) {

                let modelMenuCandidat = whatsappModel.SectionCandidat(number, candidatesData[i].image, candidatesData[i].title, candidatesData[i].votes, candidatesData[i].video);
                // models.push(modelMenuCandidat);
                whatsappService.SendMessageWhatsApp(modelMenuCandidat);
            }

            break;

        case textUser.includes("Vidéo"):

            let splitSketch = textUser.split(" ");
            let fetchNameCandidate = candidatesData.find(candidate => candidate.title.includes(splitSketch[2]));




            let videoCandidat = whatsappModel.VideoCandidate(number, fetchNameCandidate.video, fetchNameCandidate.title, fetchNameCandidate.votes);
            whatsappService.SendMessageWhatsApp(videoCandidat);


            break;

        case (textUser.includes("Participer aux votes") || textUser.toLowerCase().includes("voter")):
            // Réponse locale : afficher la liste des candidats pour voter
            {
                let modelListCandidat2 = whatsappModel.MessageRael(number, candidatesData);
                whatsappService.SendMessageWhatsApp(modelListCandidat2);
            }
            break;

        case (textUser.includes("À propos") || textUser.toLowerCase().includes("à propos")):
            let modelMenuFirst2 = whatsappModel.MessageApropos(number);
            models.push(modelMenuFirst2);
            break;
        default:
            // Réponse locale : message non compris
            models = [];
            messageResponse("Je ne comprends pas ce que vous dites", number);
            {
                let modelMenuSecond = whatsappModel.MessageComprar(number);
                whatsappService.SendMessageWhatsApp(modelMenuSecond);
            }
            break;
    }

    models.forEach(model => {
        whatsappService.SendMessageWhatsApp(model);
    });
}



// process Resto

async function ProcessResto(textUser, number, idNumber, token, numberServer, idResto) {




    // Données locales
    const categoriesData = getCategoriesResto(idResto);
    const zonesData = getZonesResto(idResto);
    const tableData = getTableResto(idResto);

    const loadingMessage = "Un instant s'il vous plaît...⏳";

    const helloMessage = `Salut et bienvenue chez *${categoriesData.restoName}* !👋🏽`;

    switch (true) {
        case textUser.toLowerCase().includes("bsr") || textUser.toLowerCase().includes("bonjour") || textUser.toLowerCase().includes("bonsoir") || textUser.toLowerCase().includes("salut") || textUser.toLowerCase().includes("slt") || textUser.toLowerCase().includes("bjr") || textUser.toLowerCase().includes("mbote") || textUser.toLowerCase().includes("hello"):
            let modelMessage = whatsappModel.MessageText(helloMessage, number);

            whatsappServiceResto.SendMessageWhatsAppRestoWithParams(modelMessage, idNumber, token);

            let modelMenuFirst = whatsappModel.MenuListResto(number, categoriesData);
            whatsappServiceResto.SendMessageWhatsAppRestoWithParams(modelMenuFirst, idNumber, token);

            break;

        case textUser.includes("pay"):
            let modelMessagePayment = whatsappModel.MessagePayment(number);
            whatsappServiceResto.SendMessageWhatsAppRestoWithParams(modelMessagePayment, idNumber, token);

            break;

        case (textUser.toLowerCase() == "table"):
            // Réponse locale : table assignée
            {
                let modelMessagePaymentTable = whatsappModel.MessagePayment(number);
                whatsappServiceResto.SendMessageWhatsAppRestoWithParams(modelMessagePaymentTable, idNumber, token);
            }
            break;


        case textUser.includes("Payez à la livraison"):
            // Réponse locale simulée
            {
                const modelLoading2 = whatsappModel.MessageText(loadingMessage, number);
                whatsappServiceResto.SendMessageWhatsAppRestoWithParams(modelLoading2, idNumber, token);

                const localFinish = {
                    data: [
                        { qte: 1, name: "Poulet rôti", price: 12 },
                        { qte: 2, name: "Jus de fruit frais", price: 2 }
                    ],
                    table: "table 3",
                    adresse: "null",
                    deliveryCoast: 0,
                    totalAmountUsdDelivery: 16,
                    totalAmountCdfDelivery: 40000,
                    pdfPath: "facture_locale.pdf"
                };

                const orderMessage = localFinish.data.map(order => `${order.qte} x ${order.name} : ${order.qte * order.price} $`).join("\n ");
                const regex = /table\s\d+/;
                const deliveryCoast = localFinish.deliveryCoast;
                const formatDeliveryCoast = deliveryCoast == 0 ? `` : `*${deliveryCoast}* $ pour la livraison`;
                const formatAdress = localFinish.adresse == "null" ? `` : localFinish.adresse;
                const messageFormat = regex.test(localFinish.table) ? `Votre commande pour la` : `Votre adresse de livraison est`;
                const messageFormatServer = regex.test(localFinish.table) ? `il y'a une commande pour la` : `il y'a une livraison pour`;

                let modelMsgCash = whatsappModel.MessageText(`${messageFormat}\n📍 *${localFinish.table}, ${formatAdress}* : \n${formatDeliveryCoast} | le montant total *${localFinish.totalAmountUsdDelivery} $* ou *${localFinish.totalAmountCdfDelivery} Fc*  \n ${orderMessage}`, number);
                whatsappServiceResto.SendMessageWhatsAppRestoWithParams(modelMsgCash, idNumber, token);

                let modelMsgServeur = whatsappModel.MessageText(`${messageFormatServer}\n📍 *${localFinish.table}, ${formatAdress}* : \n${formatDeliveryCoast} | le montant total *${localFinish.totalAmountCdfDelivery} Fc* ou *${localFinish.totalAmountUsdDelivery} $* \n ${orderMessage}`, numberServer);
                whatsappServiceResto.SendMessageWhatsAppRestoWithParams(modelMsgServeur, idNumber, token);

                const modelMessageClientCash = whatsappModel.MessageText(`le numero du client est : +${number}`, numberServer);
                whatsappServiceResto.SendMessageWhatsAppRestoWithParams(modelMessageClientCash, idNumber, token);
            }
            break;

        case textUser.includes("Carte"):
            // Réponse locale simulée paiement par carte
            {
                const localFinishCarte = {
                    data: [
                        { qte: 1, name: "Poulet rôti", price: 12 },
                        { qte: 2, name: "Jus de fruit frais", price: 2 }
                    ],
                    table: "table 3",
                    deliveryCoast: 0,
                    totalAmountUsdDelivery: 16,
                    totalAmountCdfDelivery: 40000,
                    pdfPath: "facture_locale.pdf",
                    urlPayment: "https://pay.example.com/checkout/demo"
                };

                const orderMessageCarte = localFinishCarte.data.map(order => `${order.qte} x ${order.name} : ${order.qte * order.price} $`).join("\n ");
                const regexCarte = /table\s\d+/;
                const deliveryCoastCarte = localFinishCarte.deliveryCoast;
                const formatDeliveryCoastCarte = deliveryCoastCarte == 0 ? `` : `${deliveryCoastCarte} $ pour la livraison`;
                const messageFormatCarte = regexCarte.test(localFinishCarte.table) ? `Votre commande pour la` : `Votre adresse de livraison est`;
                const messageFormatServerCarte = regexCarte.test(localFinishCarte.table) ? `il y'a une commande pour la` : `il y'a une livraison pour`;

                let modelMsgCarte = whatsappModel.MessageText(`${messageFormatCarte} ${localFinishCarte.table} : ${formatDeliveryCoastCarte} | le montant total ${localFinishCarte.totalAmountUsdDelivery} $ ou ${localFinishCarte.totalAmountCdfDelivery} Fc  \n ${orderMessageCarte}`, number);
                whatsappServiceResto.SendMessageWhatsAppRestoWithParams(modelMsgCarte, idNumber, token);

                let modelMsgServeurCarte = whatsappModel.MessageText(`${messageFormatServerCarte} ${localFinishCarte.table} : ${formatDeliveryCoastCarte} | le montant total ${localFinishCarte.totalAmountCdfDelivery} Fc ou ${localFinishCarte.totalAmountUsdDelivery} $ \n ${orderMessageCarte}`, numberServer);
                whatsappServiceResto.SendMessageWhatsAppRestoWithParams(modelMsgServeurCarte, idNumber, token);

                let messagePaiementCarte = `Cliquez sur le lien pour finaliser le paiement : 💳 \n${localFinishCarte.urlPayment}`;
                let modelPaymentCarte = whatsappModel.MessageText(messagePaiementCarte, number);
                whatsappServiceResto.SendMessageWhatsAppRestoWithParams(modelPaymentCarte, idNumber, token);

                const modelMessageClientCarte = whatsappModel.MessageText("le numero du client est : +" + number, numberServer);
                whatsappServiceResto.SendMessageWhatsAppRestoWithParams(modelMessageClientCarte, idNumber, token);
            }
            break;

        case textUser.toLowerCase().includes("taxi"):
            let modelLocation = whatsappModel.GetLocation(number);
            whatsappServiceResto.SendMessageWhatsAppRestoWithParams(modelLocation, idNumber, token);

            break;

        case textUser.toLowerCase().includes("adresse"):
            let modelAdresse = whatsappModel.SendAdress(number);
            whatsappServiceResto.SendMessageWhatsAppRestoWithParams(modelAdresse, idNumber, token);

            break;
        case textUser.includes("OUI"):

            const modelMenuFirst2 = whatsappModel.MenuListResto(number, categoriesData);
            whatsappServiceResto.SendMessageWhatsAppRestoWithParams(modelMenuFirst2, idNumber, token);

            break;

        case textUser.includes("NON"):

            const lukungaFetch = zonesData.filter((zone) => zone.district == "Lukunga");
            const modelZone2 = whatsappModel.MenuListZone(number, lukungaFetch, "Lukunga");
            whatsappServiceResto.SendMessageWhatsAppRestoWithParams(modelZone2, idNumber, token);


            const funaFetch = zonesData.filter((zone) => zone.district == "Funa");
            const modelZone3 = whatsappModel.MenuListZone(number, funaFetch, "Funa");
            whatsappServiceResto.SendMessageWhatsAppRestoWithParams(modelZone3, idNumber, token);


            const MontAmbaFetch = zonesData.filter((zone) => zone.district == "Mont-amba");
            const modelZone = whatsappModel.MenuListZone(number, MontAmbaFetch, "Mont-amba");
            whatsappServiceResto.SendMessageWhatsAppRestoWithParams(modelZone, idNumber, token);

            const tshanguFetch = zonesData.filter((zone) => zone.district == "Tshangu");
            const modelZone4 = whatsappModel.MenuListZone(number, tshanguFetch, "Tshangu");
            whatsappServiceResto.SendMessageWhatsAppRestoWithParams(modelZone4, idNumber, token);


            break;
        case textUser.includes("Restaurant"):

            const modelTable = whatsappModel.MenuListTable(number, tableData);
            whatsappServiceResto.SendMessageWhatsAppRestoWithParams(modelTable, idNumber, token);

            break;

        case textUser.includes("🛒"):
            // Réponse locale : commande ajoutée avec statut pending
            {
                const chaine = textUser;
                const mots = chaine.split(" ");
                const nouvelleChaine = mots.slice(2).join(" ");
                console.log("chaine de commande " + nouvelleChaine);

                let modelMsgOrder = whatsappModel.MessageText(`Combien de ${nouvelleChaine} souhaitez-vous?`, number);
                whatsappServiceResto.SendMessageWhatsAppRestoWithParams(modelMsgOrder, idNumber, token);
            }
            break;

        case (!isNaN(parseInt(textUser.trim())) && textUser.trim().length < 5):
            // Réponse locale : quantité mise à jour
            {
                let modelMessagePlace1AutreChose = whatsappModel.MessagePlace(number, categoriesData.photoUrl);
                whatsappServiceResto.SendMessageWhatsAppRestoWithParams(modelMessagePlace1AutreChose, idNumber, token);
            }
            break;


        default:

            const findCategory = categoriesData.data.find((category) => category.name === textUser);
            const findZone = zonesData.find((zone) => zone.commune === textUser);

            if (findCategory) {

                const modelLoading = whatsappModel.MessageText(loadingMessage, number);
                whatsappServiceResto.SendMessageWhatsAppRestoWithParams(modelLoading, idNumber, token);

                // Données locales des plats
                const plats = getPlatsByIdNumberAndCategory(idResto, textUser);

                for (let i = 0; i < plats.length; i++) {
                    let modelMenuCandidat = whatsappModel.SectionPlats(number, plats[i].photoUrl, plats[i].name, plats[i].price, plats[i].description);
                    whatsappServiceResto.SendMessageWhatsAppRestoWithParams(modelMenuCandidat, idNumber, token);
                }

            } else if (findZone) {

                // Réponse locale : zone de livraison enregistrée
                let modelMessageZone = whatsappModel.MessageText(`Fournissez des informations détaillées sur votre adresse, par exemple : *Q\ Ma Campagne, Av\ nguma, N 129*.`, number);
                whatsappServiceResto.SendMessageWhatsAppRestoWithParams(modelMessageZone, idNumber, token);

            } else {

                // Réponse locale : adresse enregistrée
                let modelMessagePaymentDefault = whatsappModel.MessagePayment(number);
                whatsappServiceResto.SendMessageWhatsAppRestoWithParams(modelMessagePaymentDefault, idNumber, token);

            }

            break;
    }
}

module.exports = {
    Process,
    ProcessResto,
    OTP
};
