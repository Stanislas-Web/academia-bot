function MessageText(textResponse, number){
    const data = JSON.stringify({
        "messaging_product": "whatsapp",
        "to": number,    
        "text": {
            "preview_url": true,
            "body": textResponse
        },
        "type": "text"
    });
    return data;
}

function MessageList2(number){
    const data = JSON.stringify({
        "messaging_product": "whatsapp",
        "to": number,
        "type": "interactive",
        "interactive": {
            "type": "list",
            "body": {
                "text": "💵 Abonnement"
            },
            "footer": {
                "text": "Selectionner votre abonnement"
            },
            "action": {
                "button": "Voir les forfaits",
                "sections": [
                    {
                        "title": "26 jours | forfait mois",
                        "rows": [
                            {
                                "id": "main-comprar",
                                "title": "78 000 FC",
                                "description": "6 courses par jour"
                            },
                            {
                                "id": "003",
                                "title": "30.00 $",
                                "description": "6 courses par jour"
                            }
                        ]
                    },
                    // {
                    //     "title": "26 jours | forfait mois",
                    //     "rows": [
                    //         {
                    //             "id": "main-comprar",
                    //             "title": "26 000 FC",
                    //             "description": "2 courses par jour"
                    //         },
                    //         {
                    //             "id": "003",
                    //             "title": "10 $",
                    //             "description": "2 courses par jour"
                    //         }
                    //     ]
                    // },
                    // {
                    //     "title": "14 jours | forfait mois",
                    //     "rows": [
                    //         {
                    //             "id": "main-comprar",
                    //             "title": "28 000 FC",
                    //             "description": "4 courses par jour"
                    //         },
                    //         {
                    //             "id": "003",
                    //             "title": "10.76 $",
                    //             "description": "4 courses par jour"
                    //         }
                    //     ]
                    // },
                    {
                        "title": "Forfait 7 jours",
                        "rows": [
                            {
                                "id": "main-comprar",
                                "title": "7 000 FC",
                                "description": "2 courses par jour"
                            },
                            {
                                "id": "main-vender",
                                "title": "2.69 $",
                                "description": "2 courses par jour"
                            }
                        ]
                    },

                    // {
                    //     "title": "Forfait 7 jours",
                    //     "rows": [
                    //         {
                    //             "id": "main-comprar",
                    //             "title": "14 000 FC",
                    //             "description": "4 courses par jour"
                    //         },
                    //         {
                    //             "id": "main-vender",
                    //             "title": "5.38 $",
                    //             "description": "4 courses par jour"
                    //         }
                    //     ]
                    // },
                    // {
                    //     "title": "Forfait 3 jours",
                    //     "rows": [
                    //         {
                    //             "id": "main-comprar",
                    //             "title": "6 000 FC",
                    //             "description": "2 courses par jour"
                    //         },
                    //         {
                    //             "id": "main-vender",
                    //             "title": "2.3 $",
                    //             "description": "2 courses par jour"
                    //         }
                    //     ]
                    // },
                    {
                        "title": "Forfait 3 jours",
                        "rows": [
                            {
                                "id": "main-comprar",
                                "title": "3 000 FC",
                                "description": "2 courses par jour"
                            },
                            {
                                "id": "main-vender",
                                "title": "1.15 $",
                                "description": "2 courses par jour"
                            }
                        ]
                    },
                    { 
                        "title": "Kuenda Vutuka | 1 jour",
                        "rows": [
                            {
                                "id": "main-comprar",
                                "title": "1 000 FC",
                                "description": "2 courses aller-retour"
                            },
                            {
                                "id": "main-vender",
                                "title": "0.38 $",
                                "description": "2 courses aller-retour"
                            }
                        ]
                    },
                ]
            }
        }
    });
    return data;
}

function MessageImage(number, link){
    const data = JSON.stringify({
        "messaging_product": "whatsapp",
        "to": number,
        "type": "image",  
        "image": {
            "link": link
        }        
    });
    return data;
}

