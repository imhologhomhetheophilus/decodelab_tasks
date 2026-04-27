const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const Product = require("./product");

const app = express();
const PORT = 3000;

/* ================= MIDDLEWARE ================= */
app.use(cors());
app.use(express.json());
app.use("/asset", express.static("asset"));

/* ================= CONNECT ATLAS ================= */
mongoose.connect(
  "mongodb+srv://admin:08145492899Jj@cluster1.kbuxque.mongodb.net/decodelab_shop"
)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log("DB Error:", err));

/* ================= GET ALL ================= */
app.get("/api/products", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

/* ================= CREATE ================= */
app.post("/api/products", async (req, res) => {
  const product = new Product({
    name: req.body.name,
    price: Number(req.body.price),
    image: req.body.image
  });

  await product.save();
  res.json(product);
});

/* ================= UPDATE ================= */
app.put("/api/products/:id", async (req, res) => {
  const updated = await Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.json(updated);
});

/* ================= DELETE ================= */
app.delete("/api/products/:id", async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

/* ================= START ================= */
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});