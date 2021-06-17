import { Leon, Lobo, Oso, Serpiente, Aguila } from './animales.js';

export const AnimalFactory = [
    (nombre, imagen, sonido) => new Leon(nombre, undefined, imagen, undefined, sonido), 
    (nombre, imagen, sonido) => new Lobo(nombre, undefined, imagen, undefined, sonido), 
    (nombre, imagen, sonido) => new Oso(nombre, undefined, imagen, undefined, sonido), 
    (nombre, imagen, sonido) => new Serpiente(nombre, undefined, imagen, undefined, sonido), 
    (nombre, imagen, sonido) => new Aguila(nombre, undefined, imagen, undefined, sonido), 
];