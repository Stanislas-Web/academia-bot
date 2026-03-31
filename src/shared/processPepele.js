// =====================================================================
//  PEPELE BOT — Trust Merchant Bank
//  Process principal : logique conversationnelle
// =====================================================================

const whatsappModel = require("./whatsappmodels");
const pepeleModel = require("./pepeleModels");
const whatsappServiceResto = require("../services/whatsappServiceResto");

// Session en mémoire pour les flux multi-étapes (simulateur crédit)
const sessions = new Map();
const SESSION_TTL = 5 * 60 * 1000; // 5 minutes

const NUMERO_SUPPORT_TMB = "243842613999"; // TODO: Remplacer par le vrai numéro du support TMB
const TAUX_ANNUEL_CREDIT = 18; // Taux annuel en % pour la simulation


// =====================================================================
//  DONNÉES SIMULÉES (À remplacer par l'API Core Banking TMB)
// =====================================================================

function getAccountData(phoneNumber) {
    const lastFour = phoneNumber.slice(-4);
    return {
        titulaire: "Client TMB",
        compteMasque: "****" + lastFour,
        soldeCDF: 2847500.00,
        soldeUSD: 1935.50,
        operations: [
            { date: "30/03/2026", libelle: "Virement entrant — Pepele Mobile", montant: "+1 200,00 $" },
            { date: "28/03/2026", libelle: "Paiement Canal+ #4182", montant: "-25,00 $" },
            { date: "25/03/2026", libelle: "Retrait ATM Gombe", montant: "-300,00 $" },
            { date: "22/03/2026", libelle: "Envoi M-Pesa +243812xxxxx", montant: "-150 000 FC" },
            { date: "20/03/2026", libelle: "Crédit salaire Mars 2026", montant: "+2 350,00 $" }
        ]
    };
}

function getATMData() {
    return [
        {
            id: "atm-gombe",
            name: "TMB Gombe - 30 Juin",
            adresse: "Blvd du 30 Juin N°1234, Gombe, Kinshasa",
            latitude: "-4.3100",
            longitude: "15.3033",
            status: true
        },
        {
            id: "atm-limete",
            name: "TMB Limete",
            adresse: "Blvd Lumumba N°450, Limete, Kinshasa",
            latitude: "-4.3525",
            longitude: "15.3372",
            status: true
        },
        {
            id: "atm-matonge",
            name: "TMB Matonge",
            adresse: "Av. du Commerce N°87, Kalamu, Kinshasa",
            latitude: "-4.3394",
            longitude: "15.3222",
            status: true
        },
        {
            id: "atm-ngaliema",
            name: "TMB Ngaliema",
            adresse: "Av. Colonel Mondjiba N°312, Ngaliema, Kinshasa",
            latitude: "-4.3275",
            longitude: "15.2475",
            status: false
        },
        {
            id: "atm-kasavubu",
            name: "TMB Kasa-Vubu",
            adresse: "Av. Kasa-Vubu N°156, Kasa-Vubu, Kinshasa",
            latitude: "-4.3375",
            longitude: "15.3075",
            status: true
        }
    ];
}


// =====================================================================
//  UTILITAIRES
// =====================================================================

function calculateCredit(principal, months, annualRate) {
    const r = annualRate / 12 / 100;
    const mensualite = principal * (r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1);
    const totalAmount = mensualite * months;
    const totalInterest = totalAmount - principal;
    return {
        mensualite: mensualite.toFixed(2),
        totalAmount: totalAmount.toFixed(2),
        totalInterest: totalInterest.toFixed(2)
    };
}

