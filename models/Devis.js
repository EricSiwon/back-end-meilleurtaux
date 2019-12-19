const mongoose = require("mongoose");

const Devis = mongoose.model("Devis", {
  TypeTextProperty: { type: String, default: "" },
  TypeRepProperty: { type: String, default: "" },
  StatusTextProperty: { type: String, default: "" },
  StatusRepProperty: { type: String, default: "" },
  UsageTextProperty: { type: String, default: "" },
  UsageRepProperty: { type: String, default: "" },
  SituationTextProperty: { type: String, default: "" },
  SituationRepProperty: { type: String, default: "" },
  zipcode: { type: String, default: 0 },
  amount1: { type: Number, default: 0 },
  amount2: { type: Number, default: 0 },
  amount3: { type: Number, default: 0 },
  amount4: { type: Number, default: 0 },
  email: { type: String, default: "" },
  numdevis: { type: String, default: 0 }
});

module.exports = Devis;
