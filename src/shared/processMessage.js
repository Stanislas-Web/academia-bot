// const whatsappModel = require("../shared/whatsappmodels");
// const whatsappService = require("../services/whatsappService");
// const { payment } = require("../shared/payment");
// const axios = require("axios");


// async function getCandidatesData() {
//     try {
//         const response = await axios.get('https://api-mobpay.vercel.app/api/v1/candidats');
//         return response.data.data;
//     } catch (error) {
//         console.error('Error fetching candidates data:', error.message);
//         return [];
//     }
// }



// async function Process(textUser, number) {
//     var models = [];


//     if (textUser.toLowerCase().includes("bonjour") || textUser.toLowerCase().includes("bonsoir") || textUser.toLowerCase().includes("salut") || textUser.toLowerCase().includes("slt") || textUser.toLowerCase().includes("bjr") || textUser.toLowerCase().includes("mbote") || textUser.toLowerCase().includes("hello")) {

//         const modeImage = whatsappModel.SampleImageDescription(number);
//         whatsappService.SendMessageWhatsApp(modeImage);
//         setTimeout(() => {
//             const mode3 = whatsappModel.MessageFAQ(number);
//             whatsappService.SendMessageWhatsApp(mode3);
//         }, 1000); // ajustez le délai selon vos besoins
//     }
//     else if (textUser.toLowerCase().includes("parler à un agent")) {

//         const modelAgentMessage1 = whatsappModel.MessageText("Votre demande est en cours de traitement. Un agent vous contactera bientôt.🕜", number);
//         models.push(modelAgentMessage1);

//         const modelAgentMessage2 = whatsappModel.MessageText("Je vais transférer votre chat à un collègue disponible pour vous aider au mieux.", number);
//         models.push(modelAgentMessage2);

//         const modelAgentMessage3 = whatsappModel.MessageText(`Bonjour, veuillez contacter ce numéro (+${number}) pour une prise en charge immédiate.`, "243822167485");
//         models.push(modelAgentMessage3);

//     } else if (textUser.toLowerCase().includes("tac étudiant")) {
//         const modelAgentMessage1 = whatsappModel.MessageApropoEtudiant(number);
//         models.push(modelAgentMessage1);
//     } else if (textUser.toLowerCase().includes("tac inter-urbain")) {

//         const modelAgentMessage2 = whatsappModel.MessageApropoTacInterUrbain(number);
//         models.push(modelAgentMessage2);


//     } else if (textUser.toLowerCase().includes("tac kelasi")) {

//         const modelAgentMessage4 = whatsappModel.MessageApropoTacKelasi(number);
//         models.push(modelAgentMessage4);


//     } else if (textUser.toLowerCase().includes("payer l'abonnement")) {

//         let dataPost = JSON.stringify({
//             phoneWhatsapp: number,
//         });

//         let config = {
//             method: 'post',
//             maxBodyLength: Infinity,
//             url: 'http://68.183.30.146/api/v1/transacademia',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             data: dataPost
//         };

//         axios.request(config)
//             .then((response) => {

//                 const modelPay = whatsappModel.MessageComprar(number);
//                 whatsappService.SendMessageWhatsApp(modelPay);

//             })
//             .catch((error) => {
//                 console.log(error);
//             });


//     } else if (textUser.toLowerCase().includes("inscription")) {


//         const modeUniv = whatsappModel.ListUniversite(number);
//         whatsappService.SendMessageWhatsApp(modeUniv);

//     } else if ((textUser.toLowerCase().split(' ').length == 2 || textUser.toLowerCase().split(' ').length == 3) &&
//         !textUser.toLowerCase().includes("fc") &&
//         !textUser.toLowerCase().includes("$")) {

//         let dataPost = JSON.stringify({
//             phoneWhatsapp: number,
//             phone: number,
//             nomComplet: textUser.trim(),
//             universite: "UNIKIN"
//         });

//         let config = {
//             method: 'post',
//             maxBodyLength: Infinity,
//             url: 'http://68.183.30.146/api/v1/createAccount',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             data: dataPost
//         };

//         axios.request(config)
//             .then(async (response) => {

//                 const stdtac = "STDTAC202306080102QSPFOK52011771";

//                 const modeImage = whatsappModel.SampleQrCode(number, stdtac);
//                 whatsappService.SendMessageWhatsApp(modeImage);

//                 const modelAgentMessage1 = whatsappModel.MessageText("Votre login est : \nNuméro : " + number.slice(3) + "\nMot de passe: *Trans@106*", number);
//                 whatsappService.SendMessageWhatsApp(modelAgentMessage1);

//                 const modelAgentMessage2 = whatsappModel.MessageText("Télécharger l'application :\nAndroid: https://play.google.com/store/apps/details?id=com.trans.academia\nIOS: https://apps.apple.com/ci/app/trans-academia/id6447296971  ", number);
//                 whatsappService.SendMessageWhatsApp(modelAgentMessage2);        

//             })
//             .catch((error) => {
//                 console.log(error);
//             });

//     } else if (textUser.toLowerCase().includes("unikin")) {

//         const modelAgentMessage1 = whatsappModel.MessageText("Veuillez renseigner votre nom complet (nom postnom prénom)", number);
//         models.push(modelAgentMessage1);

//     }


//     // case abonnement
//     else if (textUser.includes("78 000 FC")) {
//         let dataPost = JSON.stringify({
//             phoneWhatsapp: number,
//         });

//         let config = {
//             method: 'post',
//             maxBodyLength: Infinity,
//             url: 'http://68.183.30.146/api/v1/transacademiastdtac',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             data: dataPost
//         };

//         axios.request(config)
//             .then(async (response) => {

//                 const modelPopup = whatsappModel.MessageText("Vous allez voir s'afficher le popup de paiement pour 78 000 Fc. Veuillez confirmer le code PIN.\nVous recevrez une réponse dans l'application dans un court laps de temps ! 😊", number);
//                 whatsappService.SendMessageWhatsApp(modelPopup);
//                 const numberWithout43 = number.substring(3);
//                 const phonePayment = response.data.data.phonePayment.substring(3);
//                 const suffixNumber = numberWithout43.substring(0, 2);
//                 if (suffixNumber == "81" || suffixNumber == "82" || suffixNumber == "83") {
//                     await payment("CDF", "MPESA", "243" + phonePayment, "1", response.data.data.stdTac);

//                 } else if (suffixNumber == "89" || suffixNumber == "85" || suffixNumber == "84" || suffixNumber == "80") {
//                     await payment("CDF", "ORANGE", "0" + phonePayment, "1", response.data.data.stdTac);

//                 } else if (suffixNumber == "99" || suffixNumber == "98" || suffixNumber == "97") {
//                     await payment("CDF", "AIRTEL", phonePayment, "1", response.data.data.stdTac);
//                 } else {
//                     var model = whatsappModel.MessageText("Votre numéro Africell n'est pas pris en charge . Merci de changer de numéro.", number);
//                     models.push(model);