function MessageRael(number){
    const data = JSON.stringify({
        "messaging_product": "whatsapp",
        "to": number,
        "type": "interactive",
        "interactive": {
            "type": "list",
            "body": {
                "text": "MON PREMIER MONTREUX"
            },
            "footer": {
                "text": "Votez votre candidat ou équipe"
            },
            "action": {
                "button": "Liste des candidats",
                "sections": [
                    {
                        "title": "27925 ❤️",
                        "rows": [
                            {
                                "id": "main-comprar",
                                "title": "LES CRACKS",
                                "description": "Nos inspirations artistiques proviennent des faits de société, dans..."
                            },
                      
                       
                        ]
                    },
                    {
                        "title": "1735 ❤️",
                        "rows": [
                            {
                                "id": "main-vender",
                                "title": "BKG SUPREME",
                                "description": "Artiste Rappeur, Coach d'artistes, Directeur Artistique, auteur..."
                            },
                       
                        ]
                    },
                    {
                        "title": "1312 ❤️",
                        "rows": [
                            {
                                "id": "main-comprar",
                                "title": "DJAUST POUNGA",
                                "description": "La société a été une grande inspiration pour moi, remarquant que les..."
                            },
                       
                        ]
                    },
                 
                ]
            }
        }
    });
    return data;
}

function MessageListFrench(number){
    const data = JSON.stringify({
        "messaging_product": "whatsapp",
        "to": number,
        "type": "interactive",
        "interactive": {
            "type": "list",
            "body": {
                "text": "✅ J'ai ces options"
            },
            "footer": {
                "text": "Sélectionnez l'une des options pour que nous puissions vous aider"
            },
            "action": {
                "button": "Voir les options",
                "sections": [
                    {
                        "title": "Compra y vende productos",
                        "rows": [
                            {
                                "id": "main-comprar",
                                "title": "Comprar",
                                "description": "Compra los mejores productos para tu hogar"
                            },
                            {
                                "id": "main-vender",
                                "title": "Vender",
                                "description": "Vende tus productos"
                            }
                        ]
                    },
                    {
                        "title": "📍Centro de atención",
                        "rows": [
                            {
                                "id": "main-agencia",
                                "title": "Agencia",
                                "description": "Puedes visitar nuestra agencia."
                            },
                            {
                                "id": "main-contacto",
                                "title": "Centro de contacto",
                                "description": "Te atenderá uno de nuestro agentes."
                            }
                        ]
                    }
                ]
            }
        }
    });
    return data;
}

function MessageList(number){
    const data = JSON.stringify({
        "messaging_product": "whatsapp",
        "to": number,
        "type": "interactive",
        "interactive": {
            "type": "list",
            "body": {
                "text": "✅ Tengo estas opciones"
            },
            "footer": {
                "text": "Selecciona una de las opciones para poder atenderte"
            },
            "action": {
                "button": "Ver opciones",
                "sections": [
                    {
                        "title": "Compra y vende productos",
                        "rows": [
                            {
                                "id": "main-comprar",
                                "title": "Comprar",
                                "description": "Compra los mejores productos para tu hogar"
                            },
                            {
                                "id": "main-vender",
                                "title": "Vender",
                                "description": "Vende tus productos"
                            }
                        ]
                    },
                    {
                        "title": "📍Centro de atención",
                        "rows": [
                            {
                                "id": "main-agencia",
                                "title": "Agencia",
                                "description": "Puedes visitar nuestra agencia."
                            },
                            {
                                "id": "main-contacto",
                                "title": "Centro de contacto",
                                "description": "Te atenderá uno de nuestro agentes."
                            }
                        ]
                    }
                ]
            }
        }
    });
    return data;
}

function MessageComprar(number){
    const data = JSON.stringify({
        "messaging_product": "whatsapp",
        "to": number,
        "type": "interactive",  
        "interactive": {
            "type": "button",
            "body": {
                // "text": "Souhaites-tu utiliser ton numéro WhatsApp comme numéro de paiement ?"
                "text":"Votre numéro de téléphone WhatsApp est-il le même que celui de votre compte Trans Academia ? 🤔",
            },
            "action": {
                "buttons": [
                    {
                        "type": "reply",
                        "reply": {
                            "id": "option-laptop",
                            "title": "Oui"
                        }
                    },
                    {
                        "type": "reply",
                        "reply": {
                            "id": "option-computadora",
                            "title": "Non"
                        }
                    }
                ]
            }
        }     
    });
    return data;
}


function MessagePaymentQuestion(number){
    const data = JSON.stringify({
        "messaging_product": "whatsapp",
        "to": number,
        "type": "interactive",  
        "interactive": {
            "type": "button",
            "body": {
                "text": "Voulez-vous payer avec votre numéro WhatsApp ? 🤔"
                // "text":"Votre numéro de téléphone WhatsApp est-il le même que celui de votre compte Trans Academia ?",
            },
            "action": {
                "buttons": [
                    {
                        "type": "reply",
                        "reply": {
                            "id": "option-laptop",
                            "title": "OUI"
                        }
                    },
                    {
                        "type": "reply",
                        "reply": {
                            "id": "option-computadora",
                            "title": "NON"
                        }
                    }
                ]
            }
        }     
    });
    return data;
}


