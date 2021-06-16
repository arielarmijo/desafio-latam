import Personajes from './consultas.js';

document.getElementById('buttonImages').addEventListener('click', async () => {
    const { personajes } = await Personajes.getData();
    //console.log(personajes);
    const pj = document.getElementById('nombre').value;

    const imgPjTemplate = personajes
        .find(p => p.name == pj)
        .imagenes.map(i => `<img src="/assets/imgs/${pj}/${i}" width="200"/>`)
        .join('');

    document.getElementsByClassName('personajes')[0].innerHTML = imgPjTemplate;

    document.querySelectorAll('.personajes img').forEach(i => {
        i.addEventListener('click', (e) => {
            $('#imagenesModal').modal('toggle');
            const imgSrc = e.target.src;
            document.getElementById('preview').style.backgroundImage = `url(${imgSrc})`;
        })
    });

});