//                 }

//             })
//             .catch((error) => {
//                 console.log(error);
//             });


//     } else if (textUser.includes("30.00 $")) {

//         let dataPost = JSON.stringify({
//             phoneWhatsapp: number,
//         });

//         let config = {
//             method: 'post',
//             maxBodyLength: Infinity,
//             url: 'http://68.183.30.146/api/v1/transacademiastdtac',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             data: dataPost
//         };

//         axios.request(config)
//             .then(async (response) => {

//                 const modelPopup = whatsappModel.MessageText("Vous allez voir s'afficher le popup de paiement pour 30.00 $. Veuillez confirmer le code PIN.\nVous recevrez une réponse dans l'application dans un court laps de temps ! 😊", number);
//                 whatsappService.SendMessageWhatsApp(modelPopup);
//                 const numberWithout43 = number.substring(3);
//                 const phonePayment = response.data.data.phonePayment.substring(3);
//                 const suffixNumber = numberWithout43.substring(0, 2);
//                 if (suffixNumber == "81" || suffixNumber == "82" || suffixNumber == "83") {
//                     await payment("USD", "MPESA", "243" + phonePayment, "1", response.data.data.stdTac);

//                 } else if (suffixNumber == "89" || suffixNumber == "85" || suffixNumber == "84" || suffixNumber == "80") {
//                     await payment("USD", "ORANGE", "0" + phonePayment, "1", response.data.data.stdTac);

//                 } else if (suffixNumber == "99" || suffixNumber == "98" || suffixNumber == "97") {
//                     await payment("USD", "AIRTEL", phonePayment, "1", response.data.data.stdTac);
//                 } else {
//                     var model = whatsappModel.MessageText("Votre numéro Africell n'est pas pris en charge . Merci de changer de numéro.", number);
//                     models.push(model);

//                 }

//             })
//             .catch((error) => {
//                 console.log(error);
//             });




//     }
//     else if (textUser.includes("7 000 FC")) {
//         let dataPost = JSON.stringify({
//             phoneWhatsapp: number,
//         });

//         let config = {
//             method: 'post',
//             maxBodyLength: Infinity,
//             url: 'http://68.183.30.146/api/v1/transacademiastdtac',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             data: dataPost
//         };

//         axios.request(config)
//             .then(async (response) => {

//                 const modelPopup = whatsappModel.MessageText("Vous allez voir s'afficher le popup de paiement pour 3 000 Fc. Veuillez confirmer le code PIN.\nVous recevrez une réponse dans l'application dans un court laps de temps ! 😊", number);
//                 whatsappService.SendMessageWhatsApp(modelPopup);
//                 const numberWithout43 = number.substring(3);
//                 const phonePayment = response.data.data.phonePayment.substring(3);
//                 const suffixNumber = numberWithout43.substring(0, 2);
//                 if (suffixNumber == "81" || suffixNumber == "82" || suffixNumber == "83") {
//                     await payment("CDF", "MPESA", "243" + phonePayment, "3", response.data.data.stdTac);

//                 } else if (suffixNumber == "89" || suffixNumber == "85" || suffixNumber == "84" || suffixNumber == "80") {
//                     await payment("CDF", "ORANGE", "0" + phonePayment, "3", response.data.data.stdTac);

//                 } else if (suffixNumber == "99" || suffixNumber == "98" || suffixNumber == "97") {
//                     await payment("CDF", "AIRTEL", phonePayment, "3", response.data.data.stdTac);
//                 } else {
//                     var model = whatsappModel.MessageText("Votre numéro Africell n'est pas pris en charge . Merci de changer de numéro.", number);
//                     models.push(model);

//                 }

//             })
//             .catch((error) => {
//                 console.log(error);
//             });


//     } else if (textUser.includes("2.69 $")) {

//         let dataPost = JSON.stringify({
//             phoneWhatsapp: number,
//         });

//         let config = {
//             method: 'post',
//             maxBodyLength: Infinity,
//             url: 'http://68.183.30.146/api/v1/transacademiastdtac',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             data: dataPost
//         };

//         axios.request(config)
//             .then(async (response) => {

//                 const modelPopup = whatsappModel.MessageText("Vous allez voir s'afficher le popup de paiement pour 2.69 $. Veuillez confirmer le code PIN.\nVous recevrez une réponse dans l'application dans un court laps de temps ! 😊", number);
//                 whatsappService.SendMessageWhatsApp(modelPopup);
//                 const numberWithout43 = number.substring(3);
//                 const phonePayment = response.data.data.phonePayment.substring(3);
//                 const suffixNumber = numberWithout43.substring(0, 2);
//                 if (suffixNumber == "81" || suffixNumber == "82" || suffixNumber == "83") {
//                     await payment("USD", "MPESA", "243" + phonePayment, "3", response.data.data.stdTac);

//                 } else if (suffixNumber == "89" || suffixNumber == "85" || suffixNumber == "84" || suffixNumber == "80") {
//                     await payment("USD", "ORANGE", "0" + phonePayment, "3", response.data.data.stdTac);

//                 } else if (suffixNumber == "99" || suffixNumber == "98" || suffixNumber == "97") {
//                     await payment("USD", "AIRTEL", phonePayment, "3", response.data.data.stdTac);
//                 } else {
//                     var model = whatsappModel.MessageText("Votre numéro Africell n'est pas pris en charge . Merci de changer de numéro.", number);
//                     models.push(model);

//                 }

//             })
//             .catch((error) => {
//                 console.log(error);
//             });




//     }

//     else if (textUser.includes("3 000 FC")) {
//         let dataPost = JSON.stringify({
//             phoneWhatsapp: number,
//         });

//         let config = {
//             method: 'post',
//             maxBodyLength: Infinity,
//             url: 'http://68.183.30.146/api/v1/transacademiastdtac',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             data: dataPost
//         };

//         axios.request(config)
//             .then(async (response) => {

//                 const modelPopup = whatsappModel.MessageText("Vous allez voir s'afficher le popup de paiement pour 3 000 Fc. Veuillez confirmer le code PIN.\nVous recevrez une réponse dans l'application dans un court laps de temps ! 😊", number);
//                 whatsappService.SendMessageWhatsApp(modelPopup);
//                 const numberWithout43 = number.substring(3);
//                 const phonePayment = response.data.data.phonePayment.substring(3);
//                 const suffixNumber = numberWithout43.substring(0, 2);
//                 if (suffixNumber == "81" || suffixNumber == "82" || suffixNumber == "83") {
//                     await payment("CDF", "MPESA", "243" + phonePayment, "9", response.data.data.stdTac);

//                 } else if (suffixNumber == "89" || suffixNumber == "85" || suffixNumber == "84" || suffixNumber == "80") {
//                     await payment("CDF", "ORANGE", "0" + phonePayment, "9", response.data.data.stdTac);

