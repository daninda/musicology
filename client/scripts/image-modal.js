let modal = document.getElementById("image-modal");
let modalImg = document.getElementById("img01");
let captionText = document.getElementById("caption");
let closeBtn = document.getElementsByClassName("close")[0];
let carousel_buttons = document.querySelectorAll(".carousel-button");
let images = document.querySelectorAll('.product-image');

images.forEach(function (image) {
    image.onclick = function () {
        modal.style.display = "block";
        modalImg.src = this.src;
        captionText.innerHTML = this.alt;
        
        carousel_buttons.forEach(function (button) {
            button.style.display = "none";
        });
    };
});

closeBtn.onclick = function () {
    modal.style.display = "none";
    carousel_buttons.forEach(function (button) {
        button.style.display = "flex";
    });
};