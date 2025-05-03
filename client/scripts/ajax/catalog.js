const productsContainer = document.querySelector(".products")
const filterForm = document.getElementById("filter-form")
const prevButton = document.getElementById("prev-page")
const nextButton = document.getElementById("next-page")

const url = "http://92.63.101.172:5025"

const categoryMap = [
    "Guitars",
    "Drums",
    "Keyboards",
    "Microphones",
    "Accessories"
]

const categoryMapRu = ["Гитары", "Ударные", "Клавишные", "Аудиооборудование", "Аксессуары"];

let currentPage = 1
const pageSize = 6
let total = 6

function createProductCard(product) {
    const card = document.createElement("a")
    card.className = "product-card-box"
    card.href = `product.html?id=${product.id}`
    card.dataset.category = categoryMap[product.category]
    card.dataset.price = product.price

    card.innerHTML = `
        <img src="${url}${product.imagePath}" alt="${product.name}" class="product-card-image" />
        <div class="product-card-info">
            <p>${product.name}</p>
            <p><strong>от ${product.price.toLocaleString("ru-RU")} ₽</strong></p>
            <p>${categoryMapRu[product.category]}</p>
        </div>
    `

    return card
}

function renderProducts(products) {
    productsContainer.innerHTML = ""
    products.forEach(product => {
        const card = createProductCard(product)
        productsContainer.appendChild(card)
    })
}

function renderNotFound() {
    productsContainer.innerHTML = `
        <div class="no-results">
            <p>Ничего не найдено по заданным фильтрам.</p>
        </div>
    `
}

function buildQueryParams() {
    const category = parseInt(document.getElementById("category").value)
    const min = document.getElementById("price-min").value
    const max = document.getElementById("price-max").value

    const params = new URLSearchParams()
    if (category !== -1) {
        params.append("category", categoryMap[category])
    }

    if (min) params.append("minPrice", min)
    if (max) params.append("maxPrice", max)

    params.append("page", currentPage)
    params.append("pageSize", pageSize)

    return params.toString()
}

async function fetchProducts() {
    const query = buildQueryParams()
    const response = await fetch(`${url}/api/products?${query}`)
    if (!response.ok) {
        return
    }

    const { items, totalCount } = await response.json()
    total = totalCount
    if (items.length === 0) {
        disablePagination()
        renderNotFound()
    } else {
        updatePaginationButtons()
        renderProducts(items)
    }
}

function updatePaginationButtons() {
    prevButton.disabled = currentPage === 1
    nextButton.disabled = currentPage * pageSize > total
}

function disablePagination() {
    prevButton.disabled = true
    nextButton.disabled = true
}

prevButton.addEventListener("click", () => {
    if (currentPage > 1) {
        currentPage--
        fetchProducts()
    }
})

nextButton.addEventListener("click", () => {
    if (!(currentPage * pageSize > total)) {
        currentPage++
        fetchProducts()
    }
})

filterForm.addEventListener("submit", (e) => {
    e.preventDefault()
    currentPage = 1
    fetchProducts()
})

window.addEventListener("DOMContentLoaded", fetchProducts)