function MessageLocation(number){
    const data = JSON.stringify({
        "messaging_product": "whatsapp",
        "to": number,
        "type": "location",
        "location": {
        "latitude": "-12.067158831865067",
        "longitude": "-77.03377940839486",
        "name": "Estadio Nacional del Perú",
        "address": "C. José Díaz s/n, Cercado de Lima 15046"
    }
        
    });
    return data;
}

function SampleImage(number){
    const data = JSON.stringify({
        "messaging_product": "whatsapp",
        "to": number,
        "type": "image",  
        "image": {
            "link": "https://z-p3-scontent.ffih1-2.fna.fbcdn.net/v/t39.30808-6/437402303_411322101851892_1190667606985152048_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeFjFZSH1x5lqZ9z4stAMuiSmjtITj17zH6aO0hOPXvMfiKdn0t5VaydTRqDaPX00JE9sFbHonCvdnfgFi0RYAVC&_nc_ohc=bXzm2c-DETcAb7IjiDS&_nc_pt=5&_nc_zt=23&_nc_ht=z-p3-scontent.ffih1-2.fna&oh=00_AfD08fHeob40tP8oqX8WSSU8kLyTFiwMza4ojIFc0Q2KJg&oe=66285079"
        }        
    });
    return data;
}

function ListeOption(number){
    const data = JSON.stringify({
        "messaging_product": "whatsapp",
        "to": number,
        "type": "interactive",  
        "interactive": {
            "type": "button",
            "body": {
                "text": "Explorez les opérations suivantes :"
            },
            "action": {
                "buttons": [
                    {
                        "type": "reply",
                        "reply": {
                            "id": "001",
                            "title": "Payer l'abonnement"
                        }
                    },
                    {
                        "type": "reply",
                        "reply": {
                            "id": "002",
                            "title": "Inscription"
                        }
                    },
                    
                ]
            }
        }     
    });
    return data;
}

function ListUniversite(number){
    const data = JSON.stringify({
        "messaging_product": "whatsapp",
        "to": number,
        "type": "interactive",
        "interactive": {
          "type": "list",
          "body": {
            "text": "Cliquez ici pour choisir l'université. "
          },
          "action": {
            "button": "Les universités",
            "sections": [
              {
                "title": "",  // Empty title for sections
                "rows": [
                  {
                    "id": "001",
                    "title": "UNIKIN"
                  },
                //   {
                //     "id": "002",
                //     "title": "UPN"
                //   },
                //   {
                //     "id": "003",
                //     "title": "UPC"
                //   },
                //   {
                //     "id": "004",
                //     "title": "UCC"
                //   },
                  
                ]
              }
            ]
          }
        }
      });
    return data;
}





function MessageFAQ(number){
    const data = JSON.stringify({
        "messaging_product": "whatsapp",
        "to": number,
        "type": "interactive",
        "interactive": {
          "type": "list",
          "body": {
            "text": "Cliquez ici pour sélectionner l'examen à payer." 
          },
          "action": {
            "button": "Tous les examens",
            "sections": [
              {
                "title": "",  // Empty title for sections
                "rows": [
                  {
                    "id": "001",
                    "title": "EXETAT"
                  },
                  {
                    "id": "002",
                    "title": "TENASOSP"
                  },
                //   {
                //     "id": "003",
                //     "title": "Tac Inter-urbain"
                //   },
                //   {
                //     "id": "004",
                //     "title": "Tac Kelasi"
                //   },
                  
                ]
              }
            ]
          }
        }
      });
    return data;
}


function SampleImageDescription(number){
    const data = JSON.stringify({
        "messaging_product": "whatsapp",
        "to": number,
        "type": "image",  
        "image": {
            "link": "https://firebasestorage.googleapis.com/v0/b/akilimali-2fb0e.appspot.com/o/exetat.webp?alt=media&token=9d66557b-d4a5-4273-9cd3-75fa2541e9e7",
            "caption":"Bonjour 👋🏾, je suis EDUCBOT 🤖"
        }        
    });
    return data;
}

function SampleQrCode(number, stdTac){
    const data = JSON.stringify({
        "messaging_product": "whatsapp",
        "to": number,
        "type": "image",  
        "image": {
            "link": "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data="+stdTac,
            "caption":"Votre Qr Code"
        }        
    });
    return data;
}

