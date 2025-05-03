document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search)
    const productId = params.get('id')
    
    const product = productsData.find(p => p.id == productId)
    console.log(product);
    
    if (product) {
        document.querySelector('.brand-title').textContent = product.model

        document.querySelector('.product-description').textContent = product.description

        document.getElementById('pr-title').textContent = "Обзор " + product.model

        document.getElementById('pr-features').textContent = "Особенности " + product.model

        document.querySelector(".product-image").src = `images/catalog/product${parseInt(productId) + 1}.png`

        const specs = document.querySelector('.product-specs')
        specs.innerHTML = `
        <li><strong>Модель:</strong> ${product.model}</li>
        <li><strong>Габариты:</strong> ${product.dimensions}</li>
        <li><strong>Цена:</strong> ${product.price} ₽</li>
    `

        const featuresGrid = document.querySelector('.features-grid')
        featuresGrid.innerHTML = product.features.map(feature => `
        <div class="feature-item">
            <h3 class="feature-title">${feature.title}</h3>
            <p class="feature-text">${feature.description}</p>
        </div>
    `).join('')
    }
})