//                 } else if (suffixNumber == "99" || suffixNumber == "98" || suffixNumber == "97") {
//                     await payment("CDF", "AIRTEL", phonePayment, "9", response.data.data.stdTac);
//                 } else {
//                     var model = whatsappModel.MessageText("Votre numéro Africell n'est pas pris en charge . Merci de changer de numéro.", number);
//                     models.push(model);

//                 }

//             })
//             .catch((error) => {
//                 console.log(error);
//             });


//     } else if (textUser.includes("1.15 $")) {

//         let dataPost = JSON.stringify({
//             phoneWhatsapp: number,
//         });

//         let config = {
//             method: 'post',
//             maxBodyLength: Infinity,
//             url: 'http://68.183.30.146/api/v1/transacademiastdtac',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             data: dataPost
//         };

//         axios.request(config)
//             .then(async (response) => {

//                 const modelPopup = whatsappModel.MessageText("Vous allez voir s'afficher le popup de paiement pour 1.15 $. Veuillez confirmer le code PIN.\nVous recevrez une réponse dans l'application dans un court laps de temps ! 😊", number);
//                 whatsappService.SendMessageWhatsApp(modelPopup);
//                 const numberWithout43 = number.substring(3);
//                 const phonePayment = response.data.data.phonePayment.substring(3);
//                 const suffixNumber = numberWithout43.substring(0, 2);
//                 if (suffixNumber == "81" || suffixNumber == "82" || suffixNumber == "83") {
//                     await payment("USD", "MPESA", "243" + phonePayment, "9", response.data.data.stdTac);

//                 } else if (suffixNumber == "89" || suffixNumber == "85" || suffixNumber == "84" || suffixNumber == "80") {
//                     await payment("USD", "ORANGE", "0" + phonePayment, "9", response.data.data.stdTac);

//                 } else if (suffixNumber == "99" || suffixNumber == "98" || suffixNumber == "97") {
//                     await payment("USD", "AIRTEL", phonePayment, "9", response.data.data.stdTac);
//                 } else {
//                     var model = whatsappModel.MessageText("Votre numéro Africell n'est pas pris en charge . Merci de changer de numéro.", number);
//                     models.push(model);

//                 }

//             })
//             .catch((error) => {
//                 console.log(error);
//             });




//     }

//     else if (textUser.includes("1 000 FC")) {
//         let dataPost = JSON.stringify({
//             phoneWhatsapp: number,
//         });

//         let config = {
//             method: 'post',
//             maxBodyLength: Infinity,
//             url: 'http://68.183.30.146/api/v1/transacademiastdtac',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             data: dataPost
//         };

//         axios.request(config)
//             .then(async (response) => {

//                 const modelPopup = whatsappModel.MessageText("Vous allez voir s'afficher le popup de paiement pour 1 000 Fc. Veuillez confirmer le code PIN.\nVous recevrez une réponse dans l'application dans un court laps de temps ! 😊", number);
//                 whatsappService.SendMessageWhatsApp(modelPopup);
//                 const numberWithout43 = number.substring(3);
//                 const phonePayment = response.data.data.phonePayment.substring(3);
//                 const suffixNumber = numberWithout43.substring(0, 2);
//                 if (suffixNumber == "81" || suffixNumber == "82" || suffixNumber == "83") {
//                     await payment("CDF", "MPESA", "243" + phonePayment, "13", response.data.data.stdTac);

//                 } else if (suffixNumber == "89" || suffixNumber == "85" || suffixNumber == "84" || suffixNumber == "80") {
//                     await payment("CDF", "ORANGE", "0" + phonePayment, "13", response.data.data.stdTac);

//                 } else if (suffixNumber == "99" || suffixNumber == "98" || suffixNumber == "97") {
//                     await payment("CDF", "AIRTEL", phonePayment, "13", response.data.data.stdTac);
//                 } else {
//                     var model = whatsappModel.MessageText("Votre numéro Africell n'est pas pris en charge . Merci de changer de numéro.", number);
//                     models.push(model);

//                 }

//             })
//             .catch((error) => {
//                 console.log(error);
//             });


//     } else if (textUser.includes("0.38 $")) {

//         let dataPost = JSON.stringify({
//             phoneWhatsapp: number,
//         });

//         let config = {
//             method: 'post',
//             maxBodyLength: Infinity,
//             url: 'http://68.183.30.146/api/v1/transacademiastdtac',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             data: dataPost
//         };

//         axios.request(config)
//             .then(async (response) => {

//                 const modelPopup = whatsappModel.MessageText("Vous allez voir s'afficher le popup de paiement pour 0.38 $. Veuillez confirmer le code PIN.\nVous recevrez une réponse dans l'application dans un court laps de temps ! 😊", number);
//                 whatsappService.SendMessageWhatsApp(modelPopup);
//                 const numberWithout43 = number.substring(3);
//                 const phonePayment = response.data.data.phonePayment.substring(3);
//                 const suffixNumber = numberWithout43.substring(0, 2);
//                 if (suffixNumber == "81" || suffixNumber == "82" || suffixNumber == "83") {
//                     await payment("USD", "MPESA", "243" + phonePayment, "13", response.data.data.stdTac);

//                 } else if (suffixNumber == "89" || suffixNumber == "85" || suffixNumber == "84" || suffixNumber == "80") {
//                     await payment("USD", "ORANGE", "0" + phonePayment, "13", response.data.data.stdTac);

//                 } else if (suffixNumber == "99" || suffixNumber == "98" || suffixNumber == "97") {
//                     await payment("USD", "AIRTEL", phonePayment, "13", response.data.data.stdTac);
//                 } else {
//                     var model = whatsappModel.MessageText("Votre numéro Africell n'est pas pris en charge . Merci de changer de numéro.", number);
//                     models.push(model);

//                 }

//             })
//             .catch((error) => {
//                 console.log(error);
//             });




//     } else if (textUser.includes("Oui")) {

//         const modelLoading = whatsappModel.MessageText("Je récupère vos données. Un instant s'il vous plaît...⏳ ", number);
//         models.push(modelLoading);

//         const numberWithout43 = textUser.trim().substring(1);

//         let dataPost = JSON.stringify({
//             phoneWhatsapp: number,
//             phone: "243" + numberWithout43,
//         });

//         let config = {
//             method: 'post',
//             maxBodyLength: Infinity,
//             url: 'http://68.183.30.146/api/v1/transacademiaupdate',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             data: dataPost
//         };

//         axios.request(config)
//             .then((response) => {

//                 console.log(response.data.data.msg);

//                 if (response.data.data.msg == "phoneAccount") {


//                     if (response.data.data.data.status == 200) {
//                         console.log("Mon data : " + JSON.stringify(response.data.data.data.donnees[0].nom));
//                         const nameUser = response.data.data.data.donnees[0].nom;
//                         const postnomUser = response.data.data.data.donnees[0].postnom;
//                         const prenomUser = response.data.data.data.donnees[0].prenom;

