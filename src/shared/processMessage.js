
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


// ===================== PROCESS CHURCH (Hosanna) =====================

function getChurchData() {
    return {
        name: "Cité Missionnaire Hosanna",
        photo: "https://instagram.ffih1-2.fna.fbcdn.net/v/t51.2885-19/302202939_1959903961066757_5943645650394218659_n.jpg?stp=dst-jpg_s320x320_tt6&efg=eyJ2ZW5jb2RlX3RhZyI6InByb2ZpbGVfcGljLmRqYW5nby4xMDgwLmMyIn0&_nc_ht=instagram.ffih1-2.fna.fbcdn.net&_nc_cat=105&_nc_oc=Q6cZ2QHiI60HpuuZv5Kq0T8tvX6b6hKd-eckdY4NB_8wFxeN0Ju_uYYREuLxky-MgoSAcNE&_nc_ohc=f-z4o-pg3yIQ7kNvwFNi2Wr&_nc_gid=KtKAfYBkdHFios9Y6RMbBQ&edm=AOQ1c0wBAAAA&ccb=7-5&oh=00_AfyoJXqpJa10EB0oSEXA63BYWeEqanDxI_cTeiI3r29Adw&oe=69BB7677&_nc_sid=8b3546",
        adresse: "2386 AV.SAÏO, Q/ONL, C/KASA-VUBU",
        telephone: "0825 607 691",
        programmeCulte: "https://scontent.ffih1-2.fna.fbcdn.net/v/t39.30808-6/641442997_1328680982621703_8040239652094249634_n.jpg?stp=dst-jpg_p720x720_tt6&_nc_cat=105&ccb=1-7&_nc_sid=2a1932&_nc_eui2=AeHFBdpQCKfo1nwQdx61vqfi572D7jZPa2fnvYPuNk9rZwyZadcTG4Ra6vxt6_IHz3kU1T6PR5nsJyefRwqiuUmt&_nc_ohc=cusxN-DBDgcQ7kNvwHkgA5M&_nc_oc=AdkHJ4rWa3b4rVpRr7Td8kiV_kYcabewoQMQ7nKuArq5ZIT9SALPwKZ4ARVQaUCiG_k&_nc_zt=23&_nc_ht=scontent.ffih1-2.fna&_nc_gid=PJJWFz_haU1Wmonx3YVsNg&_nc_ss=8&oh=00_Afwf1GmqZ44MLnFR8H8HzY6QtlUFdANx2Hnf7ehZEq24Sg&oe=69BB5BDE",
        facebook: "https://web.facebook.com/Hosannakinshasa/",
        instagram: "https://www.instagram.com/cite_missionnaire_hosanna/",
        themeCulte: "🔥 *Thème actuel :*\n_« Bâtir sur le roc »_\n\nMatthieu 7:24-27\n\n_Celui qui entend mes paroles et les met en pratique est semblable à un homme prudent qui a bâti sa maison sur le roc._",
        numeroPasteur: "243981776336",
        comptesDons: `💰 *Dîmes, Offrandes & Dons*\n\n🏦 *Comptes bancaires Equity :*\n💵 CDF : 077200108382942\n💲 USD : 077200108382943\n\n📱 *M-Pesa :* 0828521215\n📱 *Orange Money :* 0853171743\n\n_Que Dieu vous bénisse pour votre générosité ! 🙏_`
    };
}


