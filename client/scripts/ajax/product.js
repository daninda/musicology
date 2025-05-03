const url = "http://localhost:5025"

function getProductIdFromUrl() {
    const params = new URLSearchParams(window.location.search)
    return params.get("id")
}

function mapCategory(index) {
    const categories = ["Гитары", "Ударные", "Клавишные", "Аудиооборудование", "Аксессуары"]
    return categories[index]
}

function renderProduct(product) {
    document.title = `${product.name} | Музология`

    const image = document.querySelector(".product-image")
    image.src = url + product.imagePath
    image.alt = product.name

    document.querySelector(".brand-title").textContent = product.name
    document.getElementById("pr-title").textContent = `Обзор ${product.name}`
    document.querySelector(".product-description").textContent = product.description

    const specs = document.querySelector(".product-specs")
    specs.innerHTML = `
        <li><strong>Модель:</strong> ${product.name}</li>
        <li><strong>Категория:</strong> ${mapCategory(product.category)}</li>
        <li><strong>Цена:</strong> ${product.price.toLocaleString("ru-RU")} ₽</li>
    `
}

function renderNotFound() {
    const main = document.querySelector("main")
    main.innerHTML = `
        <div class="no-results">
            <h2>Товар не найден</h2>
            <p>К сожалению, запрашиваемый товар не найден или был удалён.</p>
            <a href="catalog.html" class="back-link">← Вернуться в каталог</a>
        </div>
    `
}

async function loadProduct() {
    const id = getProductIdFromUrl()
    if (!id) {
        renderNotFound()
        return
    }

    try {
        const response = await fetch(`${url}/api/products/${id}`)
        if (!response.ok) {
            renderNotFound()
            return
        }

        const product = await response.json()
        renderProduct(product)
    } catch (error) {
        console.log(error)
        renderNotFound()
    }
}

window.addEventListener("DOMContentLoaded", loadProduct)

window.addEventListener("DOMContentLoaded", () => {
    const reviewForm = document.getElementById("review-form")
    const reviewsList = document.getElementById("reviews-list")
    const authorInput = document.getElementById("review-author")
    const textInput = document.getElementById("review-text")
    const authorError = document.getElementById("review-author-error")
    const textError = document.getElementById("review-text-error")
    const successMessage = document.getElementById("review-success")

    async function loadReviews() {
        const id = getProductIdFromUrl()

        try {
            const res = await fetch(`${url}/api/reviews/${id}`)
            const reviews = await res.json()

            if (!reviews.length) {
                reviewsList.innerHTML = "<p>Отзывов пока нет.</p>"
                return
            }

            reviewsList.innerHTML = reviews.map(r => `
            <div class="review">
                <div class="review-author">${r.authorName}</div>
                <div class="review-text">${r.text}</div>
            </div>
        `).join("")
        } catch {
            reviewsList.innerHTML = "<p>Не удалось загрузить отзывы.</p>"
        }
    }

    reviewForm.addEventListener("submit", async (e) => {
        e.preventDefault()

        authorError.textContent = ""
        textError.textContent = ""
        successMessage.textContent = ""

        const author = authorInput.value.trim()
        const text = textInput.value.trim()
        const productId = getProductIdFromUrl()

        let isValid = true

        if (author.length < 3 || author.length > 32) {
            authorError.textContent = "Имя должно быть от 3 до 32 символов."
            isValid = false
        }

        if (text.length < 10 || text.length > 512) {
            textError.textContent = "Отзыв должен быть от 10 до 512 символов."
            isValid = false
        }

        if (!isValid) return

        const body = {
            authorName: author,
            text: text,
            productId: parseInt(productId)
        }

        try {
            const res = await fetch(`${url}/api/reviews`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            })

            if (res.ok) {
                successMessage.textContent = "Спасибо за отзыв!"
                authorInput.value = ""
                textInput.value = ""
                loadReviews(productId)
            } else {
                successMessage.textContent = "Ошибка при отправке отзыва."
            }
        } catch {
            successMessage.textContent = "Сервер недоступен."
        }
    })

    loadReviews();
})
