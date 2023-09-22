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
const ctaBuy = document.querySelector("#cta-pesan")
ctaBuy.addEventListener("click", function () {
    console.log("pesanan ditentukan!")
})