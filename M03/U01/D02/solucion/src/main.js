import { Cliente } from './cliente.js';
import { Impuesto } from './impuesto.js';

const impuesto = new Impuesto(1100000, 100000);
const cliente = new Cliente('Ariel', impuesto);

console.log(cliente.calcularImpuesto());

document.getElementById('nombre').innerText = cliente.nombre;
document.getElementById('impuesto').innerText = cliente.calcularImpuesto();