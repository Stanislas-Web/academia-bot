
const axios = require('axios');
const whatsappModel = require("../shared/whatsappmodels");
const whatsappService = require("../services/whatsappService");
const whatsappServiceResto = require("../services/whatsappServiceResto");
const { messageResponse } = require("../shared/message");

async function getCandidatesData() {
    try {
        const response = await axios.get('https://api-mobpay.vercel.app/api/v1/candidats');
        return response.data.data;
    } catch (error) {
        console.error('Error fetching candidates data:', error.message);
        return [];
    }
}

async function getCategoriesResto(idResto) {
    try {
        const response = await axios.get('http://143.110.152.18:8000/api/v1/categories/' + idResto);
        // return response.data.data;
        console.log("load data " + response.data);
        return response.data;

    } catch (error) {
        console.error('Error fetching candidates data:', error.message);
        return [];
    }
}

async function getZonesResto(idResto) {
    try {
        const response = await axios.get('http://143.110.152.18:8000/api/v1/zones/' + idResto);
        return response.data.data;
    } catch (error) {
        console.error('Error fetching candidates data:', error.message);
        return [];
    }
}

async function getTableResto(idResto) {
    try {
        const response = await axios.get('http://143.110.152.18:8000/api/v1/tables/' + idResto);
        return response.data.data;
    } catch (error) {
        console.error('Error fetching candidates data:', error.message);
        return [];
    }
}

async function getPlatsByIdNumberAndCategory(idResto, category) {
    try {
        const response = await axios.get(`http://143.110.152.18:8000/api/v1/plats/${idResto}/${category}`);
        return response.data.data;
    } catch (error) {
        console.error('Error fetching candidates data:', error.message);
        return [];
    }
}


async function checkVote(data) {
    try {
        const response = await axios.post('https://api-mobpay.vercel.app/api/v1/check', data);
        return response.status;
    } catch (error) {
        console.error('Error posting candidate data:', error.message);
        throw error; // Rejeter l'erreur pour que la promesse soit rejetée
    }
}


async function OTP(textUser, number, idNumber, token, numberServer) {

    let modelMessage = whatsappModel.MessageText(textUser, number);
    whatsappServiceResto.SendMessageWhatsAppRestoWithParams(modelMessage, idNumber, token);
}


async function Process(textUser, number) {
    let helloMessage = "Bonjour, Resto c'est un plaisir de vous saluer. 👋";
    let models = [];



    // Fetch candidates data from API
    const candidatesData = await getCandidatesData();

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

            let dataPostcheck = JSON.stringify({
                "phoneWhatsapp": number
            });

            let config1 = {
                method: 'post',
                maxBodyLength: Infinity,
                url: 'https://api-mobpay.vercel.app/api/v1/check',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: dataPostcheck
            };

            axios.request(config1)
                .then((response) => {
                    console.log(JSON.stringify(response.data));


                    if (response.data.message == "Désolé, Vous avez le droit de voter une seule fois par période de 24 heures.🥺🥵") {
                        messageResponse(response.data.message, number);
                    } else if ((response.data.message == "Le vote a été effectué avec succès. 🥳👍🏽👌🏻")) {
                        messageResponse(response.data.message, number);
                    } else {
                        let modelListCandidat2 = whatsappModel.MessageRael(number, candidatesData);
                        whatsappService.SendMessageWhatsApp(modelListCandidat2);

                    }
                })
                .catch((error) => {
                    console.log(error);
                });


            break;

        case (textUser.includes("À propos") || textUser.toLowerCase().includes("à propos")):
            let modelMenuFirst2 = whatsappModel.MessageApropos(number);
            models.push(modelMenuFirst2);
            break;
        default:
            // No entiende
            models = [];


            let dataPost = JSON.stringify({
                "phoneWhatsapp": number,
                "candidatName": textUser
            });

            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: 'https://api-mobpay.vercel.app/api/v1/votes',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: dataPost
            };

            axios.request(config)
                .then((response) => {
                    console.log(JSON.stringify(response.data));
                    messageResponse(response.data.message, number);

                    if (response.data.message == "Je ne comprends pas ce que vous dites") {

                        let modelMenuSecond = whatsappModel.MessageComprar(number);
                        whatsappService.SendMessageWhatsApp(modelMenuSecond);
                    }
                })
                .catch((error) => {
                    console.log(error);
                });

            break;
    }

    models.forEach(model => {
        whatsappService.SendMessageWhatsApp(model);
    });
}



