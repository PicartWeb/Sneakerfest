const heroSlides = [
  {
    badge: "New Drop",
    title: "Velocity built for<br>midnight city runs.",
    text: "Sculpted cushioning, gallery-grade finishes, and a silhouette designed to feel rare from first glance to first step.",
    cardTag: "Studio Release",
    cardTitle: "Noctis Runner",
    cardCopy: "Hand-finished mesh overlays with floating foam support.",
    image: "assets/sneaker-base.png",
    toneClass: "product-tone--obsidian",
    glow: "radial-gradient(circle, rgba(255, 125, 69, 0.34) 0%, rgba(255, 125, 69, 0) 72%)"
  },
  {
    badge: "Sale Wave",
    title: "Heat, motion, and a<br>brighter statement on foot.",
    text: "The Ember Pulse drop blends warm suede accents with a responsive foam platform for fast styling and soft landings.",
    cardTag: "Weekend Edit",
    cardTitle: "Ember Pulse",
    cardCopy: "Bold orange contour lines and a standout sale-week finish.",
    image: "assets/sneaker-base.png",
    toneClass: "product-tone--ember",
    glow: "radial-gradient(circle, rgba(255, 159, 86, 0.38) 0%, rgba(255, 159, 86, 0) 72%)"
  },
  {
    badge: "Fresh Arrival",
    title: "A cooler silhouette with<br>futuristic studio energy.",
    text: "Aurora Sprint combines crisp silver detailing, icy gradients, and a cleaner profile for a lighter visual mood.",
    cardTag: "Quiet Favorite",
    cardTitle: "Aurora Sprint",
    cardCopy: "Future-blue support geometry with elevated everyday wearability.",
    image: "assets/sneaker-base.png",
    toneClass: "product-tone--ice",
    glow: "radial-gradient(circle, rgba(141, 213, 255, 0.35) 0%, rgba(141, 213, 255, 0) 72%)"
  }
];

const productVariants = {
  obsidian: {
    name: "Noctis Runner",
    collection: "After Hours Capsule",
    price: 248,
    image: "assets/sneaker-base.png",
    toneClass: "product-tone--obsidian",
    description: "Tonal black overlays, soft reflective detailing, and a sculpted sole that gives the entire profile a cinematic glow.",
    badge: "Collector Pick",
    tagline: "Best for: Night movement / luxe streetwear / all-day flex",
    stock: "Drop stock: 19 pairs left",
    colorName: "Obsidian"
  },
  ember: {
    name: "Ember Pulse",
    collection: "Solar Archive",
    price: 228,
    image: "assets/sneaker-base.png",
    toneClass: "product-tone--ember",
    description: "Burnt orange suede textures and bright energy lines that add warmth, contrast, and a louder visual identity.",
    badge: "Sale Spotlight",
    tagline: "Best for: Warm palettes / standout fits / weekend drops",
    stock: "Drop stock: 11 pairs left",
    colorName: "Ember"
  },
  ice: {
    name: "Aurora Sprint",
    collection: "Glacier Lab",
    price: 236,
    image: "assets/sneaker-base.png",
    toneClass: "product-tone--ice",
    description: "A silver-blue finish with elevated cushioning geometry, clean overlays, and a lighter editorial tone.",
    badge: "New Arrival",
    tagline: "Best for: Minimal wardrobes / travel style / daily comfort",
    stock: "Drop stock: 14 pairs left",
    colorName: "Ice Silver"
  }
};

const heroBadge = document.querySelector("[data-hero-badge]");
const heroTitle = document.querySelector("[data-hero-title]");
const heroText = document.querySelector("[data-hero-text]");
const heroCardTag = document.querySelector("[data-hero-card-tag]");
const heroCardTitle = document.querySelector("[data-hero-card-title]");
const heroCardCopy = document.querySelector("[data-hero-card-copy]");
const heroImage = document.querySelector("[data-hero-image]");
const stageGlow = document.querySelector("[data-stage-glow]");
const heroDots = [...document.querySelectorAll("[data-hero-slide]")];
const nextHeroButton = document.querySelector("[data-next-hero]");

const productImage = document.querySelector("[data-product-image]");
const productBadge = document.querySelector("[data-product-badge]");
const productCollection = document.querySelector("[data-product-collection]");
const productName = document.querySelector("[data-product-name]");
const productPrice = document.querySelector("[data-product-price]");
const productDescription = document.querySelector("[data-product-description]");
const productTagline = document.querySelector("[data-product-tagline]");
const productStock = document.querySelector("[data-product-stock]");
const colorButtons = [...document.querySelectorAll("[data-color-switcher] .color-dot")];
const sizeButtons = [...document.querySelectorAll("[data-size-selector] .size-chip")];

