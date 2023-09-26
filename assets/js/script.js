document.addEventListener("DOMContentLoaded", function () {
  // Slider banner activation
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
  const blurElements = document.querySelectorAll(
    ".hero-container, .notification, .category, .menu"
  );

  const ctaBuyButtons = document.querySelectorAll(".cta-pesan");
  const ctaCloseButtons = document.querySelectorAll(".cta-back");

  ctaBuyButtons.forEach((ctaBuyButton) => {
    ctaBuyButton.addEventListener("click", function () {
      const modalId = this.getAttribute("data-modal");
      const modalOverlay = document.getElementById(modalId);

      if (modalOverlay) {
        modalOverlay.style.display = "flex";
        modalOverlay.style.transform = "translateY(0%)";
        modalOverlay.style.boxShadow = "5px 5px 12px rgba(0, 0, 0, 0.3)";
        modalOverlay.classList.add("show");

        blurElements.forEach((element) => {
          element.classList.add("blur");
        });

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

  ctaCloseButtons.forEach((ctaCloseButton) => {
    ctaCloseButton.addEventListener("click", function () {
      const modalOverlay = this.closest(".modal-overlay");

      if (modalOverlay) {
        modalOverlay.style.transform = "translateY(100%)";
        modalOverlay.style.boxShadow = "none";
        modalOverlay.classList.remove("show");

        modalOverlay.addEventListener(
          "transitionend",
          function () {
            modalOverlay.style.display = "none";
          },
          { once: true }
        );
      }

      blurElements.forEach((element) => {
        element.classList.remove("blur");
      });
    });
  });

  // Counter Pesanan Product
  let counter = 1;
  const minButtons = document.querySelectorAll(".counter-min");
  const plusButtons = document.querySelectorAll(".counter-add");

  const counterElements = document.querySelectorAll(".counter");
  const counters = Array.from(counterElements).map((counterElement) => {
    const index = counterElement.getAttribute("data-index");
    const valueElement = counterElement.querySelector(".value");
    return {
      value: parseInt(valueElement.textContent),
      valueElement,
      index,
    };
  });

  function addToCounter(index) {
    counters[index].value++;
    counters[index].valueElement.textContent = counters[index].value;
    updateTotalHarga();
  }

  function minFromCounter(index) {
    if (counters[index].value > 1) {
      counters[index].value--;
      counters[index].valueElement.textContent = counters[index].value;
      updateTotalHarga();
    }
  }

  plusButtons.forEach((plusButton, index) => {
    plusButton.addEventListener("click", () => addToCounter(index));
  });

  minButtons.forEach((minButton, index) => {
    minButton.addEventListener("click", () => minFromCounter(index));
  });

  // Hitung Harga Modal Layer 1
  const feeBoxedElement = document.querySelector(".fee-boxed");

  // Harga
  const hargaElementsOri1 = document.querySelector(".name-choose:nth-child(1) .harga");

  // debugging
  if (hargaElementsOri1) {
    const hargaText = hargaElementsOri1.textContent.trim();
    const harga = parseInt(hargaText.replace(/\D/g, ""));
    console.log("Harga dari checkbox1:", harga);
  } else {
    console.log("Elemen harga tidak ditemukan.");
  }

  // Checkbox
  const checkbox1 = document.getElementById("rounded-checkbox1");
  const checkbox2 = document.getElementById("rounded-checkbox2");

  let isCheckboxChecked = false;

  function updateTotalHarga() {
    const hargaText = hargaElementsOri1.textContent.trim();
    const harga = parseInt(hargaText.replace(/\D/g, ""));
    const valueElementAtIndex0 = document.querySelector(
      ".counter[data-index='0'] .value"
    );
    const valueAsNumber = parseInt(valueElementAtIndex0.textContent);
    // Mengambil angka dari teks harga

    let totalHarga = harga * valueAsNumber;

    if (isCheckboxChecked) {
      console.log(counters);
      console.log("hargaText:", hargaText);
      console.log("harga:", harga);
      console.log("totalHarga:", totalHarga);
      console.log("berhasil");
      feeBoxedElement.textContent = `- Rp ${totalHarga}`;
    } else {
      feeBoxedElement.textContent = "";
    }
  }

  checkbox1.addEventListener("change", function () {
    isCheckboxChecked = checkbox1.checked;
    updateTotalHarga();
  });

  // checkbox2.addEventListener("change", function () {
  //   // Periksa apakah checkbox2 dipilih
  //   if (checkbox2.checked) {
  //     const hargaText = document
  //       .querySelector(".name-choose:nth-child(2) .harga")
  //       .textContent.trim();
  //     const harga = parseInt(hargaText.replace(/\D/g, ""));

  //     // Sekarang Anda memiliki nilai harga yang sesuai dengan checkbox2 yang dipilih
  //     console.log("Harga dari checkbox2:", harga);
  //   }

  //   // Panggil fungsi updateTotalHarga() di sini untuk menghitung total harga jika diperlukan
  //   updateTotalHarga();
  // });
});
