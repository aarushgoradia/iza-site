// ---------- reveal on scroll ----------
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