const cartPanel = document.querySelector("[data-cart-panel]");
const cartTriggers = [...document.querySelectorAll("[data-open-cart], .cart-trigger")];
const closeCartButtons = [...document.querySelectorAll("[data-close-cart]")];
const addToCartButton = document.querySelector("[data-add-to-cart]");
const cartCount = document.querySelector("[data-cart-count]");
const cartToast = document.querySelector("[data-cart-toast]");
const cartImage = document.querySelector("[data-cart-image]");
const cartName = document.querySelector("[data-cart-name]");
const cartVariant = document.querySelector("[data-cart-variant]");
const cartQty = document.querySelector("[data-cart-qty]");
const cartTotal = document.querySelector("[data-cart-total]");
const qtyButtons = [...document.querySelectorAll("[data-qty-change]")];
const navToggle = document.querySelector(".nav-toggle");
const mobileMenu = document.querySelector("#mobile-menu");
const revealItems = [...document.querySelectorAll(".reveal")];
const arrivalSlider = document.querySelector("[data-arrival-slider]");
const sliderPrev = document.querySelector("[data-slider-prev]");
const sliderNext = document.querySelector("[data-slider-next]");
const parallaxRoot = document.querySelector("[data-parallax-root]");
const ctaForm = document.querySelector("[data-cta-form]");
const formToast = document.querySelector("[data-form-toast]");
const quickAddButtons = [...document.querySelectorAll("[data-quick-add]")];

let currentHero = 0;
let selectedColor = "obsidian";
let selectedSize = "40";
let quantity = 1;
let heroIntervalId;
let arrivalsSwiper;

function getHeroMotionBase() {
  if (window.innerWidth <= 760) {
    return { rotate: -8, x: 0, y: -8 };
  }

  if (window.innerWidth <= 1100) {
    return { rotate: -10, x: 0, y: -34 };
  }

  return { rotate: -10.5, x: 0, y: -58 };
}

function applyHeroTransform(offsetX = 0, offsetY = 0) {
  const base = getHeroMotionBase();
  heroImage.style.transform = `rotate(${base.rotate + offsetX}deg) translate(${base.x + offsetX * 2}px, ${base.y + offsetY * 2}px)`;
}

function setToneClass(element, toneClass) {
  if (!element) {
    return;
  }

  element.classList.remove("product-tone--obsidian", "product-tone--ember", "product-tone--ice");
  if (toneClass) {
    element.classList.add(toneClass);
  }
}

function updateHero(index) {
  currentHero = index;
  const slide = heroSlides[index];
  heroImage.classList.add("is-switching");

  setTimeout(() => {
    heroBadge.textContent = slide.badge;
    heroTitle.innerHTML = slide.title;
    heroText.textContent = slide.text;
    heroCardTag.textContent = slide.cardTag;
    heroCardTitle.textContent = slide.cardTitle;
    heroCardCopy.textContent = slide.cardCopy;
    heroImage.src = slide.image;
    setToneClass(heroImage, slide.toneClass);
    stageGlow.style.background = slide.glow;
    heroImage.classList.remove("is-switching");
  }, 180);

  heroDots.forEach((dot, dotIndex) => {
    dot.classList.toggle("is-active", dotIndex === index);
  });
}

function restartHeroInterval() {
  clearInterval(heroIntervalId);
  heroIntervalId = setInterval(() => {
    const nextIndex = (currentHero + 1) % heroSlides.length;
    updateHero(nextIndex);
  }, 5600);
}

function updateProduct(colorKey) {
  selectedColor = colorKey;
  const variant = productVariants[colorKey];
  productImage.classList.add("is-switching");

  setTimeout(() => {
    productImage.src = variant.image;
    productImage.alt = `${variant.name} in ${variant.colorName}`;
    setToneClass(productImage, variant.toneClass);
    productBadge.textContent = variant.badge;
    productCollection.textContent = variant.collection;
    productName.textContent = variant.name;
    productPrice.textContent = `$${variant.price}`;
    productDescription.textContent = variant.description;
    productTagline.textContent = variant.tagline;
    productStock.textContent = variant.stock;
    productImage.classList.remove("is-switching");
    updateCartView();
  }, 180);

  colorButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.color === colorKey);
  });
}

function updateCartView() {
  const variant = productVariants[selectedColor];
  const total = variant.price * quantity;
  cartImage.src = variant.image;
  cartImage.alt = `${variant.name} selected for cart`;
  setToneClass(cartImage, variant.toneClass);
  cartName.textContent = variant.name;
  cartVariant.textContent = `${variant.colorName} / Size ${selectedSize}`;
  cartQty.textContent = quantity;
  cartTotal.textContent = `$${total}`;
  cartCount.textContent = quantity;
}

function pulseCartToast() {
  if (!cartToast) {
    return;
  }

  cartToast.classList.add("is-visible");
  window.clearTimeout(pulseCartToast.timeoutId);
  pulseCartToast.timeoutId = window.setTimeout(() => {
    cartToast.classList.remove("is-visible");
  }, 1800);
}

function pulseFormToast() {
  if (!formToast) {
    return;
  }

  formToast.classList.add("is-visible");
  window.clearTimeout(pulseFormToast.timeoutId);
  pulseFormToast.timeoutId = window.setTimeout(() => {
    formToast.classList.remove("is-visible");
  }, 2200);
}

