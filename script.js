// Atualize estes campos quando receber os dados oficiais da empresa.
const WHATSAPP_NUMBER = "COLOCAR_NUMERO_AQUI";
const MAPS_URL = "https://maps.app.goo.gl/aTcayAi5C8q53VE56";
const INSTAGRAM_URL = "COLOCAR_LINK_DO_INSTAGRAM_AQUI";

const WHATSAPP_MESSAGES = {
  geral: "Olá! Gostaria de falar com a Weslei Piscinas.",
  produtos: "Olá! Gostaria de saber mais sobre os produtos para tratamento de piscina.",
  manutencao: "Olá! Gostaria de solicitar um orçamento para limpeza e manutenção de piscina.",
  aquecimento: "Olá! Gostaria de saber mais sobre aquecimento para piscina.",
  consultoria: "Olá! Gostaria de saber mais sobre a consultoria para cuidados com piscina."
};

const hasPlaceholder = (value) => !value || value.startsWith("COLOCAR_");

// Use the supplied Google Maps embed in place of the decorative map artwork.
const locationVisual = document.querySelector(".location-visual");
if (locationVisual) {
  locationVisual.classList.add("location-map");
  locationVisual.removeAttribute("aria-hidden");
  locationVisual.replaceChildren();
  const map = document.createElement("iframe");
  map.title = "Localização da Weslei Piscinas no Google Maps";
  map.src = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3663.157150105055!2d-52.09740352467636!3d-23.346320478948236!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ed2ba9d836f771%3A0x9924eea567e37e36!2sWeslei%20Piscinas!5e0!3m2!1spt-BR!2sbr!4v1791443148343!5m2!1spt-BR!2sbr";
  map.width = "600";
  map.height = "450";
  map.allowFullscreen = true;
  map.loading = "lazy";
  map.referrerPolicy = "strict-origin-when-cross-origin";
  locationVisual.append(map);
}

document.querySelectorAll("[data-whatsapp]").forEach((link) => {
  const messageType = link.dataset.whatsapp;
  const message = WHATSAPP_MESSAGES[messageType] || WHATSAPP_MESSAGES.geral;

  if (hasPlaceholder(WHATSAPP_NUMBER)) {
    link.href = `https://wa.me/?text=${encodeURIComponent(message)}`;
    link.setAttribute("aria-label", `${link.textContent.trim()}: configure o número da empresa no script.js`);
  } else {
    const number = WHATSAPP_NUMBER.replace(/\D/g, "");
    link.href = `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
  }
  link.target = "_blank";
  link.rel = "noopener noreferrer";
});

document.querySelectorAll("[data-maps]").forEach((link) => {
  if (hasPlaceholder(MAPS_URL)) {
    link.href = "https://www.google.com/maps";
    link.setAttribute("aria-label", `${link.textContent.trim()}: configure o link da loja no script.js`);
  } else {
    link.href = MAPS_URL;
  }
  link.target = "_blank";
  link.rel = "noopener noreferrer";
});

document.querySelectorAll("[data-instagram]").forEach((link) => {
  if (hasPlaceholder(INSTAGRAM_URL)) {
    link.href = "https://www.instagram.com/";
    link.setAttribute("aria-label", "Instagram: configure o perfil da empresa no script.js");
  } else {
    link.href = INSTAGRAM_URL;
  }
  link.target = "_blank";
  link.rel = "noopener noreferrer";
});

const year = document.querySelector("#year");
if (year) year.textContent = String(new Date().getFullYear());

const revealElements = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        currentObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealElements.forEach((element, index) => {
    element.style.transitionDelay = `${Math.min(index % 4, 3) * 70}ms`;
    observer.observe(element);
  });
} else {
  revealElements.forEach((element) => element.classList.add("is-visible"));
}
