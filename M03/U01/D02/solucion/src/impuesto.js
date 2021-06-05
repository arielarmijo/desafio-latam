export class Impuesto {

    #monto = 0;
    #deducciones = 0;

    constructor(monto, deducciones) {
        this.#monto = monto;
        this.#deducciones = deducciones;
    }

    get monto() {
        return this.#monto;
    }

    set monto(monto) {
        this.#monto = monto;
    }

    get deducciones() {
        return this.#deducciones;
    }

    set deducciones(deducciones) {
        this.#deducciones = deducciones;
    }

}