function nudgeAddButton() {
  if (!addToCartButton) {
    return;
  }

  const originalLabel = addToCartButton.textContent;
  addToCartButton.textContent = "Added";
  addToCartButton.disabled = true;

  window.setTimeout(() => {
    addToCartButton.textContent = originalLabel;
    addToCartButton.disabled = false;
  }, 950);
}

function slideArrival(direction) {
  if (arrivalsSwiper) {
    if (direction > 0) {
      arrivalsSwiper.slideNext();
    } else {
      arrivalsSwiper.slidePrev();
    }
    return;
  }

  if (!arrivalSlider) {
    return;
  }

  const card = arrivalSlider.querySelector(".arrival-card");
  const cardWidth = card ? card.getBoundingClientRect().width + 18 : 320;
  arrivalSlider.scrollBy({
    left: direction * cardWidth,
    behavior: "smooth"
  });
}

function openCart() {
  cartPanel.classList.add("is-open");
  cartPanel.setAttribute("aria-hidden", "false");
}

function closeCart() {
  cartPanel.classList.remove("is-open");
  cartPanel.setAttribute("aria-hidden", "true");
}

function toggleMobileMenu() {
  const isOpen = navToggle.getAttribute("aria-expanded") === "true";
  navToggle.setAttribute("aria-expanded", String(!isOpen));
  mobileMenu.hidden = isOpen;
}

heroDots.forEach((dot) => {
  dot.addEventListener("click", () => {
    updateHero(Number(dot.dataset.heroSlide));
    restartHeroInterval();
  });
});

if (nextHeroButton) {
  nextHeroButton.addEventListener("click", () => {
    const nextIndex = (currentHero + 1) % heroSlides.length;
    updateHero(nextIndex);
    restartHeroInterval();
  });
}

colorButtons.forEach((button) => {
  button.addEventListener("click", () => updateProduct(button.dataset.color));
});

sizeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    selectedSize = button.textContent.trim();
    sizeButtons.forEach((chip) => chip.classList.remove("is-active"));
    button.classList.add("is-active");
    updateCartView();
  });
});

cartTriggers.forEach((trigger) => trigger.addEventListener("click", openCart));
closeCartButtons.forEach((button) => button.addEventListener("click", closeCart));

if (addToCartButton) {
  addToCartButton.addEventListener("click", () => {
    quantity = Math.max(1, quantity);
    updateCartView();
    nudgeAddButton();
    pulseCartToast();
    openCart();
  });
}

qtyButtons.forEach((button) => {
  button.addEventListener("click", () => {
    quantity = Math.max(1, quantity + Number(button.dataset.qtyChange));
    updateCartView();
  });
});

if (navToggle) {
  navToggle.addEventListener("click", toggleMobileMenu);
}

if (sliderPrev) {
  sliderPrev.addEventListener("click", () => slideArrival(-1));
}

if (sliderNext) {
  sliderNext.addEventListener("click", () => slideArrival(1));
}

if (arrivalSlider && typeof Swiper !== "undefined") {
  arrivalsSwiper = new Swiper(arrivalSlider, {
    slidesPerView: 1.08,
    spaceBetween: 18,
    speed: 880,
    grabCursor: true,
    watchSlidesProgress: true,
    resistanceRatio: 0.82,
    breakpoints: {
      760: {
        slidesPerView: 1.45
      },
      1024: {
        slidesPerView: 2.4
      }
    }
  });
}

if (ctaForm) {
  ctaForm.addEventListener("submit", (event) => {
    event.preventDefault();
    ctaForm.reset();
    pulseFormToast();
  });
}

quickAddButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const color = button.dataset.quickAdd;
    if (!color || !productVariants[color]) {
      return;
    }

    updateProduct(color);
    pulseCartToast();
    openCart();
  });
});

if (parallaxRoot && window.matchMedia("(pointer:fine)").matches) {
  parallaxRoot.addEventListener("pointermove", (event) => {
    const bounds = parallaxRoot.getBoundingClientRect();
    const offsetX = (event.clientX - bounds.left) / bounds.width - 0.5;
    const offsetY = (event.clientY - bounds.top) / bounds.height - 0.5;
    applyHeroTransform(offsetX * 5, offsetY * 7);
  });

  parallaxRoot.addEventListener("pointerleave", () => {
    heroImage.style.transform = "";
  });
}

[...document.querySelectorAll(".mobile-menu a")].forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenu.hidden = true;
    navToggle.setAttribute("aria-expanded", "false");
  });
});

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeCart();

    if (mobileMenu && navToggle) {
      mobileMenu.hidden = true;
      navToggle.setAttribute("aria-expanded", "false");
    }
  }
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 760 && mobileMenu && navToggle) {
    mobileMenu.hidden = true;
    navToggle.setAttribute("aria-expanded", "false");
  }

  if (window.matchMedia("(pointer:fine)").matches && heroImage) {
    heroImage.style.transform = "";
  }
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.18 });

revealItems.forEach((item) => observer.observe(item));

restartHeroInterval();

updateProduct(selectedColor);
updateCartView();
