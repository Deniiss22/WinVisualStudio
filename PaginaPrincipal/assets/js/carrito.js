// Global variables
let carrito = [];
const listaCompra = document.querySelector("#lista-compra tbody");
const carritoDOMElement = document.getElementById('carrito');
const procesarCompraBtn = document.getElementById('procesar-compra');
const clienteInput = document.getElementById('cliente');
const correoInput = document.getElementById('correo');

// Load cart from localStorage on page load
document.addEventListener('DOMContentLoaded', () => {
    carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    actualizarCarritoUI();
});

// Update cart UI
function actualizarCarritoUI() {
    // Clear current cart UI
    listaCompra.innerHTML = '';

    carrito.forEach(producto => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><img src="${producto.imagen}" width="100"></td>
            <td>${producto.nombre}</td>
            <td>${producto.precio}</td>
            <td>${producto.cantidad}</td>
            <td>${producto.precio * producto.cantidad}</td>
            <td>
                <a href="#" class="borrar-producto" data-id="${producto.id}">X</a>
            </td>
        `;
        listaCompra.appendChild(row);
    });

    // Update totals
    calcularTotal();
}

// Calculate and update totals
function calcularTotal() {
    let subtotal = 0;
    carrito.forEach(producto => {
        subtotal += producto.precio * producto.cantidad;
    });

    const igv = subtotal * 0.18; // Assuming 18% tax
    const total = subtotal + igv;

    document.getElementById('subtotal').textContent = subtotal.toFixed(2);
    document.getElementById('igv').textContent = igv.toFixed(2);
    document.getElementById('total').value = total.toFixed(2);
}

// Remove product from cart
carritoDOMElement.addEventListener('click', e => {
    if (e.target.classList.contains('borrar-producto')) {
        const productoId = e.target.getAttribute('data-id');
        carrito = carrito.filter(producto => producto.id != productoId);
        actualizarCarritoUI();
        guardarCarritoEnStorage();
    }
});

// Save cart to localStorage
function guardarCarritoEnStorage() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

// Form validation
function validarFormulario(e) {
    e.preventDefault();
    if (carrito.length === 0) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'El carrito está vacío, agrega algún producto',
            timer: 2000,
            showConfirmButton: false
        });
        return;
    }

    if (clienteInput.value === '' || correoInput.value === '') {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Ingrese todos los campos requeridos',
            timer: 2000,
            showConfirmButton: false
        });
        return;
    }

    procesarPedido();
}

// Process order
function procesarPedido() {
    // Here you would typically send the order to a server
    // For this example, we'll just show a success message and clear the cart

    Swal.fire({
        icon: 'success',
        title: '¡Gracias por tu compra!',
        text: 'Tu pedido se ha procesado correctamente',
        timer: 2000,
        showConfirmButton: false
    }).then(() => {
        carrito = [];
        actualizarCarritoUI();
        guardarCarritoEnStorage();
    });
}

// Event listeners
procesarCompraBtn.addEventListener('click', validarFormulario);

// Email validation function
function validarCorreo(correo) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(correo).toLowerCase());
}

// Function to allow only letters in the name field
function sololetras(e) {
    const key = e.keyCode || e.which;
    const tecla = String.fromCharCode(key).toLowerCase();
    const letras = " áéíóúabcdefghijklmnñopqrstuvwxyz";

    if (letras.indexOf(tecla) == -1) {
        return false;
    }
}