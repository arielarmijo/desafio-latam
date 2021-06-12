
let obtener20Albums = async () => {

    const url = 'https://jsonplaceholder.typicode.com/photos';

    try {
        const response = await fetch(url);
        const albums = await response.json();
        // albums.forEach((element, index) => {
        //     if (index < 20) {
        //         console.log(albums[index]);
        //     } else {
        //         return;
        //     }
        // });
        return albums.slice(0, 20);
    } catch (error) {
        console.log(error);
    }

}

let enviarInformacion = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('Información enviada.');
        }, 3000);
    });
}

let obtenerInformacion = async () => {
    const response = await enviarInformacion();
    const albums = await obtener20Albums();
    console.log(response);
    console.log(albums);
};

obtenerInformacion();

//obtener20Albums().then(albums => {console.log(albums);});
//enviarInformacion().then(response => {console.log(response);});