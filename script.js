const properties = {
  potenza: {
    name: "Potenza Picena Villa",
    highlights: [
      ["surface", "480 sqm internal surface"],
      ["garden", "1,000 sqm private garden"],
      ["bed", "5 bedrooms"],
      ["bath", "4 bathrooms"],
      ["rooms", "12 rooms"],
      ["lift", "Private elevator"],
      ["parking", "Private parking"],
      ["energy", "Energy Class A4"],
      ["restored", "Fully restored"],
      ["potential", "Future expansion potential"],
    ],
  },
};

const accessScreen = document.querySelector("#accessScreen");
const propertyPage = document.querySelector("#propertyPage");
const accessForm = document.querySelector("#accessForm");
const accessCode = document.querySelector("#accessCode");
const accessError = document.querySelector("#accessError");
const highlightGrid = document.querySelector("#highlightGrid");
const savedAccessCode = "privateEstateAccess";
const savedAccessExpiry = "privateEstateAccessExpiry";
const accessDurationMs = 12 * 60 * 60 * 1000;

try {
  localStorage.removeItem(savedAccessCode);
  localStorage.removeItem(savedAccessExpiry);
} catch (error) {
  /* Local storage may be unavailable on local file URLs. */
}

const icons = {
  surface:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M4 5h16v14H4z"/><path d="M8 9h8M8 13h5"/></svg>',
  garden:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M12 21V9"/><path d="M12 9c-5 0-7-3-7-6 4 0 7 2 7 6Z"/><path d="M12 13c5 0 7-3 7-6-4 0-7 2-7 6Z"/></svg>',
  bed:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M4 12V7a2 2 0 0 1 2-2h5v7"/><path d="M20 12V9a2 2 0 0 0-2-2h-7"/><path d="M4 19v-7h16v7"/><path d="M4 16h16"/></svg>',
  bath:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M5 11h14v3a5 5 0 0 1-5 5H10a5 5 0 0 1-5-5v-3Z"/><path d="M7 11V6a3 3 0 0 1 6 0"/><path d="M4 21h16"/></svg>',
  rooms:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M4 4h16v16H4z"/><path d="M4 12h16M12 4v16"/></svg>',
  lift:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M7 3h10v18H7z"/><path d="M10 8l2-2 2 2M14 16l-2 2-2-2"/></svg>',
  parking:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M7 21V3h7a5 5 0 0 1 0 10H7"/><path d="M7 13h7"/></svg>',
  energy:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="m13 2-7 12h6l-1 8 7-12h-6l1-8Z"/></svg>',
  restored:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M4 12a8 8 0 0 1 13.7-5.6L20 9"/><path d="M20 4v5h-5"/><path d="M20 12a8 8 0 0 1-13.7 5.6L4 15"/><path d="M4 20v-5h5"/></svg>',
  potential:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M4 20 20 4"/><path d="M14 4h6v6"/><path d="M5 8h6M5 13h4M5 18h2"/></svg>',
};

function normalizeCode(value) {
  return value.trim().toLowerCase();
}

function saveAccessCode(code) {
  const expiry = String(Date.now() + accessDurationMs);

  try {
    sessionStorage.setItem(savedAccessCode, code);
    sessionStorage.setItem(savedAccessExpiry, expiry);
  } catch (error) {
    /* Continue with tab-level fallback. */
  }

  try {
    window.name = JSON.stringify({
      ...getWindowMemory(),
      [savedAccessCode]: code,
      [savedAccessExpiry]: expiry,
    });
  } catch (error) {
    return false;
  }

  return true;
}

function getSavedAccessCode() {
  let code = null;
  let expiry = null;

  try {
    code = sessionStorage.getItem(savedAccessCode);
    expiry = sessionStorage.getItem(savedAccessExpiry);
  } catch (error) {
    code = null;
    expiry = null;
  }

  if (!code) {
    const memory = getWindowMemory();
    code = memory[savedAccessCode] || null;
    expiry = memory[savedAccessExpiry] || null;
  }

  if (!code || !expiry || Number(expiry) < Date.now()) {
    clearSavedAccessCode();
    return null;
  }

  return code;
}

