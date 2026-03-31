// =====================================================================
//  PEPELE BOT — Trust Merchant Bank
//  WhatsApp Interactive Message Models
// =====================================================================

function PepeleMenuPrincipal(number) {
    const data = JSON.stringify({
        "messaging_product": "whatsapp",
        "to": number,
        "type": "interactive",
        "interactive": {
            "type": "list",
            "body": {
                "text": "Comment puis-je vous aider ?"
            },
            "footer": {
                "text": "Pepele Bot · Trust Merchant Bank"
            },
            "action": {
                "button": "Nos services",
                "sections": [
                    {
                        "title": "Compte",
                        "rows": [
                            {
                                "id": "pepele-solde",
                                "title": "Consulter le solde",
                                "description": "Solde disponible en CDF et USD"
                            },
                            {
                                "id": "pepele-releve",
                                "title": "Mini-relevé",
                                "description": "Historique des 5 dernières opérations"
                            }
                        ]
                    },
                    {
                        "title": "Transactions",
                        "rows": [
                            {
                                "id": "pepele-virement",
                                "title": "Virement interne",
                                "description": "Transfert entre comptes TMB"
                            },
                            {
                                "id": "pepele-mobile",
                                "title": "Envoi Mobile Money",
                                "description": "Vers M-Pesa, Airtel Money, Orange"
                            }
                        ]
                    },
                    {
                        "title": "Cartes",
                        "rows": [
                            {
                                "id": "pepele-bloquer",
                                "title": "Bloquer ma carte",
                                "description": "Opposition immédiate sur votre carte"
                            },
                            {
                                "id": "pepele-commander",
                                "title": "Commander une carte",
                                "description": "Nouvelle carte Visa ou Mastercard"
                            }
                        ]
                    },
                    {
                        "title": "Assistance",
                        "rows": [
                            {
                                "id": "pepele-atm",
                                "title": "Localiser un ATM",
                                "description": "Distributeurs et agences proches"
                            },
                            {
                                "id": "pepele-credit",
                                "title": "Simulateur de crédit",
                                "description": "Estimer vos mensualités de prêt"
                            },
                            {
                                "id": "pepele-conseiller",
                                "title": "Parler à un conseiller",
                                "description": "Assistance personnalisée TMB"
                            }
                        ]
                    }
                ]
            }
        }
    });
    return data;
}


function PepeleSimulateurDuree(number, montantFormate) {
    const data = JSON.stringify({
        "messaging_product": "whatsapp",
        "to": number,
        "type": "interactive",
        "interactive": {
            "type": "button",
            "body": {
                "text": `*Simulateur de Crédit*\n\nMontant : *${montantFormate} $*\n\nChoisissez la durée de remboursement :`
            },
            "action": {
                "buttons": [
                    {
                        "type": "reply",
                        "reply": {
                            "id": "credit-12",
                            "title": "12 mois"
                        }
                    },
                    {
                        "type": "reply",
                        "reply": {
                            "id": "credit-24",
                            "title": "24 mois"
                        }
                    },
                    {
                        "type": "reply",
                        "reply": {
                            "id": "credit-36",
                            "title": "36 mois"
                        }
                    }
                ]
            }
        }
    });
    return data;
}


function PepeleATMList(number, atms) {
    const rows = atms.map(atm => ({
        "id": atm.id,
        "title": atm.name,
        "description": `${atm.adresse} · ${atm.status ? "En service" : "Hors service"}`
    }));

    const data = JSON.stringify({
        "messaging_product": "whatsapp",
        "to": number,
        "type": "interactive",
        "interactive": {
            "type": "list",
            "body": {
                "text": "Sélectionnez un point pour recevoir sa localisation GPS."
            },
            "footer": {
                "text": "Pepele Bot · Trust Merchant Bank"
            },
            "action": {
                "button": "Voir la liste",
                "sections": [
                    {
                        "title": "Distributeurs & Agences",
                        "rows": rows
                    }
                ]
            }
        }
    });
    return data;
}


function PepeleLocationMessage(number, atm) {
    const data = JSON.stringify({
        "messaging_product": "whatsapp",
        "to": number,
        "type": "location",
        "location": {
            "latitude": atm.latitude,
            "longitude": atm.longitude,
            "name": atm.name,
            "address": atm.adresse
        }
    });
    return data;
}


module.exports = {
    PepeleMenuPrincipal,
    PepeleSimulateurDuree,
    PepeleATMList,
    PepeleLocationMessage
};
