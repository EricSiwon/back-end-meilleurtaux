const express = require("express");
const router = express.Router();

const mailgun = require("mailgun-js");

const Devis = require("../models/Devis");

const mg = mailgun({ apiKey: process.env.API_KEY, domain: process.env.DOMAIN });

// READ ALL Devis
router.get("/devis", async (req, res) => {
  try {
    const allDevis = await Devis.find();
    res.json(allDevis);
  } catch (error) {
    console.log(error.message);
    res.status(400).json(error.message);
  }
});

// ADD Devis
router.post("/devis/create", async (req, res) => {
  //   console.log(req.query.id);
  console.log(req.fields);
  let {
    TypeTextProperty,
    TypeRepProperty,
    StatusTextProperty,
    StatusRepProperty,
    UsageTextProperty,
    UsageRepProperty,
    SituationTextProperty,
    SituationRepProperty,
    zipcode,
    amount1,
    amount2,
    amount3,
    amount4,
    email
  } = req.fields;
  try {
    // MongoDB create new Producer
    const numdevis = Math.floor(Math.random() * 100000000 + 1);
    const newDevis = new Devis({
      TypeTextProperty,
      TypeRepProperty,
      StatusTextProperty,
      StatusRepProperty,
      UsageTextProperty,
      UsageRepProperty,
      SituationTextProperty,
      SituationRepProperty,
      zipcode,
      amount1,
      amount2,
      amount3,
      amount4,
      email,
      numdevis
    });

    await newDevis.save();

    const message =
      TypeTextProperty +
      " : " +
      TypeRepProperty +
      "\n" +
      StatusTextProperty +
      " : " +
      StatusRepProperty +
      "\n" +
      UsageTextProperty +
      " : " +
      UsageRepProperty +
      "\n" +
      SituationTextProperty +
      " : " +
      SituationRepProperty +
      "\n" +
      "Lieu où se situe le bien à financer" +
      " : " +
      zipcode + "  France" +
      "\n" +
      "Montant estimé de votre acquisition" +
      " : " +
      amount1 +
      "€\n" +
      "Montant estimé des travaux" +
      " : " +
      amount2 +
      "€\n" +
      "Frais de notaire" +
      " : " +
      amount3 +
      "€\n" +
      "Budjet total estimé du projet" +
      " : " +
      amount4 +
      "€\n" +
      "Adress e-mail emprunteur" +
      " : " +
      email +
      "\n" +
      "Vous avez accepté de recevoir par email des propositons de Meilleurtaux." +
      "\n" +
      "Votre numéro de dossier est le :" +
      " : " +
      numdevis;

    const data = {
      from: "Mailgun Sandbox <postmaster@" + process.env.DOMAIN + ">",
      to: email,
      subject: "Dossier MeilleurTaux.com : " + numdevis,
      text: message
    };
    console.log("Devis->SendMail->Data", data);
    mg.messages().send(data, function(error, body) {
      console.log("Devis->SendMail->Error", error);
      console.log("Devis->SendMail->Body", body);
    });

    let messageOK = { numdevis: numdevis, message: "Devis Created" };
    console.log(messageOK);
    res.json(messageOK);
  } catch (error) {
    console.log(error.message);
    res.status(400).json(error.message);
  }
});

// DELETE Devis
router.post("/devis/delete", async (req, res) => {
  let { id } = req.query;
  try {
    const devisToDelete = await Devis.findById(id);
    await devisToDelete.remove();
    res.json({ message: "Devis removed id:" + id });
  } catch (error) {
    console.log(error.message);
    res.status(400).json(error.message);
  }
});

module.exports = router;
