export class Propietario {

    #nombre = '';
    #direccion = '';
    #telefono = '';

    constructor(nombre, direccion, telefono) {
        this.#nombre = nombre;
        this.#direccion = direccion;
        this.#telefono = telefono;
    }

    datosPropietario() {
        return `Nombre propietario: ${this.#nombre}, Lugar de residencia: ${this.#direccion}, Teléfono: ${this.#telefono}`;
    }

}