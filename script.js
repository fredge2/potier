// script.js
document.addEventListener("DOMContentLoaded", () => {
  // --- 1. GESTION DU MENU MOBILE (Burger Menu) ---
  const burgerMenu = document.querySelector(".burger-menu");
  const navMenu = document.querySelector("nav ul");

  if (burgerMenu) {
    burgerMenu.addEventListener("click", () => {
      navMenu.classList.toggle("show");
    });
  }

  // --- 2. GESTION DU CARROUSEL D'IMAGES (Page Création) ---
  const track = document.querySelector(".carousel-track");
  const nextBtn = document.querySelector(".next-btn");
  const prevBtn = document.querySelector(".prev-btn");

  // On vérifie que les éléments du carrousel existent bien sur la page actuelle
  // (pour éviter les erreurs sur la page d'accueil ou contact)
  if (track && nextBtn && prevBtn) {
    // Distance de défilement : 300px (largeur image) + 24px (espace entre images)
    const scrollAmount = 324;

    nextBtn.addEventListener("click", () => {
      track.scrollBy({ left: scrollAmount, behavior: "smooth" });
    });

    prevBtn.addEventListener("click", () => {
      track.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    });
  }

  // --- 3. GESTION DE L'AGRANDISSEMENT DES IMAGES (Lightbox) ---
  const modal = document.getElementById("image-modal");
  const modalImg = document.getElementById("modal-img");
  const closeModalBtn = document.querySelector(".close-modal");
  const carouselImages = document.querySelectorAll(".carousel-slide");

  if (modal && carouselImages.length > 0) {
    // Quand on clique sur une image du carrousel
    carouselImages.forEach((img) => {
      img.addEventListener("click", () => {
        modalImg.src = img.src; // On donne la source de l'image cliquée à la grande image
        modal.classList.add("show"); // On affiche la boîte noire
      });
    });

    // Quand on clique sur la grosse croix (X)
    closeModalBtn.addEventListener("click", () => {
      modal.classList.remove("show"); // On cache la boîte noire
    });

    // Bonus : Quand on clique à côté de l'image (sur le fond noir)
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.classList.remove("show");
      }
    });
  }
});
