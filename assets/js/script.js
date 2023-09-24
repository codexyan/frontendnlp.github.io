// Banner Native Slide
const slider = document.querySelector(".slider");
const bannerImages = document.querySelectorAll(".banner-img");
const circles = document.querySelectorAll(".circle");
let currentIndex = 0;

function updateSlider() {
  bannerImages.forEach((img, index) => {
    img.style.transform = `translateX(-${currentIndex * 100}%)`;
    circles[index].classList.remove("circle-actived");
  });

  circles[currentIndex].classList.add("circle-actived");
}

function nextSlide() {
  currentIndex = (currentIndex + 1) % bannerImages.length;
  updateSlider();
}

setInterval(nextSlide, 6000);

// CTA product
const heroBanner = document.querySelector(".hero-container");
const notification = document.querySelector(".notification");
const category = document.querySelector(".category");
const menu = document.querySelector(".menu");
const blurElements = [heroBanner, notification, category, menu];

const modalOverlays = document.querySelectorAll(".modal-overlay");
const ctaBuyButtons = document.querySelectorAll(".cta-pesan");
const ctaCloseButtons = document.querySelectorAll(".cta-back");

// Agar checkbox hanya dapat memilih salah satu saja
ctaBuyButtons.forEach((ctaBuyButton) => {
  ctaBuyButton.addEventListener("click", function () {
    // Mengambil ID modal yang sesuai dari atribut "data-modal"
    const modalId = this.getAttribute("data-modal");
    const modalOverlay = document.getElementById(modalId);

    // Memeriksa apakah modal ditemukan
    if (modalOverlay) {
      // Menampilkan modal dan efek lainnya
      modalOverlay.style.display = "flex";
      modalOverlay.style.transform = "translateY(0%)";
      modalOverlay.style.boxShadow = "5px 5px 12px rgba(0, 0, 0, 0.3)";

      // Menampilkan modal dengan mengaktifkan kelas "show"
      modalOverlay.classList.add("show");

      // Menambahkan efek blur ke elemen-elemen yang ditentukan
      blurElements.forEach((element) => {
        element.classList.add("blur");
      });

      // Menyimpan referensi ke modal yang sedang aktif
      activeModal = modalOverlay;

      // Agar checkbox hanya dapat memilih salah satu saja di modal yang sedang aktif
      const checkboxes = modalOverlay.querySelectorAll(".custom-checkbox");
      checkboxes.forEach(function (checkbox) {
        checkbox.addEventListener("change", function () {
          checkboxes.forEach(function (otherCheckbox) {
            if (otherCheckbox !== checkbox) {
              otherCheckbox.checked = false;
            }
          });
        });
      });
    }
  });
});

// Menambahkan event listener pada setiap tombol "Tutup"
ctaCloseButtons.forEach((ctaCloseButton) => {
  ctaCloseButton.addEventListener("click", function () {
    // Mengambil elemen modal yang menjadi parent dari tombol "Tutup"
    const modalOverlay = this.closest(".modal-overlay");

    // Memeriksa apakah modal ditemukan
    if (modalOverlay) {
      // Menyembunyikan modal dengan efek animasi
      modalOverlay.style.transform = "translateY(100%)";
      modalOverlay.style.boxShadow = "none";
      modalOverlay.classList.remove("show");

      // Tambahkan event listener untuk mendeteksi akhir animasi
      modalOverlay.addEventListener(
        "transitionend",
        function () {
          // Setelah animasi selesai, sembunyikan modal dan menghapus efek blur
          modalOverlay.style.display = "none";
        },
        { once: true }
      ); // { once: true } agar event listener ini hanya berjalan satu kali
    }

    // Menghapus efek blur dari elemen-elemen yang ditentukan
    blurElements.forEach((element) => {
      element.classList.remove("blur");
    });
  });
});

// Counter Pesanan Product
const minButtons = document.querySelectorAll(".counter-min");
const plusButtons = document.querySelectorAll(".counter-add");
const counterElements = document.querySelectorAll(".value");

let counter = 1;

function addToCounter() {
  counter++;
  // Perlu mencari indeks elemen yang diklik
  const index = Array.from(plusButtons).indexOf(this);

  if (index !== -1) {
    // Mengupdate elemen dengan indeks yang sesuai
    counterElements[index].textContent = counter;
  }
}

function minFromCounter() {
  if (counter > 0) {
    counter--;
    // Perlu mencari indeks elemen yang diklik
    const index = Array.from(minButtons).indexOf(this);

    if (index !== -1) {
      // Mengupdate elemen dengan indeks yang sesuai
      counterElements[index].textContent = counter;
    }
  }
}

// Menambahkan event listener pada setiap tombol "Tambah"
plusButtons.forEach((plusButton) => {
  plusButton.addEventListener("click", addToCounter);
});

// Menambahkan event listener pada setiap tombol "Kurang"
minButtons.forEach((minButton) => {
  minButton.addEventListener("click", minFromCounter);
});


// --------------------------------
// Hitung Harga