//                         const modelUser = whatsappModel.MessageText(`j'ai retrouvé ton profil 😉 *${nameUser.toUpperCase()} ${postnomUser.toUpperCase()} ${prenomUser.toUpperCase()}*`, number);
//                         whatsappService.SendMessageWhatsApp(modelUser);
//                         setTimeout(() => {
//                             const messageQuestion = whatsappModel.MessagePaymentQuestion(number);
//                             whatsappService.SendMessageWhatsApp(messageQuestion);
//                         }, 1000);

//                     } else {
//                         const modelError = whatsappModel.MessageText(`Vous n'avez pas de compte Trans Academia, commencez par vous inscrire. Merci.`, number);
//                         whatsappService.SendMessageWhatsApp(modelError);

//                         const modelAgentMessage23 = whatsappModel.MessageApropoEtudiantInscription(number);
//                         whatsappService.SendMessageWhatsApp(modelAgentMessage23);


//                     }


//                 } else {
//                     const modelListFrench = whatsappModel.MessageList2(number);
//                     whatsappService.SendMessageWhatsApp(modelListFrench);

//                 }
//             })
//             .catch((error) => {
//                 console.log(error);
//             });

//     } else if (textUser.includes("OUI")) {

//         let dataPost = JSON.stringify({
//             phoneWhatsapp: number,
//             phone: number,
//         });

//         let config = {
//             method: 'post',
//             maxBodyLength: Infinity,
//             url: 'http://68.183.30.146/api/v1/transacademiaupdate',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             data: dataPost
//         };

//         axios.request(config)
//             .then((response) => {
//                 const modelListFrench = whatsappModel.MessageList2(number);
//                 console.log("mon list " + modelListFrench);
//                 whatsappService.SendMessageWhatsApp(modelListFrench);
//             })
//             .catch((error) => {
//                 console.log(error);
//             });



//     }
//     //  else if (textUser.includes("Non")) {
//     //     const modelAgentMessage2 = whatsappModel.MessageText("Donnez-nous votre numéro de compte Trans Academia pour avancer dans le processus.\n*Voici un exemple de format : 0826016607.*", number);
//     //     models.push(modelAgentMessage2);

//     // } 
//     else if (textUser.includes("Non")) {

//         const modelAgentMessage2 = whatsappModel.MessageText("J'ai besoin de votre numéro de compte Trans Academia\n*Voici un exemple de format : 0826016607*", number);
//         // const modelAgentMessage2 = whatsappModel.MessageText("Veuillez saisir votre numéro de compte Trans Academia pour avancer dans le processus.\n*Voici un exemple de format : 0826016607.*", number);
//         models.push(modelAgentMessage2);

//     } else if (textUser.includes("NON")) {


//         const modelAgentMessage2 = whatsappModel.MessageText("Entrez maintenant votre numéro de paiement.\n*Voici un exemple de format : 0826016607*", number);
//         models.push(modelAgentMessage2);

//     } else if (textUser.toLowerCase().includes("test")) {

//         const modelImage = whatsappModel.MessageImage(number, "https://scontent.ffih1-2.fna.fbcdn.net/v/t39.30808-6/284207018_103562862390099_7481114687468144580_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=efb6e6&_nc_eui2=AeEJDyZV5AvEMVvsmvrCiHH9Jz0qNC8ZFscnPSo0LxkWx6ZyK-8HOs9reGb7y6dJ5VNCscZMYvfmxd8UDPRzM2Fx&_nc_ohc=YnXwn9IC49MAX-6ZUDk&_nc_oc=AQl9AY5JCyMpVlMWfC7SzyrxKOLhf3VHbS4QZ4uejV5_tuIH6y6w9fg0zuD2LKlJbzE&_nc_zt=23&_nc_ht=scontent.ffih1-2.fna&oh=00_AfDD1b8snd3fDngl2OALIN7o_fG-2pqnDvYaPGBrrl_VTQ&oe=65BBEE91");
//         models.push(modelImage);


//         const modelListFrench = whatsappModel.MessageRael(number);
//         models.push(modelListFrench);

//     }
//     else {

//         console.log("test num:" + textUser.trim());

//         if ((textUser.length !== 10 || textUser.charAt(0) !== '0' || !isNaN(textUser.trim()))) {

//             const modelLoading = whatsappModel.MessageText("Je récupère vos données. Un instant s'il vous plaît...⏳ ", number);
//             models.push(modelLoading);

//             const numberWithout43 = textUser.trim().substring(1);

//             let dataPost = JSON.stringify({
//                 phoneWhatsapp: number,
//                 phone: "243" + numberWithout43,
//             });

//             let config = {
//                 method: 'post',
//                 maxBodyLength: Infinity,
//                 url: 'http://68.183.30.146/api/v1/transacademiaupdate',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 data: dataPost
//             };

//             axios.request(config)
//                 .then((response) => {

//                     console.log(response.data.data.msg);

//                     if (response.data.data.msg == "phoneAccount") {

//                         if (response.data.data.data.status == 200) {
//                             const nameUser = response.data.data.data.donnees[0].nom;
//                             const postnomUser = response.data.data.data.donnees[0].postnom;
//                             const prenomUser = response.data.data.data.donnees[0].prenom;

//                             const modelUser = whatsappModel.MessageText(`j'ai retrouvé ton profil 😉 *${nameUser.toUpperCase()} ${postnomUser.toUpperCase()} ${prenomUser}*`, number);
//                             whatsappService.SendMessageWhatsApp(modelUser);
//                             setTimeout(() => {
//                                 const messageQuestion = whatsappModel.MessagePaymentQuestion(number);
//                                 whatsappService.SendMessageWhatsApp(messageQuestion);
//                             }, 1000);

//                         } else {
//                             console.log("test here ");
//                             const modelError = whatsappModel.MessageText(`Vous n'avez pas de compte Trans Academia, commencez par vous inscrire. Merci.`, number);
//                             whatsappService.SendMessageWhatsApp(modelError);

//                             const modelAgentMessage23 = whatsappModel.MessageApropoEtudiantInscription(number);
//                             whatsappService.SendMessageWhatsApp(modelAgentMessage23);
//                         }

//                     } else {
//                         const modelListFrench = whatsappModel.MessageList2(number);
//                         whatsappService.SendMessageWhatsApp(modelListFrench);

//                     }
//                 })
//                 .catch((error) => {
//                     console.log(error);
//                 });

//         } else {
//             if (!isNaN(parseInt(textUser.trim()))) {
//                 console.log("mon numero : " + textUser.trim());
//                 const errorMessage = "Veuillez saisir un numéro de téléphone valide à 10 chiffres. \n*Le format attendu est le suivant : 0826016607*"
//                 const model = whatsappModel.MessageText(errorMessage, number);
//                 models.push(model);

