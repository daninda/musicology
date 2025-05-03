const form = document.getElementById("sell-form");
const successMessage = document.getElementById("success-message");

const url = "http://localhost:5025"

form.addEventListener("submit", async function (e) {
    e.preventDefault();

    document.querySelectorAll(".error").forEach((el) => el.textContent = "");
    successMessage.textContent = "";

    const name = document.getElementById("item-name").value.trim();
    const category = document.getElementById("category").value;
    const price = parseFloat(document.getElementById("price").value);
    const description = document.getElementById("description").value.trim();
    const photo = document.getElementById("item-photo").files[0];

    let isValid = true;

    if (!name || name.length < 2 || name.length > 64) {
        document.getElementById("item-name-error").textContent = "Название должно быть от 2 до 64 символов.";
        isValid = false;
    }

    if (!category || isNaN(parseInt(category))) {
        document.getElementById("category-error").textContent = "Выберите категорию.";
        isValid = false;
    }

    if (isNaN(price) || price <= 0) {
        document.getElementById("price-error").textContent = "Введите корректную цену.";
        isValid = false;
    }

    if (!description || description.length < 20 || description.length > 512) {
        document.getElementById("description-error").textContent = "Описание должно быть от 20 до 512 символов.";
        isValid = false;
    }

    if (!photo || !["image/jpeg", "image/png"].includes(photo.type)) {
        document.getElementById("item-photo-error").textContent = "Загрузите изображение в формате .jpg или .png.";
        isValid = false;
    }

    if (!isValid) return;

    const formData = new FormData();
    formData.append("name", name);
    formData.append("category", category);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("imageFile", photo);

    try {
        const response = await fetch(`${url}/api/products`, {
            method: "POST",
            body: formData,
        });

        if (response.ok) {
            successMessage.textContent = "Товар успешно добавлен!";
            form.reset();
        } else {
            const errorText = await response.text();
            successMessage.textContent = `Ошибка сервера: ${errorText}`;
        }
    } catch (err) {
        console.error(err);
        successMessage.textContent = "Произошла ошибка при отправке. Повторите попытку позже.";
    }
});
