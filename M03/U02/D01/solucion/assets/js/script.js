import { Mascota } from "./mascota.js";


const form = document.forms['registro'];

form.addEventListener('submit', function(event) {
    event.preventDefault();
    mostrar(registrar());
});

function registrar() {
    return new Mascota(form.elements.propietario.value,
                       form.elements.direccion.value,
                       form.elements.telefono.value,
                       form.elements.tipo.value,
                       form.elements.nombreMascota.value,
                       form.elements.enfermedad.value);
}

function mostrar(mascota) {
    const lista = document.getElementById('resultado');
    const item = document.createElement('li');
    item.innerText = `${mascota.mostrarDatos()}`;
    lista.appendChild(item);
}