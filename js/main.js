// ---------- reveal on scroll ----------
let revealsStarted = false;
function initReveals() {
  if (revealsStarted) return;
  revealsStarted = true;
  const observer = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          observer.unobserve(e.target);
        }
      }
    },
    { threshold: 0.12 }
  );
  document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
}

// ---------- password gate ----------
// SHA-256 of the password, so the word itself isn't readable in the source.
// To change the password: run  printf 'newword' | shasum -a 256  and paste
// the hash here. Note this only deters casual visitors — a static site
// can't keep a determined person out.
const GATE_HASH = "0e062e4c2ee475679d9cfd9cd30c295dec2a0eb7a02ffb0c5b239d2617022a8a";
const gate = document.getElementById("gate");
const gateForm = document.getElementById("gate-form");
const gateInput = document.getElementById("gate-input");

async function sha256(text) {
  const data = new TextEncoder().encode(text);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return [...new Uint8Array(digest)]
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function unlock(instant) {
  if (instant) gate.style.transition = "none";
  gate.classList.add("unlocked");
  document.body.classList.remove("locked");
  sessionStorage.setItem("iza-unlocked", "1");
  initReveals();
}

if (sessionStorage.getItem("iza-unlocked") === "1") {
  unlock(true);
} else {
  document.body.classList.add("locked");
}

gateForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const hash = await sha256(gateInput.value.trim().toLowerCase());
  if (hash === GATE_HASH) {
    unlock(false);
  } else {
    gate.classList.add("wrong");
    gateInput.select();
  }
});
gateInput.addEventListener("input", () => gate.classList.remove("wrong"));

// ---------- lightbox ----------
const lightbox = document.getElementById("lightbox");
const lightboxImg = lightbox.querySelector("img");
const lightboxCaption = lightbox.querySelector(".lightbox-caption");

function openLightbox(src, alt, caption) {
  lightboxImg.src = src;
  lightboxImg.alt = alt || "";
  lightboxCaption.textContent = caption || "";
  lightbox.classList.add("open");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

// gallery cards
document.querySelectorAll(".work").forEach((fig) => {
  fig.addEventListener("click", () => {
    const img = fig.querySelector("img");
    const title = fig.querySelector("h3")?.textContent ?? "";
    const meta = fig.querySelector("figcaption p")?.textContent ?? "";
    openLightbox(fig.dataset.full || img.src, img.alt, `${title} — ${meta}`);
  });
});

// abyss strip images
document.querySelectorAll(".abyss-strip img").forEach((img) => {
  img.addEventListener("click", () => {
    openLightbox(img.dataset.full || img.src, img.alt, "Abyss, It Just Is — installation view");
  });
});

lightbox.addEventListener("click", (e) => {
  if (e.target !== lightboxImg) closeLightbox();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeLightbox();
});
