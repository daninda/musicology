document.addEventListener("DOMContentLoaded", () => {
    const filterForm = document.getElementById("filter-form");

    const products = document.querySelectorAll(".product-card-box");
    productsData = productsData.map((elem, index) => {
        return {
            ...elem,
            element: products[index]
        }
    })

    filterForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const categoryFilter = filterForm["category"].value;
        const priceMinFilter = parseInt(filterForm["price-min"].value) || 0;
        const priceMaxFilter = parseInt(filterForm["price-max"].value) || Infinity;
        const brandFilter = filterForm["brand"].value;

        productsData.forEach((product) => {
            const matchesCategory = !categoryFilter || product.category === categoryFilter;
            const matchesPrice = product.price >= priceMinFilter && product.price <= priceMaxFilter;
            const matchesBrand = !brandFilter || product.brand === brandFilter;

            if (matchesCategory && matchesPrice && matchesBrand) {
                product.element.style.display = "block";
            } else {
                product.element.style.display = "none";
            }
        });
    });
});