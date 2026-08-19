/* =========================================
   KYAELLE MAISON
   MAIN JAVASCRIPT
========================================= */


/* =========================================
   CUSTOM CURSOR
========================================= */

const cursorDot = document.querySelector(".cursor-dot");
const cursorRing = document.querySelector(".cursor-ring");

document.addEventListener("mousemove", (e) => {

  cursorDot.style.left = `${e.clientX}px`;
  cursorDot.style.top = `${e.clientY}px`;

  cursorRing.style.left = `${e.clientX}px`;
  cursorRing.style.top = `${e.clientY}px`;

});


document.querySelectorAll("a, button, .product").forEach((element) => {

  element.addEventListener("mouseenter", () => {
    cursorRing.classList.add("active");
  });

  element.addEventListener("mouseleave", () => {
    cursorRing.classList.remove("active");
  });

});


/* =========================================
   MOBILE MENU
========================================= */

const menuBtn = document.getElementById("menuBtn");
const mobileNav = document.getElementById("mobileNav");

menuBtn.addEventListener("click", () => {

  mobileNav.classList.toggle("open");

});


document.querySelectorAll(".mobile-nav a").forEach((link) => {

  link.addEventListener("click", () => {

    mobileNav.classList.remove("open");

  });

});


/* =========================================
   HERO SLIDER
========================================= */

const slides = document.querySelectorAll(".slide");
const sliderDots = document.getElementById("sliderDots");

let currentSlide = 0;


/* CREATE DOTS */

slides.forEach((_, index) => {

  const dot = document.createElement("button");

  dot.classList.add("slider-dot");

  if (index === 0) {
    dot.classList.add("active");
  }

  dot.addEventListener("click", () => {

    showSlide(index);

  });

  sliderDots.appendChild(dot);

});


const dots = document.querySelectorAll(".slider-dot");


function showSlide(index) {

  slides.forEach((slide) => {
    slide.classList.remove("active");
  });

  dots.forEach((dot) => {
    dot.classList.remove("active");
  });

  slides[index].classList.add("active");
  dots[index].classList.add("active");

  currentSlide = index;

}


document.getElementById("nextSlide").addEventListener("click", () => {

  currentSlide++;

  if (currentSlide >= slides.length) {
    currentSlide = 0;
  }

  showSlide(currentSlide);

});


document.getElementById("prevSlide").addEventListener("click", () => {

  currentSlide--;

  if (currentSlide < 0) {
    currentSlide = slides.length - 1;
  }

  showSlide(currentSlide);

});


/* AUTO SLIDER */

setInterval(() => {

  currentSlide++;

  if (currentSlide >= slides.length) {
    currentSlide = 0;
  }

  showSlide(currentSlide);

}, 5000);


/* =========================================
   PRODUCT FILTER
========================================= */

const filterButtons = document.querySelectorAll(".filter");
const products = document.querySelectorAll(".product");

filterButtons.forEach((button) => {

  button.addEventListener("click", () => {

    filterButtons.forEach((btn) => {
      btn.classList.remove("active");
    });

    button.classList.add("active");

    const filter = button.dataset.filter;

    products.forEach((product) => {

      if (
        filter === "all" ||
        product.dataset.category === filter
      ) {

        product.style.display = "";

      } else {

        product.style.display = "none";

      }

    });

  });

});


/* =========================================
   SEARCH
========================================= */

const searchBtn = document.getElementById("searchBtn");
const searchPanel = document.getElementById("searchPanel");
const closeSearch = document.getElementById("closeSearch");
const searchInput = document.getElementById("searchInput");
const searchResults = document.getElementById("searchResults");


searchBtn.addEventListener("click", () => {

  searchPanel.classList.add("open");

  setTimeout(() => {
    searchInput.focus();
  }, 300);

});


closeSearch.addEventListener("click", () => {

  searchPanel.classList.remove("open");

});


searchInput.addEventListener("input", () => {

  const keyword = searchInput.value.toLowerCase().trim();

  searchResults.innerHTML = "";

  if (!keyword) {
    return;
  }

  const matchingProducts = [...products].filter((product) => {

    return product.dataset.name
      .toLowerCase()
      .includes(keyword);

  });


  if (matchingProducts.length === 0) {

    searchResults.innerHTML = `
      <p style="color:#88777b;font-size:12px;">
        No products found ♡
      </p>
    `;

    return;

  }


  matchingProducts.forEach((product) => {

    const result = document.createElement("div");

    result.className = "search-result";

    result.innerHTML = `
      <span>${product.dataset.name}</span>
      <strong>
        Rp ${Number(product.dataset.price).toLocaleString("id-ID")}
      </strong>
    `;

    result.addEventListener("click", () => {

      searchPanel.classList.remove("open");

      product.scrollIntoView({
        behavior: "smooth",
        block: "center"
      });

    });

    searchResults.appendChild(result);

  });

});


