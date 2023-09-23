// Banner Native Slide
const slider = document.querySelector(".slider")
const bannerImages = document.querySelectorAll(".banner-img")
const circles = document.querySelectorAll(".circle")
let currentIndex = 0

function updateSlider() {
  bannerImages.forEach((img, index) => {
    img.style.transform = `translateX(-${currentIndex * 100}%)`
    circles[index].classList.remove("circle-actived")
  })

  circles[currentIndex].classList.add("circle-actived")
}

function nextSlide() {
  currentIndex = (currentIndex + 1) % bannerImages.length
  updateSlider()
}

setInterval(nextSlide, 6000)

// CTA product
const heroBanner = document.querySelector(".hero-container")
const notification = document.querySelector(".notification")
const category = document.querySelector(".category")
const menu = document.querySelector(".menu")
const ctaBuy = document.querySelector("#cta-pesan")
const modalOverlay = document.getElementById("modal-overlay")
const ctaClose = document.querySelector(".cta-back")

ctaBuy.addEventListener("click", function () {
  modalOverlay.style.display = "flex";
  modalOverlay.style.transform = "translateY(0%)";
  modalOverlay.style.boxShadow = "5px 5px 12px rgba(0, 0, 0, 0.3)";
  heroBanner.style.filter = "blur(2px)"
  notification.style.filter = "blur(2px)"
  category.style.filter = "blur(2px)"
  menu.style.filter = "blur(2px)"
})

ctaClose.addEventListener("click", function () {
  modalOverlay.style.cursor = "pointer";
  modalOverlay.style.display = "none";
  heroBanner.style.filter = "none"
  notification.style.filter = "none"
  category.style.filter = "none"
  menu.style.filter = "none"
})

// Agar checkbox hanya dapat memilih salah satu saja
const checkboxes = document.querySelectorAll(".custom-checkbox")

checkboxes.forEach(function (checkbox) {
  checkbox.addEventListener('change', function () {
    checkboxes.forEach(function (otherCheckbox) {
      if (otherCheckbox !== checkbox) {
        otherCheckbox.checked = false;
      }
    });
  });
});

// Counter Pesanan Product
const minButton = document.querySelector(".counter-min")
const plusButton = document.querySelector(".counter-add")
const counterElement = document.querySelector(".value")

let counter = 0;

function addToCounter() {
  counter++
  counterElement.textContent = counter;
}

function minFromCounter() {
  if (counter > 0) {
    counter--
    counterElement.textContent = counter
  }
}

plusButton.addEventListener("click", addToCounter)
minButton.addEventListener("click", minFromCounter)