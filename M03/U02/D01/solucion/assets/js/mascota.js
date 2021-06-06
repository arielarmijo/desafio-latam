import { Animal } from "./animal.js";

export class Mascota extends Animal {

    #nombre = '';
    #enfermedad = '';

    constructor(nombrePropietario, direccion, telefono, tipo, nombreMascota, enfermedad) {
        super(nombrePropietario, direccion, telefono, tipo);
        this.#nombre = nombreMascota;
        this.#enfermedad = enfermedad;
    }

    get nombre() {
        return this.#nombre;
    }

    set nombre(nombre) {
        this.#nombre = nombre;
    }

    get enfermedad() {
        return this.#enfermedad;
    }

    set enfermedad(enfermedad) {
        this.#enfermedad = enfermedad;
    }

    mostrarDatos() {
        return `${this.datosPropietario()}, ${this.tipo}, Enfermedad: ${this.enfermedad}`;
    }

}