function MessageApropoEtudiant(number) {
    let text = "Conformément aux dispositions des articles 6 alinéa 3 et 26 du Décret n°22/12 du 25 mars 2022 portant Création et Statuts de l’Etablissement Public dénommé Transport Académique, en sigle Trans-Academia. Il a plu au Président de la république Monsieur *Félix Antoine TSHISEKEDI TSHILOMBO* de doter aux étudiants un moyen de transports pour faciliter leur déplacement. Le dit établissement public sera doté d'une personnalité juridique et va jouir de son autonomie administrative et financière dénommé 'Transport Académique' en abrégé 'Trans Academia'.Cet établissement a pour objet le transport en commun des étudiants des institutions d'enseignement supérieur et universitaire de la République Démocratique du Congo à des tarifs préférentiels.\n\nhttps://trans-academia.cd/"
    const data = JSON.stringify({
        "messaging_product": "whatsapp",
        "to": number,
        "type": "interactive",
        "interactive": {
            "type": "button",
            "header":{
                "type":"image",
                "image":{
                    "link":"https://res.cloudinary.com/deb9kfhnx/image/upload/v1713606156/nxcerbawfkxlcxl7r4op.jpg"
                }
            },
            "body": {
                "text": "",
            },
            "action": {
                "buttons": [
                    {
                        "type": "reply",
                        "reply": {
                            "id": "003",
                            "title": "Payer l'abonnement"
                        }
                    },
                    {
                        "type": "reply",
                        "reply": {
                            "id": "option-laptop",
                            "title": "Inscription"
                        }
                    },
                ]
            }
        }
    });
    return data;
}

function MessageApropoEtudiantInscription(number) {

    // let text = "Conformément aux dispositions des articles 6 alinéa 3 et 26 du Décret n°22/12 du 25 mars 2022 portant Création et Statuts de l’Etablissement Public dénommé Transport Académique, en sigle Trans-Academia. Il a plu au Président de la république Monsieur *Félix Antoine TSHISEKEDI TSHILOMBO* de doter aux étudiants un moyen de transports pour faciliter leur déplacement. Le dit établissement public sera doté d'une personnalité juridique et va jouir de son autonomie administrative et financière dénommé 'Transport Académique' en abrégé 'Trans Academia'.Cet établissement a pour objet le transport en commun des étudiants des institutions d'enseignement supérieur et universitaire de la République Démocratique du Congo à des tarifs préférentiels.\n\nhttps://trans-academia.cd/"
    const data = JSON.stringify({
        "messaging_product": "whatsapp",
        "to": number,
        "type": "interactive",
        "interactive": {
            "type": "button",
            "header":{
                "type":"image",
                "image":{
                    "link":"https://res.cloudinary.com/deb9kfhnx/image/upload/v1713606156/nxcerbawfkxlcxl7r4op.jpg"
                }
            },
            "body": {
                "text": "*Inscription*",
            },
            "action": {
                "buttons": [
                    // {
                    //     "type": "reply",
                    //     "reply": {
                    //         "id": "003",
                    //         "title": "Payer l'abonnement"
                    //     }
                    // },
                    {
                        "type": "reply",
                        "reply": {
                            "id": "option-laptop",
                            "title": "Inscription"
                        }
                    },
                ]
            }
        }
    });
    return data;
}


function MessageApropoEtudiant(number) {
    // let text = "Conformément aux dispositions des articles 6 alinéa 3 et 26 du Décret n°22/12 du 25 mars 2022 portant Création et Statuts de l’Etablissement Public dénommé Transport Académique, en sigle Trans-Academia. Il a plu au Président de la république Monsieur *Félix Antoine TSHISEKEDI TSHILOMBO* de doter aux étudiants un moyen de transports pour faciliter leur déplacement. Le dit établissement public sera doté d'une personnalité juridique et va jouir de son autonomie administrative et financière dénommé 'Transport Académique' en abrégé 'Trans Academia'.Cet établissement a pour objet le transport en commun des étudiants des institutions d'enseignement supérieur et universitaire de la République Démocratique du Congo à des tarifs préférentiels.\n\nhttps://trans-academia.cd/"
    const data = JSON.stringify({
        "messaging_product": "whatsapp",
        "to": number,
        "type": "interactive",
        "interactive": {
            "type": "button",
            "header":{
                "type":"image",
                "image":{
                    "link":"https://res.cloudinary.com/deb9kfhnx/image/upload/v1713606156/nxcerbawfkxlcxl7r4op.jpg"
                }
            },
            "body": {
                "text": "*Tac Étudiant*",
            },
            "action": {
                "buttons": [
                    {
                        "type": "reply",
                        "reply": {
                            "id": "003",
                            "title": "Payer l'abonnement"
                        }
                    },
                    {
                        "type": "reply",
                        "reply": {
                            "id": "option-laptop",
                            "title": "Inscription"
                        }
                    },
                ]
            }
        }
    });
    return data;
}