// process Resto

async function ProcessResto(textUser, number, idNumber, token, numberServer, idResto) {




    // Fetch categorie data from API
    const categoriesData = await getCategoriesResto(idResto);
    const zonesData = await getZonesResto(idResto);
    const tableData = await getTableResto(idResto);

    const loadingMessage = "Un instant s'il vous plaît...⏳";

    const helloMessage = `Salut et bienvenue chez *${categoriesData.restoName}* !👋`;

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

            let dataConfig = JSON.stringify({
                "no": textUser,
                "idResto": idResto,
                "phoneClient": number
            });

            let configTable = {
                method: 'post',
                maxBodyLength: Infinity,
                url: 'http://143.110.152.18:8000/api/v1/tables',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: dataConfig
            };

            axios.request(configTable)
                .then((response) => {
                    console.log(JSON.stringify(response.data));
                    let modelMessagePayment = whatsappModel.MessagePayment(number);
                    whatsappServiceResto.SendMessageWhatsAppRestoWithParams(modelMessagePayment, idNumber, token);


                })
                .catch((error) => {
                    console.log(error);
                });

            break;


        case textUser.includes("Payez à la livraison"):

            const modelLoading2 = whatsappModel.MessageText(loadingMessage, number);
            whatsappServiceResto.SendMessageWhatsAppRestoWithParams(modelLoading2, idNumber, token);

            let datafinish = JSON.stringify({
                "idResto": idResto,
                "phoneClient": number,
                "typePayment": "Cash"
            });

            let configFinish = {
                method: 'post',
                maxBodyLength: Infinity,
                url: 'http://143.110.152.18:8000/api/v1/finish',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: datafinish
            };

            axios.request(configFinish)
                .then((response) => {
                    console.log(JSON.stringify(response.data.totalAmountCdf));


                    const orderMessage = `${response.data.data.map(order => {
                        return `${order.qte} x ${order.name} : ${order.qte * order.price} \$`;
                    }).join("\n ")}`;

                    let regex = /table\s\d+/;
                    let deliveryCoast = response.data.deliveryCoast;
                    let totalAmountCdfDelivery = response.data.totalAmountCdfDelivery;
                    let totalAmountUsdDelivery = response.data.totalAmountUsdDelivery;
                    let formatDeliveryCoast = deliveryCoast == 0 ? `` : `*${deliveryCoast}* \$ pour la livraison`;
                    const formatAdress = response.data.adresse == "null" ?`` : `${response.data.adresse}`;

                    let messageFormat = regex.test(response.data.table) ? `Votre commande pour la` : `Votre adresse de livraison est`;
                    let messageFormatServer = regex.test(response.data.table) ? `il y'a une commande pour la` : `il y'a une livraison pour`;

                    let modelMessage = whatsappModel.MessageText(`${messageFormat}\n📍 *${response.data.table}, ${formatAdress}* : \n${formatDeliveryCoast} | le montant total *${totalAmountUsdDelivery} \$* ou *${totalAmountCdfDelivery} Fc*  \n ${orderMessage}`, number);


                    whatsappServiceResto.SendMessageWhatsAppRestoWithParams(modelMessage, idNumber, token);

                    let modelMessageServeur = whatsappModel.MessageText(`${messageFormatServer}\n📍 *${response.data.table}, ${formatAdress}* : \n${formatDeliveryCoast} | le montant total *${totalAmountCdfDelivery} Fc* ou *${totalAmountUsdDelivery} \$* \n ${orderMessage}`, numberServer);
                    whatsappServiceResto.SendMessageWhatsAppRestoWithParams(modelMessageServeur, idNumber, token);

                    // get PDF from server 

                    let linkPdf = "http://143.110.152.18:8000/api/v1/invoices/" + response.data.pdfPath

                    let modelPDF = whatsappModel.InvoiceModel(number, linkPdf);
                    whatsappServiceResto.SendMessageWhatsAppRestoWithParams(modelPDF, idNumber, token);


                    let modelPDFServer = whatsappModel.InvoiceModel(number, linkPdf);
                    whatsappServiceResto.SendMessageWhatsAppRestoWithParams(modelPDFServer, numberServer, token);

                    const modelMessageClient = whatsappModel.MessageText(`le numero du client est : +${number}`, numberServer);

                    whatsappServiceResto.SendMessageWhatsAppRestoWithParams(modelMessageClient, idNumber, token);




                })
                .catch((error) => {
                    console.log(error);
                });

            break;

        case textUser.includes("Carte"):
            let datafinishCarte = JSON.stringify({
                "idResto": idResto,
                "phoneClient": number,
                "typePayment": "Carte"
            });

            let configFinishCarte = {
                method: 'post',
                maxBodyLength: Infinity,
                url: 'http://143.110.152.18:8000/api/v1/finish',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: datafinishCarte
            };

            axios.request(configFinishCarte)
                .then((response) => {


                    const orderMessage = `${response.data.data.map(order => {
                        return `${order.qte} x ${order.name} : ${order.qte * order.price} \$`;
                    }).join("\n ")}`;

                    let regex = /table\s\d+/;
                    let deliveryCoast = response.data.deliveryCoast;
                    let totalAmountCdfDelivery = response.data.totalAmountCdfDelivery;
                    let totalAmountUsdDelivery = response.data.totalAmountUsdDelivery;
                    let formatDeliveryCoast = deliveryCoast == 0 ? `` : `${deliveryCoast} \$ pour la livraison`;

                    let messageFormat = regex.test(response.data.table) ? `Votre commande pour la` : `Votre adresse de livraison est`;
                    let messageFormatServer = regex.test(response.data.table) ? `il y'a une commande pour la` : `il y'a une livraison pour`;

                    let modelMessage = whatsappModel.MessageText(`${messageFormat} ${response.data.table} : ${formatDeliveryCoast} | le montant total ${totalAmountUsdDelivery} \$ ou ${totalAmountCdfDelivery} Fc  \n ${orderMessage}`, number);


                    whatsappServiceResto.SendMessageWhatsAppRestoWithParams(modelMessage, idNumber, token);

                    let modelMessageServeur = whatsappModel.MessageText(`${messageFormatServer} ${response.data.table} : ${formatDeliveryCoast} | le montant total ${totalAmountCdfDelivery} Fc ou ${totalAmountUsdDelivery} \$ \n ${orderMessage}`, numberServer);
                    whatsappServiceResto.SendMessageWhatsAppRestoWithParams(modelMessageServeur, idNumber, token);

                    // get PDF from server 

                    let linkPdf = "http://143.110.152.18:8000/api/v1/invoices/" + response.data.pdfPath

                    let modelPDF = whatsappModel.InvoiceModel(number, linkPdf);
                    whatsappServiceResto.SendMessageWhatsAppRestoWithParams(modelPDF, idNumber, token);

                    let messagePaiement = `Cliquez sur le lien pour finaliser le paiement : 💳 \n${response.data.urlPayment}`;

                    let modelPayment = whatsappModel.MessageText(messagePaiement, number);
                    whatsappServiceResto.SendMessageWhatsAppRestoWithParams(modelPayment, idNumber, token);


                    let modelPDFServer = whatsappModel.InvoiceModel(number, linkPdf);
                    whatsappServiceResto.SendMessageWhatsAppRestoWithParams(modelPDFServer, numberServer, token);

                    const modelMessageClient = whatsappModel.MessageText("le numero du client est : +" + number, numberServer);

                    whatsappServiceResto.SendMessageWhatsAppRestoWithParams(modelMessageClient, idNumber, token);

                })
                .catch((error) => {
                    console.log(error);
                });

            break;

        case textUser.toLowerCase().includes("taxi"):
            let modelLocation = whatsappModel.GetLocation(number);
            whatsappServiceResto.SendMessageWhatsAppRestoWithParams(modelLocation, idNumber, token);

            break;

        case textUser.toLowerCase().includes("adresse"):
            let modelAdresse = whatsappModel.SendAdress(number);
            whatsappServiceResto.SendMessageWhatsAppRestoWithParams(modelAdresse, idNumber, token);

            break;
        case textUser.includes("Oui"):

            let modelMenuFirst2 = whatsappModel.MenuListResto(number, categoriesData);
            whatsappServiceResto.SendMessageWhatsAppRestoWithParams(modelMenuFirst2, idNumber, token);



            break;

        case textUser.includes("non"):

            let modelMessagePlace = whatsappModel.MessagePlace(number);
            whatsappServiceResto.SendMessageWhatsAppRestoWithParams(modelMessagePlace, idNumber, token);


            break;
        case textUser.includes("Restaurant"):

            const modelTable = whatsappModel.MenuListTable(number, tableData);
            whatsappServiceResto.SendMessageWhatsAppRestoWithParams(modelTable, idNumber, token);




            break;
        case textUser.includes("Livraison"):

            let modelZone = whatsappModel.MenuListZone(number, zonesData);
            whatsappServiceResto.SendMessageWhatsAppRestoWithParams(modelZone, idNumber, token);



            break;

        case textUser.includes("Non"):

            let modelMessagePlace1 = whatsappModel.MessagePlace(number, categoriesData.photoUrl);
            whatsappServiceResto.SendMessageWhatsAppRestoWithParams(modelMessagePlace1, idNumber, token);

            break;

        case textUser.includes("🛒"):


            const chaine = textUser;
            const mots = chaine.split(" ");
            const nouvelleChaine = mots.slice(2).join(" ");
            console.log("chaine de commande " + nouvelleChaine);


            let dataPost = JSON.stringify({
                "name": nouvelleChaine,
                "idResto": idResto,
                "phoneClient": number
            });

            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: 'http://143.110.152.18:8000/api/v1/orders',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: dataPost
            };

            axios.request(config)
                .then((response) => {
                    console.log(JSON.stringify(response.data));

                    if (response.data.data.status == "pending") {
                        let modelMessage = whatsappModel.MessageText(`Combien de ${nouvelleChaine} souhaitez-vous?`, number);
                        whatsappServiceResto.SendMessageWhatsAppRestoWithParams(modelMessage, idNumber, token);

                    } else {
                        const modelMessage = whatsappModel.MessageText(`je ne comprends pas`, number);
                        whatsappServiceResto.SendMessageWhatsAppRestoWithParams(modelMessage, idNumber, token);

                        const modelMenuFirst2 = whatsappModel.MenuListResto(number, categoriesData);
                        whatsappServiceResto.SendMessageWhatsAppRestoWithParams(modelMenuFirst2, idNumber, token);





                    }
                })
                .catch((error) => {
                    console.log(error);
                });
            break;

        case (!isNaN(parseInt(textUser.trim())) && textUser.trim().length < 5):

            let checkData = JSON.stringify({
                "qte": textUser.trim(),
                "idResto": idResto,
                "phoneClient": number
            });

            let configRequest = {
                method: 'post',
                maxBodyLength: Infinity,
                url: 'http://143.110.152.18:8000/api/v1/check',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: checkData
            };

            axios.request(configRequest)
                .then((response) => {
                    console.log(JSON.stringify(response.data));

                    if (response.data.data.modifiedCount == 1) {

                        // let modelMessage = whatsappModel.MessageNextCommande(number, categoriesData.photoUrl);
                        // whatsappServiceResto.SendMessageWhatsAppRestoWithParams(modelMessage, idNumber, token);


                        


                        // const zonesGroupedByDistrict = zonesData.reduce((acc, zone) => {
                        //     const district = zone.district;
                        //     if (!acc[district]) {
                        //         acc[district] = [];
                        //     }
                        //     acc[district].push(zone);
                        //     return acc;
                        // }, {});
                        
                        // const districtKeys = Object.keys(zonesGroupedByDistrict);
                        
                        // const districtZones = districtKeys.map(district => {
                        //     return {
                        //         district: district,
                        //         zones: zonesGroupedByDistrict[district]
                        //     };
                        // });
                        


                        // districtZones.forEach(districtZone => {
                        //     const modelZone = whatsappModel.MenuListZone(number, districtZone.zones);
                        //     whatsappServiceResto.SendMessageWhatsAppRestoWithParams(modelZone, idNumber, token);
                        // });
                        

                        








                        const lukungaFetch = zonesData.filter((zone)=> zone.district == "Lukunga");
                        const modelZone2 = whatsappModel.MenuListZone(number, lukungaFetch, "Lukunga");
                        whatsappServiceResto.SendMessageWhatsAppRestoWithParams(modelZone2, idNumber, token);


                        const funaFetch = zonesData.filter((zone)=> zone.district == "Funa");
                        let modelZone3 = whatsappModel.MenuListZone(number, funaFetch, "Funa");
                        whatsappServiceResto.SendMessageWhatsAppRestoWithParams(modelZone3, idNumber, token);


                        const MontAmbaFetch = zonesData.filter((zone)=> zone.district == "Mont-amba");
                        const modelZone = whatsappModel.MenuListZone(number, MontAmbaFetch, "Mont-amba");
                        whatsappServiceResto.SendMessageWhatsAppRestoWithParams(modelZone, idNumber, token);

                        const tshanguFetch = zonesData.filter((zone)=> zone.district == "Tshangu");
                        const modelZone4 = whatsappModel.MenuListZone(number, tshanguFetch, "Tshangu");
                        whatsappServiceResto.SendMessageWhatsAppRestoWithParams(modelZone4, idNumber, token);




                    } else {
                        let modelMessage = whatsappModel.MessageText(`je ne comprends pas`, number);
                        whatsappServiceResto.SendMessageWhatsAppRestoWithParams(modelMessage, idNumber, token);

                    }
                })
                .catch((error) => {
                    console.log(error);
                });
            break;


        default:


            const findCategory = categoriesData.data.find((category) => category.name === textUser);

            const findZone = zonesData.find((zone) => zone.commune === textUser);



            if (findCategory) {

                const modelLoading = whatsappModel.MessageText(loadingMessage, number);
                whatsappServiceResto.SendMessageWhatsAppRestoWithParams(modelLoading, idNumber, token);



                const plats = await getPlatsByIdNumberAndCategory(idResto, textUser);


                for (let i = 0; i < plats.length; i++) {

                    let modelMenuCandidat = whatsappModel.SectionPlats(number, plats[i].photoUrl, plats[i].name, plats[i].price, plats[i].description);
                    whatsappServiceResto.SendMessageWhatsAppRestoWithParams(modelMenuCandidat, idNumber, token);
                }


            } else if (findZone) {

                let zoneData = JSON.stringify({
                    "commune": textUser,
                    "idResto": idResto,
                    "phoneClient": number
                });

                let configRequest = {
                    method: 'post',
                    maxBodyLength: Infinity,
                    url: 'http://143.110.152.18:8000/api/v1/delivery',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    data: zoneData
                };

                axios.request(configRequest)
                    .then((response) => {
                        console.log(JSON.stringify(response.data));
                        // let modelMessagePayment = whatsappModel.MessagePayment(number);
                        // whatsappServiceResto.SendMessageWhatsAppRestoWithParams(modelMessagePayment, idNumber, token);

                        let modelMessage = whatsappModel.MessageText(`Fournissez des informations détaillées sur votre adresse, par exemple : *Q\ Ma Capagne, Av\ nguma, N 129*.`, number);
                        whatsappServiceResto.SendMessageWhatsAppRestoWithParams(modelMessage, idNumber, token);

                        
                    })
                    .catch((error) => {
                        console.log(error);
                    });



            } else {

                let adresseData = JSON.stringify({
                    "adresse": textUser,
                    "idResto": idResto,
                    "phoneClient": number
                });

                let configRequest = {
                    method: 'post',
                    maxBodyLength: Infinity,
                    url: 'http://143.110.152.18:8000/api/v1/updatedelivery',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    data: adresseData
                };

                axios.request(configRequest)
                    .then((response) => {
                        console.log(JSON.stringify(response.data));

                        if (response.data.data.modifiedCount == 1) {

                            // let modelMessage = whatsappModel.MessageNextCommande(number, categoriesData.photoUrl);
                            // whatsappServiceResto.SendMessageWhatsAppRestoWithParams(modelMessage, idNumber, token);
    
                            // let modelZone = whatsappModel.MenuListZone(number, zonesData);
                            // whatsappServiceResto.SendMessageWhatsAppRestoWithParams(modelZone, idNumber, token);

                        let modelMessagePayment = whatsappModel.MessagePayment(number);
                        whatsappServiceResto.SendMessageWhatsAppRestoWithParams(modelMessagePayment, idNumber, token);
    
                        } else {
                            let modelMessage = whatsappModel.MessageText(`je ne comprends pas`, number);
                            whatsappServiceResto.SendMessageWhatsAppRestoWithParams(modelMessage, idNumber, token);
    
                        }

                    })
                    .catch((error) => {
                        console.log(error);
                    });


            }

            break;
    }
}

module.exports = {
    Process,
    ProcessResto,
    OTP
};
