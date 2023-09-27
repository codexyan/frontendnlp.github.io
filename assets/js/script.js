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
    plusButton.addEventListener("click", () => {
      addToCounter(index);
      const hargaText = hargaElements[index].textContent.trim();
      updateTotalHarga(hargaText, index);
    });
  });

  minButtons.forEach((minButton, index) => {
    minButton.addEventListener("click", () => {
      minFromCounter(index);
      const hargaText = hargaElements[index].textContent.trim();
      updateTotalHarga(hargaText, index);
    });
  });

  // Hitung Harga Modal Layer 1
  const ctaSubmit = document.querySelector(".cta-boxed");
  const feeBoxedElement = document.querySelector(".fee-boxed");
  const hargaElements = document.querySelectorAll(".name-choose .harga");

  let isCheckboxChecked = false;

  function updateTotalHarga(hargaText) {
    if (typeof hargaText === "string") {
      const harga = parseInt(hargaText.replace(/\D/g, ""));

      const valueElementAtIndex0 = document.querySelector(
        ".counter[data-index='0'] .value"
      );
      const valueAsNumber = parseInt(valueElementAtIndex0.textContent);
      console.log(valueAsNumber);

      let totalHarga = harga * valueAsNumber;

      if (isCheckboxChecked) {
        feeBoxedElement.textContent = `- Rp ${totalHarga}`;
        console.log(ctaSubmit.textContent);
      } else {
        feeBoxedElement.textContent = "";
      }
    }
  }

  const checkbox1 = document.getElementById("rounded-checkbox1");
  const checkbox2 = document.getElementById("rounded-checkbox2");
  const checkbox3 = document.getElementById("rounded-checkbox3");
  const checkbox4 = document.getElementById("rounded-checkbox4");
  const checkbox5 = document.getElementById("rounded-checkbox5");

  checkbox1.addEventListener("change", function () {
    isCheckboxChecked = checkbox1.checked;
    const hargaText = isCheckboxChecked
      ? hargaElements[0].textContent.trim()
      : "0";
    updateTotalHarga(hargaText);
  });

  checkbox2.addEventListener("change", function () {
    isCheckboxChecked = checkbox2.checked;
    const hargaText = isCheckboxChecked
      ? hargaElements[1].textContent.trim()
      : "0";
    updateTotalHarga(hargaText);
  });

  checkbox3.addEventListener("change", function () {
    isCheckboxChecked = checkbox3.checked;
    const hargaText = isCheckboxChecked
      ? hargaElements[2].textContent.trim()
      : "0";
    updateTotalHarga(hargaText);
  });

  checkbox4.addEventListener("change", function () {
    isCheckboxChecked = checkbox4.checked;
    const hargaText = isCheckboxChecked
      ? hargaElements[3].textContent.trim()
      : "0";
    updateTotalHarga(hargaText);
  });

  checkbox5.addEventListener("change", function () {
    isCheckboxChecked = checkbox5.checked;
    const hargaText = isCheckboxChecked
      ? hargaElements[4].textContent.trim()
      : "0";
    updateTotalHarga(hargaText);
  });

  // Send WhatsApp
  ctaSubmit.addEventListener("click", function () {
    const isianElement = document.querySelector(".name-choose .isian");
    const isianValue = isianElement.textContent.trim();
    const counterValue = document
      .querySelector(".counter[data-index='0'] .value")
      .textContent.trim();
    const feeBoxedValue = feeBoxedElement.textContent.trim();
    const pesan = `Halo min! Saya ingin pesan ${isianValue} berjumlah ${counterValue} dengan harga ${feeBoxedValue}, apakah bisa kak? Terimakasih`;
    const nomorWhatsApp = "6281393888145";
    const WhatsappUrl = `https://wa.me/${nomorWhatsApp}?text=${encodeURIComponent(
      pesan
    )}`;

    window.open(WhatsappUrl);
  });
});
