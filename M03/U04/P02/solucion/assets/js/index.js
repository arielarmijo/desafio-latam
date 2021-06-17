import { AnimalFactory } from './animal-factory.js';

const animalDB = (() => {

    const url = './animales.json';
    const getData = async () => {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    };

    return { getData };

})();

let animal, animales, edad, comentario;
let animalesInvestigados = [];

animalDB.getData().then(data => {
    animales = data.animales.map((a, i) => AnimalFactory[i](a.name, a.imagen, a.sonido));
    console.log(animales);
});

document.getElementById('animal').addEventListener('change', (event) => {
    console.log(event.target.value);
    animal = animales[event.target.value];
    document.getElementById('preview').style.backgroundImage = `url("./assets/imgs/${animal.imagen}")`;
});

document.getElementById('edad').addEventListener('change', (event) => {
    edad = event.target.value;
});

document.getElementById('comentarios').addEventListener('keyup', (event) => {
    comentario = event.target.value;
});

document.getElementById('btnRegistrar').addEventListener('click', (event) => {

    if (validarCampos()) {
        animal.edad = edad;
        animal.comentario = comentario;
        animalesInvestigados.push(animal);
        reloadTable();
        limpiarRegistro();
    } else {
        Swal.fire({
            title: 'Error',
            text: 'Completar todos los datos',
            icon: 'error'
        });
    }

});

const validarCampos = () => {
    const isValid = edad && comentario;
    return isValid;
}

const reloadTable = () => {
    let animalesInvestigadosTemplate = '';
    animalesInvestigados.forEach((a, i) => {
        animalesInvestigadosTemplate += `
        <div class="px-3 pb-2 animal" data-fighter="">
          <div class="card bg-dark text-white">
              <img src="assets/imgs/${a.imagen}" class="card-img" alt="${a.imagen}" onclick="abrirModal(${i})"/>
              <div class="card-footer">
                <img src="assets/imgs/audio.svg" onclick="reproducir(${i})"/>
              </div>
          </div>
        </div>
        `;
    });
    document.getElementById('Animales').innerHTML = animalesInvestigadosTemplate;
};

const limpiarRegistro = () => {
    edad = undefined;
    comentario = undefined;
    document.getElementById('animal').selectedIndex = 0;
    document.getElementById('edad').selectedIndex = 0;
    document.getElementById('comentarios').value = '';
    document.getElementById('preview').style.backgroundImage = `url("./assets/imgs/lion.svg")`;
};

window.reproducir = (i) => {
    console.log('play', i);
    let player = document.getElementById('player');
    let sound = animalesInvestigados[i].getSonido();
    player.src = `assets/sounds/${sound}`;
    player.play();
}

const modal = new bootstrap.Modal(document.getElementById('animalModal'), {
    keyboard: true,
    backdrop: true,
    focus: true
})

window.abrirModal = (i) => {
    console.log('modal', i);
    const modalBody = document.getElementById('modalBody');
    const animal = animalesInvestigados[i];
    const modalTemplate = `
        <img src="assets/imgs/${animal.imagen}" class="card-img-top" alt="${animal.imagen}">
        <div class="text-white">
            <h5 class="text-center mt-3">${animal.edad}</h5>
            <p class=""><b>Comentario:</b> ${animal.comentario}</p>
        </div>
    `;
    modalBody.innerHTML = modalTemplate;
    modal.show();
}