async function ProcessChurch(textUser, number, idNumber, token) {

    const church = getChurchData();

    const helloMessage = `Shalom et bienvenue à la *${church.name}* ! 🙏✨\n\n📍 ${church.adresse}\n📞 ${church.telephone}`;

    const isGreeting = textUser.toLowerCase().includes("bsr") || textUser.toLowerCase().includes("bonjour") ||
        textUser.toLowerCase().includes("bonsoir") || textUser.toLowerCase().includes("salut") ||
        textUser.toLowerCase().includes("slt") || textUser.toLowerCase().includes("bjr") ||
        textUser.toLowerCase().includes("mbote") || textUser.toLowerCase().includes("hello") ||
        textUser.toLowerCase().includes("shalom");

    switch (true) {

        // ---- Salutations ----
        case isGreeting: {
            let modelHello = whatsappModel.MessageText(helloMessage, number);
            whatsappServiceResto.SendMessageWhatsAppRestoWithParams(modelHello, idNumber, token);

            // Petit délai pour que le 1er message arrive avant le menu
            await new Promise(resolve => setTimeout(resolve, 1500));

            let modelMenu = whatsappModel.ChurchMenuPrincipal(number, church.photo);
            whatsappServiceResto.SendMessageWhatsAppRestoWithParams(modelMenu, idNumber, token);
            break;
        }

        // ---- Programme des cultes ----
        case textUser.includes("Programme des cultes"): {
            let modelImg = whatsappModel.MessageImage(number, church.programmeCulte);
            whatsappServiceResto.SendMessageWhatsAppRestoWithParams(modelImg, idNumber, token);

            let modelText = whatsappModel.MessageText("📅 Voici le programme de nos cultes.\n\n_Venez comme vous êtes, Jésus vous accueille !_ 🕊️", number);
            whatsappServiceResto.SendMessageWhatsAppRestoWithParams(modelText, idNumber, token);

            let modelMenu = whatsappModel.ChurchMenuPrincipal(number, church.photo);
            whatsappServiceResto.SendMessageWhatsAppRestoWithParams(modelMenu, idNumber, token);
            break;
        }

        // ---- Thème du culte ----
        case textUser.includes("Thème du culte"): {
            let modelTheme = whatsappModel.MessageText(church.themeCulte, number);
            whatsappServiceResto.SendMessageWhatsAppRestoWithParams(modelTheme, idNumber, token);

            let modelMenu = whatsappModel.ChurchMenuPrincipal(number, church.photo);
            whatsappServiceResto.SendMessageWhatsAppRestoWithParams(modelMenu, idNumber, token);
            break;
        }

        // ---- Demande de fidèle (sous-menu) ----
        case textUser.includes("Demande de fidèle"): {
            let modelFidele = whatsappModel.ChurchFideleMenu(number);
            whatsappServiceResto.SendMessageWhatsAppRestoWithParams(modelFidele, idNumber, token);
            break;
        }

        // ---- Besoin de prière ----
        case textUser.includes("Besoin de prière"): {
            let modelText = whatsappModel.MessageText("🙏 *Besoin de prière*\n\nVeuillez nous écrire votre sujet de prière ci-dessous. Notre équipe de prière intercédera pour vous.\n\n_« Ne vous inquiétez de rien, mais en toute chose faites connaître vos besoins à Dieu par des prières... »_ — Philippiens 4:6\n\n📞 Vous pouvez aussi appeler le *0825 607 691*", number);
            whatsappServiceResto.SendMessageWhatsAppRestoWithParams(modelText, idNumber, token);

            // Rediriger le message au pasteur
            let modelPasteur = whatsappModel.MessageText(`🙏 *Demande de prière*\n\nLe fidèle +${number} a besoin de prière. Veuillez le contacter.`, church.numeroPasteur);
            whatsappServiceResto.SendMessageWhatsAppRestoWithParams(modelPasteur, idNumber, token);
            break;
        }

        // ---- Problème social ----
        case textUser.includes("Problème social"): {
            let modelText = whatsappModel.MessageText("🆘 *Assistance sociale*\n\nVeuillez décrire brièvement votre situation ci-dessous. Un responsable de l'église vous contactera pour vous accompagner.\n\n📞 Contact direct : *0825 607 691*", number);
            whatsappServiceResto.SendMessageWhatsAppRestoWithParams(modelText, idNumber, token);

            // Rediriger au pasteur
            let modelPasteur = whatsappModel.MessageText(`🆘 *Demande d'assistance sociale*\n\nLe fidèle +${number} a un problème social. Veuillez le contacter.`, church.numeroPasteur);
            whatsappServiceResto.SendMessageWhatsAppRestoWithParams(modelPasteur, idNumber, token);
            break;
        }

        // ---- Prendre un RDV ----
        case textUser.includes("Prendre un RDV"): {
            let modelText = whatsappModel.MessageText("📆 *Prendre un rendez-vous*\n\nVeuillez nous indiquer :\n1️⃣ Votre *nom complet*\n2️⃣ Le *motif* du rendez-vous\n3️⃣ Votre *disponibilité* (jour et heure)\n\nNous vous confirmerons le rendez-vous dans les plus brefs délais.\n\n📞 Ou appelez le *0825 607 691*", number);
            whatsappServiceResto.SendMessageWhatsAppRestoWithParams(modelText, idNumber, token);

            // Rediriger au pasteur
            let modelPasteur = whatsappModel.MessageText(`📆 *Demande de RDV*\n\nLe fidèle +${number} souhaite prendre un rendez-vous. Veuillez le contacter.`, church.numeroPasteur);
            whatsappServiceResto.SendMessageWhatsAppRestoWithParams(modelPasteur, idNumber, token);
            break;
        }

        // ---- Dons, Dîmes & Offrandes (sous-menu) ----
        case textUser.includes("Dons, Dîmes & Offrandes"): {
            let modelDon = whatsappModel.ChurchDonMenu(number);
            whatsappServiceResto.SendMessageWhatsAppRestoWithParams(modelDon, idNumber, token);
            break;
        }

        // ---- Dîme / Offrande / Don (afficher comptes) ----
        case textUser.includes("Dîme") || textUser.includes("Offrande") || textUser.includes("Don"): {
            let modelComptes = whatsappModel.MessageText(church.comptesDons, number);
            whatsappServiceResto.SendMessageWhatsAppRestoWithParams(modelComptes, idNumber, token);

            let modelMenu = whatsappModel.ChurchMenuPrincipal(number, church.photo);
            whatsappServiceResto.SendMessageWhatsAppRestoWithParams(modelMenu, idNumber, token);
            break;
        }

        // ---- Adresse de l'église ----
        case textUser.includes("Adresse de l'église"): {
            let adresseMsg = `📍 *Adresse de l'église*\n\n🏛️ *${church.name}*\n📍 ${church.adresse}\n📞 ${church.telephone}\n\n_Vous êtes les bienvenus ! 🕊️_`;
            let modelAdresse = whatsappModel.MessageText(adresseMsg, number);
            whatsappServiceResto.SendMessageWhatsAppRestoWithParams(modelAdresse, idNumber, token);

            let modelMenu = whatsappModel.ChurchMenuPrincipal(number, church.photo);
            whatsappServiceResto.SendMessageWhatsAppRestoWithParams(modelMenu, idNumber, token);
            break;
        }

        // ---- Réseaux sociaux ----
        case textUser.includes("Réseaux sociaux"): {
            let reseauxMsg = `🌐 *Nos réseaux sociaux*\n\n📘 *Facebook :*\n${church.facebook}\n\n📸 *Instagram :*\n${church.instagram}\n\n_Suivez-nous pour rester connecté avec la communauté ! ✨_`;
            let modelReseaux = whatsappModel.MessageText(reseauxMsg, number);
            whatsappServiceResto.SendMessageWhatsAppRestoWithParams(modelReseaux, idNumber, token);

            let modelMenu = whatsappModel.ChurchMenuPrincipal(number, church.photo);
            whatsappServiceResto.SendMessageWhatsAppRestoWithParams(modelMenu, idNumber, token);
            break;
        }

        // ---- Menu / Retour ----
        case textUser.toLowerCase().includes("menu") || textUser.toLowerCase().includes("retour"): {
            let modelMenu = whatsappModel.ChurchMenuPrincipal(number, church.photo);
            whatsappServiceResto.SendMessageWhatsAppRestoWithParams(modelMenu, idNumber, token);
            break;
        }

        // ---- Default : message non compris ----
        default: {
            let modelDefault = whatsappModel.MessageText("🤔 Je n'ai pas compris votre message.\n\nTapez *menu* pour revenir au menu principal ou sélectionnez une option ci-dessous.", number);
            whatsappServiceResto.SendMessageWhatsAppRestoWithParams(modelDefault, idNumber, token);

            let modelMenu = whatsappModel.ChurchMenuPrincipal(number, church.photo);
            whatsappServiceResto.SendMessageWhatsAppRestoWithParams(modelMenu, idNumber, token);
            break;
        }
    }
}

module.exports = {
    Process,
    ProcessResto,
    ProcessChurch,
    OTP
};
