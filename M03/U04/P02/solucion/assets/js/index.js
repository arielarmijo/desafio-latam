import { Animal, Leon, Lobo, Oso, Serpiente, Aguila } from './animales.js';

let animalDB = (() => {

    const url = './animales.json';
    const getData = async () => {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    };

    return { getData };

})();

let animales, nombre, edad, imagen, comentario, sonido;
let animalesInvestigados = [];

animalDB.getData().then(data => {
    animales = data.animales;
    console.log(animales);
});

document.getElementById('animal').addEventListener('change', (event) => {
    nombre = event.target.value;
    imagen = animales.find(item => item.name == nombre).imagen;
    sonido = animales.find(item => item.name == nombre).sonido;
    document.getElementById('preview').style.backgroundImage = `url("./assets/imgs/${imagen}")`;
});

document.getElementById('edad').addEventListener('change', (event) => {
    edad = event.target.value;
});

document.getElementById('comentarios').addEventListener('change', (event) => {
    comentario = event.target.value;
});

document.getElementById('btnRegistrar').addEventListener('click', (event) => {

    if (nombre && edad && imagen && comentario && sonido) {
        let animal;
        switch (nombre) {
            case 'Leon':
                animal = new Leon(nombre, edad, imagen, comentario, sonido);
                break;
            case 'Lobo':
                animal = new Lobo(nombre, edad, imagen, comentario, sonido);
                break;
            case 'Oso':
                animal = new Oso(nombre, edad, imagen, comentario, sonido);
                break;
            case 'Serpiente':
                animal = new Serpiente(nombre, edad, imagen, comentario, sonido);
                break;
            case 'Aguila':
                animal = new Aguila(nombre, edad, imagen, comentario, sonido);
                break;
            default:
                animal = new Animal(nombre, edad, imagen, comentario, sonido);
                break;
        }
        console.log(animal);
        animalesInvestigados.push(animal);
        reloadTable();
    } else {
        Swal.fire({
            title: 'Error',
            text: 'Completar todos los datos',
            icon: 'error'
        });
    }

});

const reloadTable = () => {
    let animalesInvestigadosTemplate = '';
    animalesInvestigados.forEach((a, i) => {
        animalesInvestigadosTemplate += `
        <div class="px-3 pb-2 animal" data-fighter="">
          <div class="card bg-dark text-white">
              <img src="assets/imgs/${a.getImg()}" class="card-img" alt="${a.getImg()}" onclick="abrirModal(${i})"/>
              <div class="card-footer">
                <img src="assets/imgs/audio.svg" onclick="reproducir(${i})"/>
              </div>
          </div>
        </div>
        `;
    });
    document.getElementById('Animales').innerHTML = animalesInvestigadosTemplate;
};

window.reproducir = (i) => {
    console.log('play', i);
}

window.abrirModal = (i) => {
    console.log('modal', i);
}
