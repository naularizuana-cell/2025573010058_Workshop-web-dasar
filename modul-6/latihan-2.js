const products = [
  {
    id: 1,
    name: "Strawberry Cake",
    price: 35000,
    image: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e",
  },
  {
    id: 2,
    name: "Pink Donut",
    price: 18000,
    image: "https://images.unsplash.com/photo-1551024601-bec78aea704b",
  },
  {
    id: 3,
    name: "Ice Cream",
    price: 25000,
    image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb",
  },
  {
    id: 4,
    name: "Milkshake",
    price: 22000,
    image: "https://images.unsplash.com/photo-1579954115545-a95591f28bfc",
  },
  {
    id: 5,
    name: "Cupcake",
    price: 15000,
    image: "https://images.unsplash.com/photo-1486427944299-d1955d23e34d",
  },
];

const cart = [];

const productList = document.getElementById("product-list");
const cartItems = document.getElementById("cart-items");
const totalText = document.getElementById("total");

// ==========================
// TAMPILKAN PRODUK
// ==========================
products.forEach((product) => {
  productList.innerHTML += `

    <div class="card">

      <img src="${product.image}" alt="${product.name}">

      <div class="card-content">

        <h3>${product.name}</h3>

        <p class="price">
          Rp ${product.price.toLocaleString()}
        </p>

        <button class="btn"
          onclick="addToCart(${product.id})">

          Tambah ke Keranjang

        </button>

      </div>

    </div>

  `;
});

// ==========================
// TAMBAH KE KERANJANG
// ==========================
function addToCart(id) {
  const product = products.find((p) => p.id === id);

  const item = cart.find((p) => p.id === id);

  if (item) {
    item.qty++;
  } else {
    cart.push({
      ...product,
      qty: 1,
    });
  }

  renderCart();
}

// ==========================
// TAMPILKAN CART
// ==========================
function renderCart() {
  cartItems.innerHTML = "";

  if (cart.length === 0) {
    cartItems.innerHTML = `
      <p class="empty">
        Keranjang masih kosong
      </p>
    `;
  }

  let total = 0;

  cart.forEach((item) => {
    total += item.price * item.qty;

    cartItems.innerHTML += `

      <div class="cart-item">

        <h4>${item.name}</h4>

        <p>
          ${item.qty} x
          Rp ${item.price.toLocaleString()}
        </p>

        <div class="cart-buttons">

          <button
            class="small-btn plus"
            onclick="increase(${item.id})">

            +

          </button>

          <button
            class="small-btn minus"
            onclick="decrease(${item.id})">

            -

          </button>

          <button
            class="small-btn delete"
            onclick="removeItem(${item.id})">

            Hapus

          </button>

        </div>

      </div>

    `;
  });

  totalText.innerHTML = `Total: Rp ${total.toLocaleString()}`;
}

// ==========================
// TAMBAH JUMLAH
// ==========================
function increase(id) {
  const item = cart.find((p) => p.id === id);

  item.qty++;

  renderCart();
}

// ==========================
// KURANG JUMLAH
// ==========================
function decrease(id) {
  const item = cart.find((p) => p.id === id);

  item.qty--;

  if (item.qty <= 0) {
    removeItem(id);
  }

  renderCart();
}

// ==========================
// HAPUS ITEM
// ==========================
function removeItem(id) {
  const index = cart.findIndex((p) => p.id === id);

  cart.splice(index, 1);

  renderCart();
}

// ==========================
// CHECKOUT
// ==========================
function checkout() {
  if (cart.length === 0) {
    alert("Keranjang masih kosong 🥺");

    return;
  }

  let message = "✨ Ringkasan Belanja ✨\n\n";

  cart.forEach((item) => {
    message += `${item.name} (${item.qty})\n`;
  });

  message += `\n${totalText.innerText}`;

  alert(message);
}