function clearSavedAccessCode() {
  try {
    sessionStorage.removeItem(savedAccessCode);
    sessionStorage.removeItem(savedAccessExpiry);
  } catch (error) {
    /* Storage may be unavailable on local file URLs. */
  }

  try {
    const memory = getWindowMemory();
    delete memory[savedAccessCode];
    delete memory[savedAccessExpiry];
    window.name = JSON.stringify(memory);
  } catch (error) {
    /* Window memory may be unavailable in some browser contexts. */
  }
}

function getWindowMemory() {
  try {
    return window.name ? JSON.parse(window.name) : {};
  } catch (error) {
    return {};
  }
}

function removeAccessFromUrl() {
  const url = new URL(window.location.href);

  if (url.searchParams.has("access")) {
    url.searchParams.delete("access");
    window.history.replaceState(null, "", url);
  }
}

function renderProperty(property) {
  highlightGrid.innerHTML = property.highlights
    .map(
      ([icon, label]) => `
        <article class="highlight-card">
          ${icons[icon]}
          <strong>${label}</strong>
        </article>
      `,
    )
    .join("");
}

function unlockProperty(property) {
  renderProperty(property);
  propertyPage.hidden = false;
  document.body.classList.remove("is-locked");
  document.body.classList.add("is-unlocked");
  removeAccessFromUrl();
  accessScreen.classList.add("is-hidden");
  window.setTimeout(() => {
    accessScreen.hidden = true;
    document.querySelector("#hero").scrollIntoView({ behavior: "smooth" });
  }, 620);
}

accessForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const code = normalizeCode(accessCode.value);
  const property = properties[code];

  if (!property) {
    accessError.textContent = "Invalid access code. Please try again.";
    accessCode.select();
    return;
  }

  saveAccessCode(code);
  accessError.textContent = "";
  unlockProperty(property);
});

const rememberedCode = getSavedAccessCode();
const rememberedProperty = properties[rememberedCode];

if (rememberedProperty) {
  unlockProperty(rememberedProperty);
} else {
  document.body.classList.add("is-locked");
}

const expandableLayoutCards = document.querySelectorAll(".expandable-layout-card");
const zoomableImages = document.querySelectorAll("[data-full-image]");
const gardenLightbox = document.querySelector("#gardenLightbox");
const gardenLightboxImage = document.querySelector("#gardenLightboxImage");
const gardenLightboxClose = document.querySelector(".image-lightbox-close");

function openGardenLightbox(imageSrc) {
  if (!gardenLightbox || !gardenLightboxImage) {
    return;
  }

  gardenLightboxImage.src = imageSrc;
  gardenLightbox.hidden = false;
  window.requestAnimationFrame(() => {
    gardenLightbox.classList.add("is-open");
  });
}

function closeGardenLightbox() {
  if (!gardenLightbox) {
    return;
  }

  gardenLightbox.classList.remove("is-open");
  window.setTimeout(() => {
    gardenLightbox.hidden = true;
    if (gardenLightboxImage) {
      gardenLightboxImage.removeAttribute("src");
    }
  }, 220);
}

expandableLayoutCards.forEach((card) => {
  const toggle = card.querySelector(".layout-gallery-toggle");
  const gallery = card.querySelector(".layout-photo-gallery");
  const toggleLabel = toggle?.querySelector("span");

  toggle?.addEventListener("click", () => {
    if (!gallery) {
      return;
    }

    const shouldOpen = !card.classList.contains("is-open");
    toggle.setAttribute("aria-expanded", String(shouldOpen));
    if (toggleLabel) {
      toggleLabel.textContent = shouldOpen ? "Hide Gallery" : "View Gallery";
    }

    if (shouldOpen) {
      gallery.hidden = false;
      window.requestAnimationFrame(() => {
        card.classList.add("is-open");
      });
    } else {
      card.classList.remove("is-open");
      window.setTimeout(() => {
        if (!card.classList.contains("is-open")) {
          gallery.hidden = true;
        }
      }, 340);
    }
  });
});

zoomableImages.forEach((imageButton) => {
  imageButton.addEventListener("click", () => {
    openGardenLightbox(imageButton.dataset.fullImage);
  });
});

gardenLightboxClose?.addEventListener("click", closeGardenLightbox);

gardenLightbox?.addEventListener("click", (event) => {
  if (event.target === gardenLightbox) {
    closeGardenLightbox();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && gardenLightbox?.classList.contains("is-open")) {
    closeGardenLightbox();
  }
});
