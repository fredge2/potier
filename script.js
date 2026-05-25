// script.js
document.addEventListener("DOMContentLoaded", () => {
  // ==========================================
  // 1. GESTION DU MENU MOBILE (Burger Menu)
  // ==========================================
  const burgerMenu = document.querySelector(".burger-menu");
  const navMenu = document.querySelector("nav ul");

  if (burgerMenu) {
    burgerMenu.addEventListener("click", () => {
      navMenu.classList.toggle("show");
    });
  }

  // ==========================================
  // 2. GESTION DE LA BOITE NOIRE (LIGHTBOX)
  // ==========================================
  const modal = document.getElementById("image-modal");
  const modalImg = document.getElementById("modal-img");
  const modalCaption = document.getElementById("modal-caption");
  const closeModalBtn = document.querySelector(".close-modal");
  const prevBtn = document.querySelector(".prev-modal-btn");
  const nextBtn = document.querySelector(".next-modal-btn");

  let currentGalleryImages = [];
  let currentImageIndex = 0;

  // Fonction pour ouvrir la boîte noire avec l'image sélectionnée
  function openModal() {
    if (currentGalleryImages.length > 0 && modal && modalImg) {
      const targetImg = currentGalleryImages[currentImageIndex];
      modalImg.src = targetImg.src;
      if (modalCaption) {
        modalCaption.textContent =
          targetImg.alt || `Image ${currentImageIndex + 1}`;
      }
      modal.classList.add("show");
    }
  }

  // Fonctions pour passer à l'image suivante / précédente
  function nextImage() {
    if (currentGalleryImages.length > 0) {
      currentImageIndex = (currentImageIndex + 1) % currentGalleryImages.length;
      openModal();
    }
  }

  function prevImage() {
    if (currentGalleryImages.length > 0) {
      currentImageIndex =
        (currentImageIndex - 1 + currentGalleryImages.length) %
        currentGalleryImages.length;
      openModal();
    }
  }

  // Associer les clics sur les boutons Flèches de la lightbox
  if (nextBtn)
    nextBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      nextImage();
    });
  if (prevBtn)
    prevBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      prevImage();
    });

  // Fermer la boîte noire (Croix ou clic à côté)
  if (closeModalBtn) {
    closeModalBtn.addEventListener("click", () => {
      modal.classList.remove("show");
    });
  }
  if (modal) {
    modal.addEventListener("click", (e) => {
      if (
        e.target === modal ||
        e.target.classList.contains("modal-image-wrapper")
      ) {
        modal.classList.remove("show");
      }
    });
  }

  // Navigation au clavier (Flèches et Echap)
  document.addEventListener("keydown", (e) => {
    if (modal && modal.classList.contains("show")) {
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
      if (e.key === "Escape") modal.classList.remove("show");
    }
  });

  // ==========================================
  // 3. CLICS SUR LES IMAGES VISIBLES (Grilles normales)
  // ==========================================
  document.querySelectorAll("[data-gallery]").forEach((galleryContainer) => {
    const images = Array.from(galleryContainer.querySelectorAll("img"));
    images.forEach((img, index) => {
      img.style.cursor = "pointer";
      img.addEventListener("click", () => {
        currentGalleryImages = images;
        currentImageIndex = index;
        openModal();
      });
    });
  });

  // ==========================================
  // 4. CLICS SUR LES BOUTONS "VOIR TOUTES LES PHOTOS" (Dépôts cachés)
  // ==========================================
  function setupHiddenGallery(buttonId, dataContainerId) {
    const btn = document.getElementById(buttonId);
    if (btn) {
      btn.addEventListener("click", () => {
        const hiddenImages = Array.from(
          document.querySelectorAll(`#${dataContainerId} img`),
        );
        if (hiddenImages.length > 0) {
          currentGalleryImages = hiddenImages; // Charge toutes les images cachées
          currentImageIndex = 0; // Commence à la toute première
          openModal(); // Ouvre la Lightbox
        }
      });
    }
  }

  // On active les 3 boutons créés dans le HTML !
  setupHiddenGallery("btn-all-productions", "data-all-productions");
  setupHiddenGallery("btn-all-exposition", "data-all-exposition");
  setupHiddenGallery("btn-all-anagama", "data-all-anagama");

  // ==========================================
  // 5. FENÊTRE POP-UP (Comment ça fonctionne - OYAS)
  // ==========================================
  const oyaModal = document.getElementById("oya-popup-modal");
  const openOyaBtn = document.getElementById("open-oya-popup");
  const closeOyaBtn = document.querySelector(".close-popup");

  if (openOyaBtn && oyaModal) {
    openOyaBtn.addEventListener("click", () => {
      oyaModal.classList.add("show");
    });
  }
  if (closeOyaBtn && oyaModal) {
    closeOyaBtn.addEventListener("click", () => {
      oyaModal.classList.remove("show");
    });
  }
  if (oyaModal) {
    oyaModal.addEventListener("click", (e) => {
      if (e.target === oyaModal) {
        oyaModal.classList.remove("show");
      }
    });
  }

  // ==========================================
  // 6. CARROUSEL HORIZONTAL (Page Accueil si présent)
  // ==========================================
  const track = document.querySelector(".carousel-track");
  const nextSlideBtn = document.querySelector(".next-btn");
  const prevSlideBtn = document.querySelector(".prev-btn");

  if (track && nextSlideBtn && prevSlideBtn) {
    const scrollAmount = 324;
    nextSlideBtn.addEventListener("click", () => {
      track.scrollBy({ left: scrollAmount, behavior: "smooth" });
    });
    prevSlideBtn.addEventListener("click", () => {
      track.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    });
  }
});
