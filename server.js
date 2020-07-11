require("dotenv").config();
const express = require("express");
const cors = require("cors");
const formidable = require("express-formidable");

const mongoose = require("mongoose");

const app = express();
app.use(formidable());

app.use(cors());
console.log('MongoDB:',process.env.MONGODB_URI)
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});
mongoose.connection.on('connected', () => {
    console.log('Mongoose is connected!!!!');
});
//Loading mongoDB model
// require("./models/Devis");
// require("./models/Users");

//loading Routes
const devisRoutes = require("./routes/devis");
const adminRoutes = require("./routes/admin");

//Use routes
app.use(devisRoutes);
app.use(adminRoutes);

//Test Route
app.get("/", async (req, res) => {
  try {
    res.json({ message: "hello meilleurTaux" });
  } catch (error) {
    console.log(error.message);
    res.status(400).json(error.message);
  }
});

app.listen(process.env.PORT, () => {
  console.log("Server Started", process.env.PORT);
});