/* =========================================
   SHOPPING CART
========================================= */

const cartBtn = document.getElementById("cartBtn");
const cartDrawer = document.getElementById("cartDrawer");
const cartOverlay = document.getElementById("cartOverlay");
const closeCart = document.getElementById("closeCart");

const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
const cartCount = document.querySelector(".cart-count");
const checkoutBtn = document.getElementById("checkoutBtn");


let cart = [];


function openCart() {

  cartDrawer.classList.add("open");
  cartOverlay.classList.add("active");

}


function closeCartDrawer() {

  cartDrawer.classList.remove("open");
  cartOverlay.classList.remove("active");

}


cartBtn.addEventListener("click", openCart);

closeCart.addEventListener("click", closeCartDrawer);

cartOverlay.addEventListener("click", closeCartDrawer);


/* ADD PRODUCT */

document.querySelectorAll(".add-cart").forEach((button) => {

  button.addEventListener("click", () => {

    const product = button.closest(".product");

    const name = product.dataset.name;
    const price = Number(product.dataset.price);
    const image = product.querySelector("img").src;


    const existing = cart.find(
      item => item.name === name
    );


    if (existing) {

      existing.quantity++;

    } else {

      cart.push({
        name,
        price,
        image,
        quantity: 1
      });

    }


    updateCart();

    openCart();

  });

});


/* UPDATE CART */

function updateCart() {

  cartItems.innerHTML = "";

  if (cart.length === 0) {

    cartItems.innerHTML = `
      <p class="empty-cart">
        Your bag is currently empty ♡
      </p>
    `;

  }


  let total = 0;
  let count = 0;


  cart.forEach((item, index) => {

    total += item.price * item.quantity;

    count += item.quantity;


    const element = document.createElement("div");

    element.className = "cart-item";

    element.innerHTML = `

      <img
        src="${item.image}"
        alt="${item.name}"
      >

      <div>

        <h4>
          ${item.name}
        </h4>

        <p>
          ${item.quantity} ×
          Rp ${item.price.toLocaleString("id-ID")}
        </p>

      </div>

      <button
        class="remove-item"
        data-index="${index}"
      >
        ×
      </button>

    `;


    cartItems.appendChild(element);

  });


  cartTotal.textContent =
    `Rp ${total.toLocaleString("id-ID")}`;

  cartCount.textContent = count;


  document.querySelectorAll(".remove-item").forEach((button) => {

    button.addEventListener("click", () => {

      const index = Number(button.dataset.index);

      cart.splice(index, 1);

      updateCart();

    });

  });


  createCheckoutLink();

}


/* =========================================
   WHATSAPP CHECKOUT
========================================= */

function createCheckoutLink() {

  if (cart.length === 0) {

    checkoutBtn.href =
      "https://wa.me/6285215059711?text=want%20to%20order";

    return;

  }


  let message =
    "want to order%0A%0A";


  cart.forEach((item) => {

    message +=
      `• ${item.name} x${item.quantity}%0A`;

  });


  message +=
    "%0AThank you ♡";


  checkoutBtn.href =
    `https://wa.me/6285215059711?text=${message}`;

}


/* =========================================
   LANGUAGE
========================================= */

const languageSelector =
  document.getElementById("languageSelector");


const translations = {

  id: {

    home: "Home",
    collection: "Koleksi",
    promo: "Promo",
    about: "Tentang",
    announcement:
      "Gratis ongkir untuk pesanan tertentu ♡"

  },

  en: {

    home: "Home",
    collection: "Collection",
    promo: "Promo",
    about: "About",
    announcement:
      "Free shipping for selected orders ♡"

  }

};


languageSelector.addEventListener("change", () => {

  const language = languageSelector.value;

  const text = translations[language];


  document.querySelector(
    '[data-id="home"]'
  ).textContent = text.home;


  document.querySelector(
    '[data-id="collection"]'
  ).textContent = text.collection;


  document.querySelector(
    '[data-id="promo"]'
  ).textContent = text.promo;


  document.querySelector(
    '[data-id="about"]'
  ).textContent = text.about;


  document.querySelector(
    '[data-id="announcement"]'
  ).textContent = text.announcement;

});


/* =========================================
   ESC KEY
========================================= */

document.addEventListener("keydown", (event) => {

  if (event.key === "Escape") {

    searchPanel.classList.remove("open");

    closeCartDrawer();

  }

});
