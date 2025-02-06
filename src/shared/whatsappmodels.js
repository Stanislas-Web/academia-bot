

function MessageText(textResponse, number) {
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

function MessageList2(number) {
    const data = JSON.stringify({
        "messaging_product": "whatsapp",
        "to": number,
        "type": "interactive",
        "interactive": {
            "type": "list",
            "body": {
                "text": "✅ Abonnement"
            },
            "footer": {
                "text": "Selectionner votre abonnement"
            },
            "action": {
                "button": "Voir les options",
                "sections": [
                    {
                        "title": "26 jours",
                        "rows": [
                            {
                                "id": "main-comprar",
                                "title": "78 000 FC",
                                // "description": "Compra los mejores productos para tu hogar"
                            },
                            {
                                "id": "main-vender",
                                "title": "31.2 $",
                                // "description": "Vende tus productos"
                            }
                        ]
                    },
                    {
                        "title": "14 jours",
                        "rows": [
                            {
                                "id": "main-comprar",
                                "title": "28 000 FC",
                                // "description": "Compra los mejores productos para tu hogar"
                            },
                            {
                                "id": "main-vender",
                                "title": "11.2 $",
                                // "description": "Vende tus productos"
                            }
                        ]
                    },
                    {
                        "title": "1 jour",
                        "rows": [
                            {
                                "id": "main-comprar",
                                "title": "1 000 FC",
                                // "description": "Compra los mejores productos para tu hogar"
                            },
                            {
                                "id": "main-vender",
                                "title": "0.4 $",
                                // "description": "Vende tus productos"
                            }
                        ]
                    },
                    // {
                    //     "title": "📍Centro de atención",
                    //     "rows": [
                    //         {
                    //             "id": "main-agencia",
                    //             "title": "Agencia",
                    //             "description": "Puedes visitar nuestra agencia."
                    //         },
                    //         {
                    //             "id": "main-contacto",
                    //             "title": "Centro de contacto",
                    //             "description": "Te atenderá uno de nuestro agentes."
                    //         }
                    //     ]
                    // }
                ]
            }
        }
    });
    return data;
}

function MessageImage(number, link) {
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


function MessageRael(number, candidates) {
    const sections = candidates.map(candidate => {
        return {
            "title": `${candidate.votes} ❤️`,
            "rows": [
                createCandidateRow(candidate._id, candidate.title, candidate.description)
            ]
        };
    });

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
                "sections": sections
            }
        }
    });

    return data;
}