function MessageApropoTacInterUrbain(number) {

    // let text = "Notre projet ambitieux vise à moderniser et à optimiser le système de transport dans votre région en y intégrant des technologies de pointe et des solutions innovantes, pour vous offrir un voyage plus facile, plus rapide et plus durable. Imaginez des itinéraires optimisés en temps réel qui vous permettent d'atteindre votre destination en un minimum de temps, des véhicules écologiques qui réduisent votre empreinte carbone et simplifient vos déplacements, des systèmes de billetterie électronique pratiques et des applications mobiles intuitives qui vous permettent de gérer vos voyages en toute simplicité. Rejoignez-nous dans cette aventure passionnante et contribuez à façonner un avenir plus vert et plus connecté pour le transport local interurbain. Ensemble, nous pouvons transformer votre façon de vous déplacer et créer un impact positif sur notre environnement et nos communautés. Soyez acteur du changement et participez à la construction d'un futur du transport plus durable et plus agréable pour tous !"
    const data = JSON.stringify({
        "messaging_product": "whatsapp",
        "to": number,
        "type": "interactive",
        "interactive": {
            "type": "button",
            "header":{
                "type":"image",
                "image":{
                    "link":"https://res.cloudinary.com/deb9kfhnx/image/upload/v1713608071/cpekjyjnkznoroa0llw3.png"
                }
            },
            "body": {
                "text": "*Tac Inter-urbain*",
            },
            "action": {
                "buttons": [
                    {
                        "type": "reply",
                        "reply": {
                            "id": "003",
                            "title": "Payer l'abonnement"
                        }
                    },
                    {
                        "type": "reply",
                        "reply": {
                            "id": "option-laptop",
                            "title": "Inscription"
                        }
                    },
                ]
            }
        }
    });
    return data;
}


function MessageApropoTacKelasi(number) {

    // let text = "Tac Kelasi se distingue comme une initiative révolutionnaire qui redynamise le transport scolaire en ville. En s'appuyant sur une synergie unique de technologies de pointe et d'une application mobile intuitive, Tac Kelasi garantit la sécurité des élèves à chaque étape du trajet, optimise les itinéraires pour une fluidité accrue et favorise un environnement connecté et stimulant pour l'apprentissage. De surcroît, Tac Kelasi s'engage dans une démarche durable en adoptant progressivement des bus électriques et en sensibilisant les élèves aux enjeux environnementaux. Plus qu'un simple moyen de transport, Tac Kelasi incarne une promesse d'avenir pour les jeunes générations, leur permettant de se rendre à l'école en toute sécurité, à temps et dans un cadre propice à leur épanouissement intellectuel et social."
    const data = JSON.stringify({
        "messaging_product": "whatsapp",
        "to": number,
        "type": "interactive",
        "interactive": {
            "type": "button",
            "header":{
                "type":"image",
                "image":{
                    "link":"https://res.cloudinary.com/deb9kfhnx/image/upload/v1713610220/bntlczk3nlyni8c6vpzy.png"
                }
            },
            "body": {
                "text": "*Tac Kelasi*",
            },
            "action": {
                "buttons": [
                    {
                        "type": "reply",
                        "reply": {
                            "id": "003",
                            "title": "Payer l'abonnement"
                        }
                    },
                    {
                        "type": "reply",
                        "reply": {
                            "id": "option-laptop",
                            "title": "Inscription"
                        }
                    },
                ]
            }
        }
    });
    return data;
}





module.exports = {
MessageText,
MessageList,
MessageComprar,
MessageLocation,
MessageListFrench,
MessageList2,
MessageRael,
MessageImage,
SampleImageDescription,
ListeOption,
MessageFAQ,
MessageApropoEtudiant,
MessageApropoTacInterUrbain,
MessageApropoTacKelasi,
MessagePaymentQuestion,
MessageApropoEtudiantInscription,
ListUniversite,
SampleQrCode
};