function fmt(amount) {
    return new Intl.NumberFormat('fr-FR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(amount);
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function send(data, idNumber, token) {
    whatsappServiceResto.SendMessageWhatsAppRestoWithParams(data, idNumber, token);
}


// =====================================================================
//  PROCESS PRINCIPAL
// =====================================================================

async function ProcessPepele(textUser, number, idNumber, token) {

    // --- Détection de salutation ---
    const greetings = ["bonjour", "bonsoir", "salut", "slt", "bjr", "bsr", "mbote", "hello", "hi", "hey", "pepele"];
    const isGreeting = greetings.some(g => textUser.toLowerCase().includes(g));

    // --- Commandes du menu (permettent de sortir d'un flux multi-étapes) ---
    const menuCommands = [
        "Consulter le solde", "Mini-relevé", "Virement interne",
        "Envoi Mobile Money", "Bloquer ma carte", "Commander une carte",
        "Localiser un ATM", "Simulateur de crédit", "Parler à un conseiller"
    ];
    const isMenuCommand = menuCommands.some(cmd => textUser.includes(cmd));
    const isNav = textUser.toLowerCase().includes("menu") || textUser.toLowerCase().includes("retour");

    // --- Flux multi-étapes (session) ---
    const session = sessions.get(number);

    if (session && !isMenuCommand && !isGreeting && !isNav) {

        // Expiration de session
        if (Date.now() - session.timestamp > SESSION_TTL) {
            sessions.delete(number);
        } else {
            switch (session.step) {

                // Étape 1 : Saisie du montant du crédit
                case "credit_amount": {
                    const amount = parseFloat(textUser.replace(/\s/g, '').replace(',', '.'));
                    if (isNaN(amount) || amount < 100 || amount > 500000) {
                        let msg = whatsappModel.MessageText(
                            "Veuillez saisir un montant valide entre *100 $* et *500 000 $*.", number);
                        send(msg, idNumber, token);
                        return;
                    }
                    sessions.set(number, { step: "credit_duration", data: { amount }, timestamp: Date.now() });
                    let model = pepeleModel.PepeleSimulateurDuree(number, fmt(amount));
                    send(model, idNumber, token);
                    return;
                }

                // Étape 2 : Sélection de la durée
                case "credit_duration": {
                    const durations = { "12 mois": 12, "24 mois": 24, "36 mois": 36 };
                    const months = durations[textUser];
                    if (!months) {
                        let msg = whatsappModel.MessageText(
                            "Veuillez sélectionner une durée parmi les options proposées.", number);
                        send(msg, idNumber, token);
                        return;
                    }
                    const amount = session.data.amount;
                    const result = calculateCredit(amount, months, TAUX_ANNUEL_CREDIT);
                    sessions.delete(number);

                    let resultText =
                        `*TRUST MERCHANT BANK*\n` +
                        `━━━━━━━━━━━━━━━━━━━━\n` +
                        `*Simulation de Crédit*\n\n` +
                        `Montant emprunté    *${fmt(amount)} $*\n` +
                        `Durée                        *${months} mois*\n` +
                        `Taux annuel              *${TAUX_ANNUEL_CREDIT} %*\n\n` +
                        `── Résultat ──────────\n\n` +
                        `Mensualité             *${fmt(result.mensualite)} $*\n` +
                        `Coût du crédit         ${fmt(result.totalInterest)} $\n` +
                        `Total à rembourser  ${fmt(result.totalAmount)} $\n\n` +
                        `━━━━━━━━━━━━━━━━━━━━\n` +
                        `_Simulation indicative et non contractuelle.\nRendez-vous en agence TMB pour finaliser votre demande._`;

                    let msg = whatsappModel.MessageText(resultText, number);
                    send(msg, idNumber, token);

                    await delay(1500);
                    let menu = pepeleModel.PepeleMenuPrincipal(number);
                    send(menu, idNumber, token);
                    return;
                }
            }
        }
    }

    // Nettoyage de session si l'utilisateur a changé de direction
    if (session) sessions.delete(number);


    // =================================================================
    //  MENU PRINCIPAL (switch sur le texte)
    // =================================================================

    switch (true) {

        // ── Salutations ──
        case isGreeting: {
            let imgWelcome = whatsappModel.MessageImage(number, "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRQG7F4XCWrVLuwIEn8kdXx2WoedTlMsam3Q&s");
            send(imgWelcome, idNumber, token);

            await delay(1000);

            let welcome =
                `👋 Bonjour, je suis *PepeleBot*\n` +
                `Votre assistant bancaire TMB.\n\n` +
                `💼 Comptes · 💳 Cartes · 💸 Transactions\n` +
                `📍 ATM · 📊 Crédit · 🤝 Assistance`;

            let msg = whatsappModel.MessageText(welcome, number);
            send(msg, idNumber, token);

            await delay(1500);
            let menu = pepeleModel.PepeleMenuPrincipal(number);
            send(menu, idNumber, token);
            break;
        }

        // ── Consultation de solde (pas d'OTP, numéro WhatsApp = identifiant) ──
        case textUser.includes("Consulter le solde"): {
            const account = getAccountData(number);

            let soldeText =
                `*TRUST MERCHANT BANK*\n` +
                `━━━━━━━━━━━━━━━━━━━━\n` +
                `*Consultation de Solde*\n\n` +
                `Titulaire    ${account.titulaire}\n` +
                `Compte      ${account.compteMasque}\n\n` +
                `  CDF    *${fmt(account.soldeCDF)} FC*\n` +
                `  USD    *${fmt(account.soldeUSD)} $*\n\n` +
                `_${new Date().toLocaleDateString('fr-FR')} à ${new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}_\n` +
                `━━━━━━━━━━━━━━━━━━━━`;

            let msg = whatsappModel.MessageText(soldeText, number);
            send(msg, idNumber, token);

            await delay(1000);
            let menu = pepeleModel.PepeleMenuPrincipal(number);
            send(menu, idNumber, token);
            break;
        }

        // ── Mini-relevé ──
        case textUser.includes("Mini-relevé"): {
            const account = getAccountData(number);

            let header =
                `*TRUST MERCHANT BANK*\n` +
                `━━━━━━━━━━━━━━━━━━━━\n` +
                `*Mini-Relevé*\n` +
                `Compte ${account.compteMasque}\n\n`;

            let operations = account.operations.map(op =>
                `${op.date}   ${op.montant}\n_${op.libelle}_`
            ).join("\n\n");

            let releveText = header + operations +
                `\n\n━━━━━━━━━━━━━━━━━━━━\n` +
                `_Pour un relevé complet, rendez-vous en agence ou sur TMB Online._`;

            let msg = whatsappModel.MessageText(releveText, number);
            send(msg, idNumber, token);

            await delay(1000);
            let menu = pepeleModel.PepeleMenuPrincipal(number);
            send(menu, idNumber, token);
            break;
        }

        // ── Simulateur de crédit (étape 1 : demander le montant) ──
        case textUser.includes("Simulateur de crédit"): {
            sessions.set(number, { step: "credit_amount", timestamp: Date.now() });

            let msg = whatsappModel.MessageText(
                `*Simulateur de Crédit Pepele*\n\n` +
                `Saisissez le montant que vous souhaitez emprunter, en dollars américains.\n\n` +
                `_Exemple : 5000_`, number);
            send(msg, idNumber, token);
            break;
        }

        // ── Localiser un ATM (afficher la liste) ──
        case textUser.includes("Localiser un ATM"): {
            const atms = getATMData();

            let atmText =
                `*TRUST MERCHANT BANK*\n` +
                `━━━━━━━━━━━━━━━━━━━━\n` +
                `*Distributeurs & Agences*\n\n`;

            atms.forEach(atm => {
                const indicateur = atm.status ? "●" : "○";
                const statut = atm.status ? "En service" : "Hors service";
                atmText += `${indicateur}  *${atm.name}*\n    ${atm.adresse}\n    ${statut}\n\n`;
            });

            atmText +=
                `● En service   ○ Hors service\n` +
                `━━━━━━━━━━━━━━━━━━━━\n` +
                `_Sélectionnez un point ci-dessous pour recevoir sa position GPS._`;

            let msg = whatsappModel.MessageText(atmText, number);
            send(msg, idNumber, token);

            await delay(1000);
            let list = pepeleModel.PepeleATMList(number, atms);
            send(list, idNumber, token);
            break;
        }

        // ── Sélection d'un ATM (envoi de la localisation GPS) ──
        case textUser.startsWith("TMB "): {
            const atms = getATMData();
            const atm = atms.find(a => a.name === textUser);

            if (atm) {
                let location = pepeleModel.PepeleLocationMessage(number, atm);
                send(location, idNumber, token);

                await delay(1000);
                let menu = pepeleModel.PepeleMenuPrincipal(number);
                send(menu, idNumber, token);
            } else {
                let msg = whatsappModel.MessageText("Ce point n'a pas été trouvé. Tapez *menu* pour revenir.", number);
                send(msg, idNumber, token);
            }
            break;
        }

        // ── Bloquer ma carte ──
        case textUser.includes("Bloquer ma carte"): {
            const lastFour = number.slice(-4);

            let msg = whatsappModel.MessageText(
                `*TRUST MERCHANT BANK*\n` +
                `━━━━━━━━━━━━━━━━━━━━\n` +
                `*Opposition de Carte*\n\n` +
                `Votre carte Visa ****${lastFour} a été *bloquée avec succès*.\n\n` +
                `Un SMS de confirmation a été envoyé à votre numéro enregistré.\n\n` +
                `En cas de question :\n` +
                `+243 81 51 51 000 (Centre d'appels TMB)\n` +
                `━━━━━━━━━━━━━━━━━━━━`, number);
            send(msg, idNumber, token);

            await delay(1000);
            let menu = pepeleModel.PepeleMenuPrincipal(number);
            send(menu, idNumber, token);
            break;
        }

        // ── Commander une carte ──
        case textUser.includes("Commander une carte"): {
            let msg = whatsappModel.MessageText(
                `*Commande de Carte Bancaire*\n\n` +
                `Votre demande a été enregistrée avec succès.\n\n` +
                `Un conseiller TMB vous contactera sous 24 heures pour :\n` +
                `  — Choisir le type de carte (Visa / Mastercard)\n` +
                `  — Définir votre agence de retrait\n\n` +
                `_Pièces à préparer : pièce d'identité valide, justificatif de domicile._`, number);
            send(msg, idNumber, token);

            await delay(1000);
            let menu = pepeleModel.PepeleMenuPrincipal(number);
            send(menu, idNumber, token);
            break;
        }

        // ── Virement interne (en cours d'intégration) ──
        case textUser.includes("Virement interne"): {
            let msg = whatsappModel.MessageText(
                `*Virement Interne*\n\n` +
                `Ce service est en cours d'intégration avec notre plateforme.\n\n` +
                `En attendant, vous pouvez effectuer vos virements via :\n` +
                `  — L'application *TMB Mobile Banking*\n` +
                `  — Le portail *TMB Online* sur www.tmb.cd\n` +
                `  — Votre agence TMB la plus proche`, number);
            send(msg, idNumber, token);

            await delay(1000);
            let menu = pepeleModel.PepeleMenuPrincipal(number);
            send(menu, idNumber, token);
            break;
        }

        // ── Envoi Mobile Money (en cours d'intégration) ──
        case textUser.includes("Envoi Mobile Money"): {
            let msg = whatsappModel.MessageText(
                `*Envoi vers Mobile Money*\n\n` +
                `Ce service est en cours d'intégration.\n` +
                `Opérateurs supportés : M-Pesa, Airtel Money, Orange Money.\n\n` +
                `En attendant :\n` +
                `  — Application *TMB Mobile Banking*\n` +
                `  — Code USSD *#151#*\n` +
                `  — Agence TMB la plus proche`, number);
            send(msg, idNumber, token);

            await delay(1000);
            let menu = pepeleModel.PepeleMenuPrincipal(number);
            send(menu, idNumber, token);
            break;
        }

        // ── Parler à un conseiller ──
        case textUser.includes("Parler à un conseiller"): {
            // Message au client
            let msg = whatsappModel.MessageText(
                `🤝 *Assistance TMB*\n\n` +
                `Merci de nous avoir contacté.\n` +
                `Un collègue va vous répondre dans peu de temps, restez en ligne.\n\n` +
                `📞  +243 81 51 51 000\n` +
                `✉️  clientele@tmb.cd\n\n` +
                `_Lun–Ven 8h–17h · Sam 8h–12h_`, number);
            send(msg, idNumber, token);

            // Message privé direct au conseiller
            let support = whatsappModel.MessageText(
                `📩 *PepeleBot — Nouveau client en attente*\n` +
                `━━━━━━━━━━━━━━━━━━━━\n` +
                `👤 Client : +${number}\n` +
                `🕐 ${new Date().toLocaleDateString('fr-FR')} à ${new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}\n\n` +
                `Ce client attend votre réponse sur WhatsApp.`,
                NUMERO_SUPPORT_TMB);
            send(support, idNumber, token);

            await delay(1000);
            let menu = pepeleModel.PepeleMenuPrincipal(number);
            send(menu, idNumber, token);
            break;
        }

        // ── Menu / Retour ──
        case isNav: {
            let menu = pepeleModel.PepeleMenuPrincipal(number);
            send(menu, idNumber, token);
            break;
        }

        // ── Message non reconnu ──
        default: {
            let msg = whatsappModel.MessageText(
                "Ce message n'a pas pu être traité.\nAccédez à vos services en tapant *menu*.", number);
            send(msg, idNumber, token);

            let menu = pepeleModel.PepeleMenuPrincipal(number);
            send(menu, idNumber, token);
            break;
        }
    }
}


module.exports = { ProcessPepele };
