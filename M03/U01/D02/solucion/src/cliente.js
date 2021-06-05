export class Cliente {

    #nombre = '';
    #impuesto = null;

    constructor(nombre, impuesto) {
        this.#nombre = nombre;
        this.#impuesto = impuesto;
    }

    get nombre() {
        return this.#nombre;
    }

    set nombre(nombre) {
        this.#nombre = nombre;
    }

    calcularImpuesto() {
        return (this.#impuesto.monto - this.#impuesto.deducciones) * 0.21;
    }

}