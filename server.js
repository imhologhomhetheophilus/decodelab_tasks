const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use("/asset", express.static("asset"));

let products = [
  { id: 1, name: "SmartWatch", price: 120, image: "/asset/images/smartwatch.jpg" },
  { id: 2, name: "Headphone", price: 80, image: "/asset/images/headphone.jpg" },
  { id: 3, name: "Sneaker", price: 150, image: "/asset/images/sneaker.jpg" },
  { id: 4, name: "bag", price: 150, image: "/asset/images/bag.jpg" },
  { id: 5, name: "backpack", price: 300, image: "/asset/images/backpack.jpg" },
  { id: 6, name: "iphone", price: 500, image: "/asset/images/iphone.jpg" }
];

/* ================= GET ALL ================= */
app.get("/api/products", (req, res) => {
  res.status(200).json(products);
});

/* ================= GET ONE ================= */
app.get("/api/products/:id", (req, res) => {
  const product = products.find(p => p.id == req.params.id);

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  res.status(200).json(product);
});

/* ================= CREATE ================= */
app.post("/api/products", (req, res) => {
  const { name, price, image } = req.body;

  if (!name || !price) {
    return res.status(400).json({ message: "Name and price required" });
  }

  const newProduct = {
    id: Date.now(),
    name,
    price,
    image
  };

  products.push(newProduct);

  res.status(201).json(newProduct);
});

/* ================= UPDATE ================= */
app.put("/api/products/:id", (req, res) => {
  const index = products.findIndex(p => p.id == req.params.id);

  if (index === -1) {
    return res.status(404).json({ message: "Product not found" });
  }

  products[index] = { ...products[index], ...req.body };

  res.status(200).json(products[index]);
});

/* ================= DELETE ================= */
app.delete("/api/products/:id", (req, res) => {
  const exists = products.some(p => p.id == req.params.id);

  if (!exists) {
    return res.status(404).json({ message: "Product not found" });
  }

  products = products.filter(p => p.id != req.params.id);

  res.status(200).json({ message: "Deleted successfully" });
});

/* ================= START ================= */
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});