//             } else {
//                 const model = whatsappModel.MessageText("Je ne comprends pas ce que vous dites", number);
//                 models.push(model);
//             }

//         }

//     }

//     models.forEach(model => {
//         whatsappService.SendMessageWhatsApp(model);
//     });


// }

// async function OTP(textUser, number) {
//     const models = [];
//     const model = whatsappModel.MessageText(textUser, number);
//     models.push(model);

//     models.forEach(model => {
//         whatsappService.SendMessageWhatsApp(model);
//     });



// }

// module.exports = {
//     Process,
//     OTP
// };



const whatsappModel = require("../shared/whatsappmodels");
const whatsappService = require("../services/whatsappService");
const { payment } = require("../shared/payment");
const axios = require("axios");


async function getCandidatesData() {
    try {
        const response = await axios.get('https://api-mobpay.vercel.app/api/v1/candidats');
        return response.data.data;
    } catch (error) {
        console.error('Error fetching candidates data:', error.message);
        return [];
    }
}



async function Process(textUser, number) {
    var models = [];


    if (textUser.toLowerCase().includes("bonjour") || textUser.toLowerCase().includes("bonsoir") || textUser.toLowerCase().includes("salut") || textUser.toLowerCase().includes("slt") || textUser.toLowerCase().includes("bjr") || textUser.toLowerCase().includes("mbote") || textUser.toLowerCase().includes("hello")) {

        const modeImage = whatsappModel.SampleImageDescription(number);
        whatsappService.SendMessageWhatsApp(modeImage);
        setTimeout(() => {
            const mode3 = whatsappModel.MessageFAQ(number);
            whatsappService.SendMessageWhatsApp(mode3);
        }, 1000); // ajustez le délai selon vos besoins
    }
    else if (textUser.toLowerCase().includes("exemen d'etat")) {

        const mode4 = whatsappModel.ListExetat(number);
        whatsappService.SendMessageWhatsApp(mode4);

    }
    else if (textUser.toLowerCase().includes("enafep")) {

        const modelAgentMessage1 = whatsappModel.MessageText("Bientôt disponible.🕜", number);
        models.push(modelAgentMessage1);

    }
    else if (textUser.toLowerCase().includes("tenasosp")) {

        const modelAgentMessage1 = whatsappModel.MessageText("Bientôt disponible.🕜", number);
        models.push(modelAgentMessage1);

    }
    else if (textUser.toLowerCase().includes("parler à un agent")) {

        const modelAgentMessage1 = whatsappModel.MessageText("Votre demande est en cours de traitement. Un agent vous contactera bientôt.🕜", number);
        models.push(modelAgentMessage1);

        const modelAgentMessage2 = whatsappModel.MessageText("Je vais transférer votre chat à un collègue disponible pour vous aider au mieux.", number);
        models.push(modelAgentMessage2);

        const modelAgentMessage3 = whatsappModel.MessageText(`Bonjour, veuillez contacter ce numéro (+${number}) pour une prise en charge immédiate.`, "243822167485");
        models.push(modelAgentMessage3);

    } else if (textUser.toLowerCase().includes("tac étudiant")) {
        const modelAgentMessage1 = whatsappModel.MessageApropoEtudiant(number);
        models.push(modelAgentMessage1);
    } else if (textUser.toLowerCase().includes("tac inter-urbain")) {

        const modelAgentMessage2 = whatsappModel.MessageApropoTacInterUrbain(number);
        models.push(modelAgentMessage2);


    } else if (textUser.toLowerCase().includes("tac kelasi")) {

        const modelAgentMessage4 = whatsappModel.MessageApropoTacKelasi(number);
        models.push(modelAgentMessage4);


    } else if (textUser.toLowerCase().includes("payer l'abonnement")) {

        let dataPost = JSON.stringify({
            phoneWhatsapp: number,
        });

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'http://68.183.30.146/api/v1/transacademia',
            headers: {
                'Content-Type': 'application/json'
            },
            data: dataPost
        };

        axios.request(config)
            .then((response) => {

                const modelPay = whatsappModel.MessageComprar(number);
                whatsappService.SendMessageWhatsApp(modelPay);

            })
            .catch((error) => {
                console.log(error);
            });


    } else if (textUser.toLowerCase().includes("inscription")) {


        const modeUniv = whatsappModel.ListUniversite(number);
        whatsappService.SendMessageWhatsApp(modeUniv);

    } else if ((textUser.toLowerCase().split(' ').length == 2 || textUser.toLowerCase().split(' ').length == 3) &&
        !textUser.toLowerCase().includes("fc") &&
        !textUser.toLowerCase().includes("$")) {

        let dataPost = JSON.stringify({
            phoneWhatsapp: number,
            phone: number,
            nomComplet: textUser.trim(),
            universite: "UNIKIN"
        });

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'http://68.183.30.146/api/v1/createAccount',
            headers: {
                'Content-Type': 'application/json'
            },
            data: dataPost
        };

        axios.request(config)
            .then(async (response) => {

                const stdtac = "STDTAC202306080102QSPFOK52011771";

                const modeImage = whatsappModel.SampleQrCode(number, stdtac);
                whatsappService.SendMessageWhatsApp(modeImage);

                const modelAgentMessage1 = whatsappModel.MessageText("Votre login est : \nNuméro : " + number.slice(3) + "\nMot de passe: *Trans@106*", number);
                whatsappService.SendMessageWhatsApp(modelAgentMessage1);

                const modelAgentMessage2 = whatsappModel.MessageText("Télécharger l'application :\nAndroid: https://play.google.com/store/apps/details?id=com.trans.academia\nIOS: https://apps.apple.com/ci/app/trans-academia/id6447296971  ", number);
                whatsappService.SendMessageWhatsApp(modelAgentMessage2);        

            })
            .catch((error) => {
                console.log(error);
            });

    } else if (textUser.toLowerCase().includes("unikin")) {

        const modelAgentMessage1 = whatsappModel.MessageText("Veuillez renseigner votre nom complet (nom postnom prénom)", number);
        models.push(modelAgentMessage1);

    }


    // case abonnement
    else if (textUser.includes("78 000 FC")) {
        let dataPost = JSON.stringify({
            phoneWhatsapp: number,
        });

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'http://68.183.30.146/api/v1/transacademiastdtac',
            headers: {
                'Content-Type': 'application/json'
            },
            data: dataPost
        };

        axios.request(config)
            .then(async (response) => {

                const modelPopup = whatsappModel.MessageText("Vous allez voir s'afficher le popup de paiement pour 78 000 Fc. Veuillez confirmer le code PIN.\nVous recevrez une réponse dans l'application dans un court laps de temps ! 😊", number);
                whatsappService.SendMessageWhatsApp(modelPopup);
                const numberWithout43 = number.substring(3);
                const phonePayment = response.data.data.phonePayment.substring(3);
                const suffixNumber = numberWithout43.substring(0, 2);
                if (suffixNumber == "81" || suffixNumber == "82" || suffixNumber == "83") {
                    await payment("CDF", "MPESA", "243" + phonePayment, "1", response.data.data.stdTac);

                } else if (suffixNumber == "89" || suffixNumber == "85" || suffixNumber == "84" || suffixNumber == "80") {
                    await payment("CDF", "ORANGE", "0" + phonePayment, "1", response.data.data.stdTac);

                } else if (suffixNumber == "99" || suffixNumber == "98" || suffixNumber == "97") {
                    await payment("CDF", "AIRTEL", phonePayment, "1", response.data.data.stdTac);
                } else {
                    var model = whatsappModel.MessageText("Votre numéro Africell n'est pas pris en charge . Merci de changer de numéro.", number);
                    models.push(model);

                }

            })
            .catch((error) => {
                console.log(error);
            });


    } else if (textUser.includes("30.00 $")) {

        let dataPost = JSON.stringify({
            phoneWhatsapp: number,
        });

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'http://68.183.30.146/api/v1/transacademiastdtac',
            headers: {
                'Content-Type': 'application/json'
            },
            data: dataPost
        };

        axios.request(config)
            .then(async (response) => {

                const modelPopup = whatsappModel.MessageText("Vous allez voir s'afficher le popup de paiement pour 30.00 $. Veuillez confirmer le code PIN.\nVous recevrez une réponse dans l'application dans un court laps de temps ! 😊", number);
                whatsappService.SendMessageWhatsApp(modelPopup);
                const numberWithout43 = number.substring(3);
                const phonePayment = response.data.data.phonePayment.substring(3);
                const suffixNumber = numberWithout43.substring(0, 2);
                if (suffixNumber == "81" || suffixNumber == "82" || suffixNumber == "83") {
                    await payment("USD", "MPESA", "243" + phonePayment, "1", response.data.data.stdTac);

                } else if (suffixNumber == "89" || suffixNumber == "85" || suffixNumber == "84" || suffixNumber == "80") {
                    await payment("USD", "ORANGE", "0" + phonePayment, "1", response.data.data.stdTac);

                } else if (suffixNumber == "99" || suffixNumber == "98" || suffixNumber == "97") {
                    await payment("USD", "AIRTEL", phonePayment, "1", response.data.data.stdTac);
                } else {
                    var model = whatsappModel.MessageText("Votre numéro Africell n'est pas pris en charge . Merci de changer de numéro.", number);
                    models.push(model);

                }

            })
            .catch((error) => {
                console.log(error);
            });




    }
    else if (textUser.includes("7 000 FC")) {
        let dataPost = JSON.stringify({
            phoneWhatsapp: number,
        });

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'http://68.183.30.146/api/v1/transacademiastdtac',
            headers: {
                'Content-Type': 'application/json'
            },
            data: dataPost
        };

        axios.request(config)
            .then(async (response) => {

                const modelPopup = whatsappModel.MessageText("Vous allez voir s'afficher le popup de paiement pour 3 000 Fc. Veuillez confirmer le code PIN.\nVous recevrez une réponse dans l'application dans un court laps de temps ! 😊", number);
                whatsappService.SendMessageWhatsApp(modelPopup);
                const numberWithout43 = number.substring(3);
                const phonePayment = response.data.data.phonePayment.substring(3);
                const suffixNumber = numberWithout43.substring(0, 2);
                if (suffixNumber == "81" || suffixNumber == "82" || suffixNumber == "83") {
                    await payment("CDF", "MPESA", "243" + phonePayment, "3", response.data.data.stdTac);

                } else if (suffixNumber == "89" || suffixNumber == "85" || suffixNumber == "84" || suffixNumber == "80") {
                    await payment("CDF", "ORANGE", "0" + phonePayment, "3", response.data.data.stdTac);

                } else if (suffixNumber == "99" || suffixNumber == "98" || suffixNumber == "97") {
                    await payment("CDF", "AIRTEL", phonePayment, "3", response.data.data.stdTac);
                } else {
                    var model = whatsappModel.MessageText("Votre numéro Africell n'est pas pris en charge . Merci de changer de numéro.", number);
                    models.push(model);

                }

            })
            .catch((error) => {
                console.log(error);
            });


    } else if (textUser.includes("2.69 $")) {

        let dataPost = JSON.stringify({
            phoneWhatsapp: number,
        });

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'http://68.183.30.146/api/v1/transacademiastdtac',
            headers: {
                'Content-Type': 'application/json'
            },
            data: dataPost
        };

        axios.request(config)
            .then(async (response) => {

                const modelPopup = whatsappModel.MessageText("Vous allez voir s'afficher le popup de paiement pour 2.69 $. Veuillez confirmer le code PIN.\nVous recevrez une réponse dans l'application dans un court laps de temps ! 😊", number);
                whatsappService.SendMessageWhatsApp(modelPopup);
                const numberWithout43 = number.substring(3);
                const phonePayment = response.data.data.phonePayment.substring(3);
                const suffixNumber = numberWithout43.substring(0, 2);
                if (suffixNumber == "81" || suffixNumber == "82" || suffixNumber == "83") {
                    await payment("USD", "MPESA", "243" + phonePayment, "3", response.data.data.stdTac);

                } else if (suffixNumber == "89" || suffixNumber == "85" || suffixNumber == "84" || suffixNumber == "80") {
                    await payment("USD", "ORANGE", "0" + phonePayment, "3", response.data.data.stdTac);

                } else if (suffixNumber == "99" || suffixNumber == "98" || suffixNumber == "97") {
                    await payment("USD", "AIRTEL", phonePayment, "3", response.data.data.stdTac);
                } else {
                    var model = whatsappModel.MessageText("Votre numéro Africell n'est pas pris en charge . Merci de changer de numéro.", number);
                    models.push(model);

                }

            })
            .catch((error) => {
                console.log(error);
            });




    }

    else if (textUser.includes("3 000 FC")) {
        let dataPost = JSON.stringify({
            phoneWhatsapp: number,
        });

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'http://68.183.30.146/api/v1/transacademiastdtac',
            headers: {
                'Content-Type': 'application/json'
            },
            data: dataPost
        };

        axios.request(config)
            .then(async (response) => {

                const modelPopup = whatsappModel.MessageText("Vous allez voir s'afficher le popup de paiement pour 3 000 Fc. Veuillez confirmer le code PIN.\nVous recevrez une réponse dans l'application dans un court laps de temps ! 😊", number);
                whatsappService.SendMessageWhatsApp(modelPopup);
                const numberWithout43 = number.substring(3);
                const phonePayment = response.data.data.phonePayment.substring(3);
                const suffixNumber = numberWithout43.substring(0, 2);
                if (suffixNumber == "81" || suffixNumber == "82" || suffixNumber == "83") {
                    await payment("CDF", "MPESA", "243" + phonePayment, "9", response.data.data.stdTac);

                } else if (suffixNumber == "89" || suffixNumber == "85" || suffixNumber == "84" || suffixNumber == "80") {
                    await payment("CDF", "ORANGE", "0" + phonePayment, "9", response.data.data.stdTac);

                } else if (suffixNumber == "99" || suffixNumber == "98" || suffixNumber == "97") {
                    await payment("CDF", "AIRTEL", phonePayment, "9", response.data.data.stdTac);
                } else {
                    var model = whatsappModel.MessageText("Votre numéro Africell n'est pas pris en charge . Merci de changer de numéro.", number);
                    models.push(model);

                }

            })
            .catch((error) => {
                console.log(error);
            });


    } else if (textUser.includes("1.15 $")) {

        let dataPost = JSON.stringify({
            phoneWhatsapp: number,
        });

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'http://68.183.30.146/api/v1/transacademiastdtac',
            headers: {
                'Content-Type': 'application/json'
            },
            data: dataPost
        };

        axios.request(config)
            .then(async (response) => {

                const modelPopup = whatsappModel.MessageText("Vous allez voir s'afficher le popup de paiement pour 1.15 $. Veuillez confirmer le code PIN.\nVous recevrez une réponse dans l'application dans un court laps de temps ! 😊", number);
                whatsappService.SendMessageWhatsApp(modelPopup);
                const numberWithout43 = number.substring(3);
                const phonePayment = response.data.data.phonePayment.substring(3);
                const suffixNumber = numberWithout43.substring(0, 2);
                if (suffixNumber == "81" || suffixNumber == "82" || suffixNumber == "83") {
                    await payment("USD", "MPESA", "243" + phonePayment, "9", response.data.data.stdTac);

                } else if (suffixNumber == "89" || suffixNumber == "85" || suffixNumber == "84" || suffixNumber == "80") {
                    await payment("USD", "ORANGE", "0" + phonePayment, "9", response.data.data.stdTac);

                } else if (suffixNumber == "99" || suffixNumber == "98" || suffixNumber == "97") {
                    await payment("USD", "AIRTEL", phonePayment, "9", response.data.data.stdTac);
                } else {
                    var model = whatsappModel.MessageText("Votre numéro Africell n'est pas pris en charge . Merci de changer de numéro.", number);
                    models.push(model);

                }

            })
            .catch((error) => {
                console.log(error);
            });




    }

    else if (textUser.includes("1 000 FC")) {
        let dataPost = JSON.stringify({
            phoneWhatsapp: number,
        });

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'http://68.183.30.146/api/v1/transacademiastdtac',
            headers: {
                'Content-Type': 'application/json'
            },
            data: dataPost
        };

        axios.request(config)
            .then(async (response) => {

                const modelPopup = whatsappModel.MessageText("Vous allez voir s'afficher le popup de paiement pour 1 000 Fc. Veuillez confirmer le code PIN.\nVous recevrez une réponse dans l'application dans un court laps de temps ! 😊", number);
                whatsappService.SendMessageWhatsApp(modelPopup);
                const numberWithout43 = number.substring(3);
                const phonePayment = response.data.data.phonePayment.substring(3);
                const suffixNumber = numberWithout43.substring(0, 2);
                if (suffixNumber == "81" || suffixNumber == "82" || suffixNumber == "83") {
                    await payment("CDF", "MPESA", "243" + phonePayment, "13", response.data.data.stdTac);

                } else if (suffixNumber == "89" || suffixNumber == "85" || suffixNumber == "84" || suffixNumber == "80") {
                    await payment("CDF", "ORANGE", "0" + phonePayment, "13", response.data.data.stdTac);

                } else if (suffixNumber == "99" || suffixNumber == "98" || suffixNumber == "97") {
                    await payment("CDF", "AIRTEL", phonePayment, "13", response.data.data.stdTac);
                } else {
                    var model = whatsappModel.MessageText("Votre numéro Africell n'est pas pris en charge . Merci de changer de numéro.", number);
                    models.push(model);

                }
            })
            .catch((error) => {
                console.log(error);
            });


    } else if (textUser.includes("0.38 $")) {

        let dataPost = JSON.stringify({
            phoneWhatsapp: number,
        });

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'http://68.183.30.146/api/v1/transacademiastdtac',
            headers: {
                'Content-Type': 'application/json'
            },
            data: dataPost
        };

        axios.request(config)
            .then(async (response) => {

                const modelPopup = whatsappModel.MessageText("Vous allez voir s'afficher le popup de paiement pour 0.38 $. Veuillez confirmer le code PIN.\nVous recevrez une réponse dans l'application dans un court laps de temps ! 😊", number);
                whatsappService.SendMessageWhatsApp(modelPopup);
                const numberWithout43 = number.substring(3);
                const phonePayment = response.data.data.phonePayment.substring(3);
                const suffixNumber = numberWithout43.substring(0, 2);
                if (suffixNumber == "81" || suffixNumber == "82" || suffixNumber == "83") {
                    await payment("USD", "MPESA", "243" + phonePayment, "13", response.data.data.stdTac);

                } else if (suffixNumber == "89" || suffixNumber == "85" || suffixNumber == "84" || suffixNumber == "80") {
                    await payment("USD", "ORANGE", "0" + phonePayment, "13", response.data.data.stdTac);

                } else if (suffixNumber == "99" || suffixNumber == "98" || suffixNumber == "97") {
                    await payment("USD", "AIRTEL", phonePayment, "13", response.data.data.stdTac);
                } else {
                    var model = whatsappModel.MessageText("Votre numéro Africell n'est pas pris en charge . Merci de changer de numéro.", number);
                    models.push(model);

                }

            })
            .catch((error) => {
                console.log(error);
            });




    } else if (textUser.includes("Oui")) {

        const modelLoading = whatsappModel.MessageText("Je récupère vos données. Un instant s'il vous plaît...⏳ ", number);
        models.push(modelLoading);

        const numberWithout43 = textUser.trim().substring(1);

        let dataPost = JSON.stringify({
            phoneWhatsapp: number,
            phone: "243" + numberWithout43,
        });

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'http://68.183.30.146/api/v1/transacademiaupdate',
            headers: {
                'Content-Type': 'application/json'
            },
            data: dataPost
        };

        axios.request(config)
            .then((response) => {

                console.log(response.data.data.msg);

                if (response.data.data.msg == "phoneAccount") {


                    if (response.data.data.data.status == 200) {
                        console.log("Mon data : " + JSON.stringify(response.data.data.data.donnees[0].nom));
                        const nameUser = response.data.data.data.donnees[0].nom;
                        const postnomUser = response.data.data.data.donnees[0].postnom;
                        const prenomUser = response.data.data.data.donnees[0].prenom;

                        const modelUser = whatsappModel.MessageText(`j'ai retrouvé ton profil 😉 *${nameUser.toUpperCase()} ${postnomUser.toUpperCase()} ${prenomUser.toUpperCase()}*`, number);
                        whatsappService.SendMessageWhatsApp(modelUser);
                        setTimeout(() => {
                            const messageQuestion = whatsappModel.MessagePaymentQuestion(number);
                            whatsappService.SendMessageWhatsApp(messageQuestion);
                        }, 1000);

                    } else {
                        const modelError = whatsappModel.MessageText(`Vous n'avez pas de compte Trans Academia, commencez par vous inscrire. Merci.`, number);
                        whatsappService.SendMessageWhatsApp(modelError);

                        const modelAgentMessage23 = whatsappModel.MessageApropoEtudiantInscription(number);
                        whatsappService.SendMessageWhatsApp(modelAgentMessage23);


                    }


                } else {
                    const modelListFrench = whatsappModel.MessageList2(number);
                    whatsappService.SendMessageWhatsApp(modelListFrench);

                }
            })
            .catch((error) => {
                console.log(error);
            });

    } else if (textUser.includes("OUI")) {

        let dataPost = JSON.stringify({
            phoneWhatsapp: number,
            phone: number,
        });

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'http://68.183.30.146/api/v1/transacademiaupdate',
            headers: {
                'Content-Type': 'application/json'
            },
            data: dataPost
        };

        axios.request(config)
            .then((response) => {
                const modelListFrench = whatsappModel.MessageList2(number);
                console.log("mon list " + modelListFrench);
                whatsappService.SendMessageWhatsApp(modelListFrench);
            })
            .catch((error) => {
                console.log(error);
            });



    }
    //  else if (textUser.includes("Non")) {
    //     const modelAgentMessage2 = whatsappModel.MessageText("Donnez-nous votre numéro de compte Trans Academia pour avancer dans le processus.\n*Voici un exemple de format : 0826016607.*", number);
    //     models.push(modelAgentMessage2);

    // } 
    else if (textUser.includes("Non")) {

        const modelAgentMessage2 = whatsappModel.MessageText("J'ai besoin de votre numéro de compte Trans Academia\n*Voici un exemple de format : 0826016607*", number);
        // const modelAgentMessage2 = whatsappModel.MessageText("Veuillez saisir votre numéro de compte Trans Academia pour avancer dans le processus.\n*Voici un exemple de format : 0826016607.*", number);
        models.push(modelAgentMessage2);

    } else if (textUser.includes("NON")) {


        const modelAgentMessage2 = whatsappModel.MessageText("Entrez maintenant votre numéro de paiement.\n*Voici un exemple de format : 0826016607*", number);
        models.push(modelAgentMessage2);

    } else if (textUser.toLowerCase().includes("test")) {

        const modelImage = whatsappModel.MessageImage(number, "https://scontent.ffih1-2.fna.fbcdn.net/v/t39.30808-6/284207018_103562862390099_7481114687468144580_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=efb6e6&_nc_eui2=AeEJDyZV5AvEMVvsmvrCiHH9Jz0qNC8ZFscnPSo0LxkWx6ZyK-8HOs9reGb7y6dJ5VNCscZMYvfmxd8UDPRzM2Fx&_nc_ohc=YnXwn9IC49MAX-6ZUDk&_nc_oc=AQl9AY5JCyMpVlMWfC7SzyrxKOLhf3VHbS4QZ4uejV5_tuIH6y6w9fg0zuD2LKlJbzE&_nc_zt=23&_nc_ht=scontent.ffih1-2.fna&oh=00_AfDD1b8snd3fDngl2OALIN7o_fG-2pqnDvYaPGBrrl_VTQ&oe=65BBEE91");
        models.push(modelImage);


        const modelListFrench = whatsappModel.MessageRael(number);
        models.push(modelListFrench);

    }
    else {

        console.log("test num:" + textUser.trim());

        if ((textUser.length !== 10 || textUser.charAt(0) !== '0' || !isNaN(textUser.trim()))) {

            const modelLoading = whatsappModel.MessageText("Je récupère vos données. Un instant s'il vous plaît...⏳ ", number);
            models.push(modelLoading);

            const numberWithout43 = textUser.trim().substring(1);

            let dataPost = JSON.stringify({
                phoneWhatsapp: number,
                phone: "243" + numberWithout43,
            });

            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: 'http://68.183.30.146/api/v1/transacademiaupdate',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: dataPost
            };

            axios.request(config)
                .then((response) => {

                    console.log(response.data.data.msg);

                    if (response.data.data.msg == "phoneAccount") {

                        if (response.data.data.data.status == 200) {
                            const nameUser = response.data.data.data.donnees[0].nom;
                            const postnomUser = response.data.data.data.donnees[0].postnom;
                            const prenomUser = response.data.data.data.donnees[0].prenom;

                            const modelUser = whatsappModel.MessageText(`j'ai retrouvé ton profil 😉 *${nameUser.toUpperCase()} ${postnomUser.toUpperCase()} ${prenomUser}*`, number);
                            whatsappService.SendMessageWhatsApp(modelUser);
                            setTimeout(() => {
                                const messageQuestion = whatsappModel.MessagePaymentQuestion(number);
                                whatsappService.SendMessageWhatsApp(messageQuestion);
                            }, 1000);

                        } else {
                            console.log("test here ");
                            const modelError = whatsappModel.MessageText(`Vous n'avez pas de compte Trans Academia, commencez par vous inscrire. Merci.`, number);
                            whatsappService.SendMessageWhatsApp(modelError);

                            const modelAgentMessage23 = whatsappModel.MessageApropoEtudiantInscription(number);
                            whatsappService.SendMessageWhatsApp(modelAgentMessage23);
                        }

                    } else {
                        const modelListFrench = whatsappModel.MessageList2(number);
                        whatsappService.SendMessageWhatsApp(modelListFrench);

                    }
                })
                .catch((error) => {
                    console.log(error);
                });

        } else {
            if (!isNaN(parseInt(textUser.trim()))) {
                console.log("mon numero : " + textUser.trim());
                const errorMessage = "Veuillez saisir un numéro de téléphone valide à 10 chiffres. \n*Le format attendu est le suivant : 0826016607*"
                const model = whatsappModel.MessageText(errorMessage, number);
                models.push(model);

            } else {
                const model = whatsappModel.MessageText("Je ne comprends pas ce que vous dites", number);
                models.push(model);
            }

        }

    }

    models.forEach(model => {
        whatsappService.SendMessageWhatsApp(model);
    });


}

async function OTP(textUser, number) {
    const models = [];
    const model = whatsappModel.MessageText(textUser, number);
    models.push(model);

    models.forEach(model => {
        whatsappService.SendMessageWhatsApp(model);
    });



}

module.exports = {
    Process,
    OTP
};