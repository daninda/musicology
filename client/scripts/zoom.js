document.querySelectorAll('.zoom-container').forEach(container => {
    const image = container.querySelector('.product-image');

    container.addEventListener('mousemove', (e) => {
        const bounds = container.getBoundingClientRect();
        const x = e.clientX - bounds.left;
        const y = e.clientY - bounds.top;

        let offsetX = (x / bounds.width) * 100;
        let offsetY = (y / bounds.height) * 100;

        image.style.transform = `scale(2) translate(-${offsetX / 2}%, -${offsetY / 2}%)`;
        image.style.transformOrigin = `${offsetX - 50}% ${offsetY - 50}%`;
    });

    container.addEventListener('mouseleave', () => {
        image.style.transform = 'scale(1)';
        image.style.transformOrigin = 'scale(1)';
    });
});