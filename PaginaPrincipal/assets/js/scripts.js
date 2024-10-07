// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuIcon = document.querySelector('.menu-icon');
    const navigation = document.querySelector('.navigation');

    menuIcon.addEventListener('click', function() {
        navigation.classList.toggle('active');
    });

    // Search functionality
    const searchIcon = document.querySelector('.search-icon .icon');
    const searchInput = document.querySelector('.search-icon input');

    searchIcon.addEventListener('click', function() {
        searchInput.classList.toggle('active');
        if (searchInput.classList.contains('active')) {
            searchInput.focus();
        }
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Slider functionality
    let slideIndex = 0;
    const slides = document.querySelectorAll('.slider ul li');
    
    function showSlides() {
        for (let i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
        slideIndex++;
        if (slideIndex > slides.length) {slideIndex = 1}
        slides[slideIndex-1].style.display = "block";
        setTimeout(showSlides, 5000); // Change image every 5 seconds
    }

    showSlides();

    // Add to cart functionality (placeholder)
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Here you would typically add the product to the cart
            // For this example, we'll just show an alert
            Swal.fire({
                title: '¡Producto añadido!',
                text: 'El producto ha sido añadido al carrito',
                icon: 'success',
                confirmButtonText: 'OK'
            });
        });
    });

    // Form submission (placeholder)
    const contactForm = document.querySelector('#contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Here you would typically handle the form submission
            // For this example, we'll just show an alert
            Swal.fire({
                title: '¡Formulario enviado!',
                text: 'Gracias por contactarnos',
                icon: 'success',
                confirmButtonText: 'OK'
            });
        });
    }
});