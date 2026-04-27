const API = "http://localhost:3000/api/products";

const container = document.getElementById("productsGrid");

/* ================= SCROLL (FIXED HERO BUTTON) ================= */
function scrollToProducts() {
  document.getElementById("products")
    .scrollIntoView({ behavior: "smooth" });
}

/* ================= SLIDER ================= */
function startSlider() {
  const slides = document.querySelectorAll(".slide");
  let i = 0;

  setInterval(() => {
    slides.forEach(s => s.classList.remove("active"));
    i = (i + 1) % slides.length;
    slides[i].classList.add("active");
  }, 3000);
}
/* ================= CART ================= */
let cartCount = 0;

function addToCart() {
  cartCount++;
  document.getElementById("cartCount").innerText = cartCount;
}

/* ================= NAVBAR (FIXED) ================= */
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

/* TOGGLE MENU */
hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("show");
});

/* CLOSE MENU WHEN CLICK LINK */
document.querySelectorAll("#navLinks a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("show");
  });
});

/* ================= LOAD PRODUCTS ================= */
async function loadProducts() {
  const res = await fetch(API);
  const data = await res.json();

  document.getElementById("loading").style.display = "none";
  container.innerHTML = "";

  data.forEach(p => {
    const div = document.createElement("div");
    div.className = "product-card";

    div.innerHTML = `
      <img src="${p.image}" alt="${p.name}">
      <h3>${p.name}</h3>
      <p>$${p.price}</p>

      <button class="add-cart-btn" onclick="addToCart()">Add to Cart</button>

      <button class="edit-btn" onclick="editProduct(${p.id})">Edit</button>

      <button class="delete-btn" onclick="deleteProduct(${p.id})">Delete</button>
    `;

    container.appendChild(div);
  });
}

/* ================= ADD PRODUCT ================= */
async function addProduct() {
  const name = document.getElementById("name").value;
  const price = document.getElementById("price").value;
  const image = document.getElementById("image").value;

  await fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, price, image })
  });

  loadProducts();
}

/* ================= EDIT PRODUCT ================= */
async function editProduct(id) {
  const newName = prompt("Enter new name:");
  const newPrice = prompt("Enter new price:");

  if (!newName || !newPrice) return;

  await fetch(`${API}/${id}`, {
    method: "PUT",   // ✅ RESTFUL UPDATE
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: newName, price: newPrice })
  });

  loadProducts();
}

/* ================= DELETE ================= */
async function deleteProduct(id) {
  await fetch(`${API}/${id}`, { method: "DELETE" });
  loadProducts();
}



/* ================= INIT ================= */
window.addEventListener("DOMContentLoaded", () => {
  loadProducts();
  startSlider();
});