function MessageListFrench(number) {
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


function createCandidateRow(id, title, description) {
    return {
        "id": id,
        "title": title,
        // "description": description
    };
}

function MessageList(number) {
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
function MessageComprar(number) {
    const data = JSON.stringify({
        "messaging_product": "whatsapp",
        "to": number,
        "type": "interactive",
        "interactive": {
            "type": "button",
            "header": {
                "type": "image",
                "image": {
                    "link": "https://firebasestorage.googleapis.com/v0/b/courdescomptes-f6aff.appspot.com/o/images%2F422670227_360642980062791_3259818962140629177_n.jpg?alt=media&token=b170a44e-e077-4d61-97bf-2b1f70f086be"
                }
            },
            "body": {
                "text": "Que souhaitez-vous faire ?",
            },
            "action": {
                "buttons": [
                    {
                        "type": "reply",
                        "reply": {
                            "id": "003",
                            "title": "Liste des candidats"
                        }
                    },
                    {
                        "type": "reply",
                        "reply": {
                            "id": "option-laptop",
                            "title": "Participer aux votes"
                        }
                    },
                    {
                        "type": "reply",
                        "reply": {
                            "id": "option-computadora",
                            "title": "À propos"
                        }
                    }
                ]
            }
        }
    });
    return data;
}





function MessageApropos(number) {

    let text = "*Grégoire Furrer* Productions, qui organise le festival Montreux Comedy, et Castel Beer présentent leur appel à talents pour trouver l'humoriste Africain de demain.\nCet évènement unique, novateur et populaire s'ouvre dans 9 pays et s’inscrit dans la lignée détectrice des valeurs du groupe GFP qui est devenu en 35 ans la 1ère marque mondiale de l’humour francophone.\n\nMON PREMIER MONTREUX BY CASTEL BEER est le nouvel appel à talents qui fait la part belle aux futures stars de l’humour afin d'assurer la relève de la scène francophone."
    const data = JSON.stringify({
        "messaging_product": "whatsapp",
        "to": number,
        "type": "interactive",
        "interactive": {
            "type": "button",
            "header": {
                "type": "image",
                "image": {
                    "link": "https://firebasestorage.googleapis.com/v0/b/courdescomptes-f6aff.appspot.com/o/images%2Fmedium_X_Media_MPM_Afrique_by_CASTEL_44_d48abf67b0.jpg?alt=media&token=5757d14f-429f-4c2f-9c4b-3e4fc52ba013"
                }
            },
            "body": {
                "text": text,
            },
            "action": {
                "buttons": [
                    {
                        "type": "reply",
                        "reply": {
                            "id": "003",
                            "title": "Liste des candidats"
                        }
                    },
                    {
                        "type": "reply",
                        "reply": {
                            "id": "option-laptop",
                            "title": "Participer aux votes"
                        }
                    },
                ]
            }
        }
    });
    return data;
}

function SectionCandidat(number, image, name, vote) {
    let splitName = name.split(" ");
    const data = JSON.stringify({
        "messaging_product": "whatsapp",
        "recipient_type": "individual",
        "to": number,
        "type": "interactive",
        "interactive": {
            "type": "button",
            "header": {
                "type": "image",
                "image": {
                    "link": image
                }
            },
            "body": {
                "text": `${name} : *${vote} ❤️*`
            },
            "action": {
                "buttons": [
                    {
                        "type": "reply",
                        "reply": {
                            "id": "001",
                            "title": `Votez ${splitName[0]}`
                        }
                    },
                    {
                        "type": "reply",
                        "reply": {
                            "id": "002",
                            "title": `Vidéo de ${splitName[0]}`
                        }
                    }
                ]
            }
        }
    });
    return data;
}


function SectionPlats(number, image, name, price) {
    let splitName = name.split(" ");
    const data = JSON.stringify({
        "messaging_product": "whatsapp",
        "recipient_type": "individual",
        "to": number,
        "type": "interactive",
        "interactive": {
            "type": "button",
            "header": {
                "type": "image",
                "image": {
                    "link": image
                }
            },
            "body": {
                "text": `${name} : *${price} \$*`
            },
            "action": {
                "buttons": [
                    {
                        "type": "reply",
                        "reply": {
                            "id": "001",
                            "title": `🛒 : ${splitName[0]}`
                        }
                    },
                    // {
                    //     "type": "reply",
                    //     "reply": {
                    //         "id": "002",
                    //         "title":`Vidéo de ${splitName[0]}`
                    //     }
                    // }
                ]
            }
        }
    });
    return data;
}


function MessageLocation(number) {
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

function VideoCandidate(number, video, name, votes) {
    const data = JSON.stringify({
        "messaging_product": "whatsapp",
        "to": number,
        "type": "video",
        "video": {
            "link": video,
            "caption": `${name} : *${votes} ❤️*`
        }
    });
    return data;
}




function CategorySection(number, categories) {
    const buttons = categories.map(category => {
        return {
            "type": "reply",
            "reply": {
                "id": category._id,
                "title": category.name
            }
        };
    });

    const data = JSON.stringify({
        "messaging_product": "whatsapp",
        "to": number,
        "type": "interactive",
        "interactive": {
            "type": "button",
            "header": {
                "type": "image",
                "image": {
                    "link": "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmVzdG98ZW58MHx8MHx8fDA%3D"
                }
            },
            "body": {
                "text": "Quel type de plats souhaitez-vous commander ?",
            },
            "action": {
                "buttons": buttons
            }
        }
    });
    return data;
}


function MessageNextCommande(number, image) {
    const data = JSON.stringify({
        "messaging_product": "whatsapp",
        "to": number,
        "type": "interactive",
        "interactive": {
            "type": "button",
            "header": {
                "type": "image",
                "image": {
                    // "link": image
                    "link": "https://res.cloudinary.com/deb9kfhnx/image/upload/v1711735623/l8pnagct9jcz9jvlathx.jpg"
                    // "link": "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                }
            },
            "body": {
                "text": "Souhaitez-vous ajouter d'autres articles à votre panier ?",
            },
            "action": {
                "buttons": [
                    {
                        "type": "reply",
                        "reply": {
                            "id": "001",
                            "title": "Oui"
                        }
                    },
                    {
                        "type": "reply",
                        "reply": {
                            "id": "002",
                            "title": "Non"
                        }
                    },

                ]
            }
        }
    });
    return data;
}



function MenuListResto(number, candidates) {

    const rows = candidates.data.map(candidate => {
        return createCandidateRow(candidate._id, candidate.name, candidate.description);
    });

    const data = JSON.stringify({
        "messaging_product": "whatsapp",
        "to": number,
        "type": "interactive",
        "interactive": {
            "type": "list",
            "body": {
                "text": "Découvrez nos catégories"
            },
            "footer": {
                "text": "Sélectionner une catégorie"
            },
            "action": {
                "button": "Liste des catégories",
                "sections": [
                    {
                        "title": "",
                        "rows": rows
                    }
                ]
            }
        }
    });

    return data;
}



function GetLocation(number) {

    const data = JSON.stringify(

        {
            "messaging_product": "whatsapp",
            "recipient_type": "individual",
            "type": "interactive",
            "to": number,
            "interactive": {
                "type": "location_request_message",
                "body": {
                    "text": "Commençons par votre prise en charge. Vous pouvez soit *entrer une adresse* manuellement, soit *partager votre position actuelle* ."
                },
                "action": {
                    "name": "send_location"
                }
            }
        }
    );

    return data;
}


function SendAdress(number) {

    const data = JSON.stringify(
        {
            "messaging_product": "whatsapp",
            "recipient_type": "individual",
            "to": number,
            "type": "interactive",
            "interactive": {
                "type": "address_message",
                "body": {
                    "text": "Thanks for your order! Tell us what address you’d like this order delivered to."
                },
                "action": {
                    "name": "address_message",
                    "parameters": "{\"country\":\"IN\",\"values\":{\"name\":\"CUSTOMER_NAME\",\"phone_number\":\"+91xxxxxxxxxx\"}}"
                }
            }
        }
    );

    return data;
}

function InvoiceModel(number, link) {
    const data = JSON.stringify({
        "messaging_product": "whatsapp",
        "to": number,
        "type": "document",
        "document": {
            "link": link
        }
    });
    return data;
}

function MessagePlace(number, image) {
    const data = JSON.stringify({
        "messaging_product": "whatsapp",
        "to": number,
        "type": "interactive",
        "interactive": {
            "type": "button",
            "header": {
                "type": "image",
                "image": {
                    "link": "https://res.cloudinary.com/deb9kfhnx/image/upload/v1711735621/fgluoahsgpuddmay8qah.jpg"
                    // "link": image
                    // "link": "https://firebasestorage.googleapis.com/v0/b/courdescomptes-f6aff.appspot.com/o/images%2F000158421_896x598_c.jpg?alt=media&token=4ef23e43-79bd-4a13-b6c1-9bb3cecbeafe"
                }
            },
            "body": {
                "text": "Préférez-vous être servi au restaurant ou optez-vous pour la livraison en ce moment ?",
            },
            "action": {
                "buttons": [
                    {
                        "type": "reply",
                        "reply": {
                            "id": "001",
                            "title": "Livraison"
                        }
                    },
                    {
                        "type": "reply",
                        "reply": {
                            "id": "002",
                            "title": "Restaurant"
                        }
                    },

                ]
            }
        }
    });
    return data;
}

function MenuListZone(number, zones, district) {
    const rows = zones.map(zone => {
        return createZoneRow(zone._id, zone.commune, zone.deliveryCoast);
    });

    const data = JSON.stringify({
        "messaging_product": "whatsapp",
        "to": number,
        "type": "interactive",
        "interactive": {
            "type": "list",
            "body": {
                "text": district
            },
            "footer": {
                "text": "Choisir la zone de livraison pour "+district
            },
            "action": {
                "button": district,
                "sections": [
                    {
                        "title": district,
                        "rows": rows
                    }
                ]
            }
        }
    });

    return data;
}





function createZoneRow(id, title, description) {
    return {
        "id": id,
        "title": title,
        "description": `Frais de livraison : ${description} \$ `
    };
}



function MenuListTable(number, zones) {
    const sections = zones.map(zone => {
        return {
            "title": `table ${zone.number}`,
            "rows": [
                createTableRestoRow(`table ${zone.number}`, `table ${zone.number}`, zone.number)
            ]
        };
    });

    const data = JSON.stringify({
        "messaging_product": "whatsapp",
        "to": number,
        "type": "interactive",
        "interactive": {
            "type": "list",
            "body": {
                "text": "Choisir la table"
            },
            "footer": {
                "text": "choisir la table "
            },
            "action": {
                "button": "Liste des tables",
                "sections": sections
            }
        }
    });

    return data;
}





function createTableRestoRow(id, title, description) {
    return {
        "id": id,
        "title": title,
        // "description": `Table : ${description} `
    };
}

function MessagePayment(number) {
    const data = JSON.stringify({
        "messaging_product": "whatsapp",
        "to": number,
        "type": "interactive",
        "interactive": {
            "type": "button",
            "header": {
                "type": "image",
                "image": {
                    "link": "https://res.cloudinary.com/deb9kfhnx/image/upload/v1711735986/kaxogtsugfyuaabka2f3.jpg"
                    // "link": "https://firebasestorage.googleapis.com/v0/b/courdescomptes-f6aff.appspot.com/o/images%2Fshutterstock_582687832__1_.jpg?alt=media&token=48d7e653-f34c-40f2-99ac-73298df5c6e2"
                }
            },
            "body": {
                "text": "choisir votre moyen de paiement",
            },
            "action": {
                "buttons": [
                    {
                        "type": "reply",
                        "reply": {
                            "id": "001",
                            "title": "Payez à la livraison"
                        }
                    },
                    // {
                    //     "type": "reply",
                    //     "reply": {
                    //         "id": "002",
                    //         "title": "Carte bancaire"
                    //     }
                    // },
                    // {
                    //     "type": "reply",
                    //     "reply": {
                    //         "id": "003",
                    //         "title": "Mobile Monney"
                    //     }
                    // }
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
    MessageApropos,
    SectionCandidat,
    VideoCandidate,
    CategorySection,
    SectionPlats,
    MessageNextCommande,
    MenuListResto,
    GetLocation,
    SendAdress,
    InvoiceModel,
    MessagePlace,
    MenuListZone,
    MenuListTable,
    MessagePayment
};