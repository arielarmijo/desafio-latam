import { Propietario } from "./propietario.js";

export class Animal extends Propietario {

    #tipo = '';

    constructor(nombre, direccion, telefono, tipo) {
        super(nombre, direccion, telefono);
        this.#tipo = tipo;
    }

    get tipo() {
        return `Animal: ${this.#tipo}`;
    }

}