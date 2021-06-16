export class Animal {

    constructor(nombre, edad, img, comentario, sonido) {
        
        let _nombre = nombre;
        let _edad = edad;
        let _img = img;
        let _comentario = comentario;
        let _sonido = sonido;

        this.getNombre = () => _nombre;
        this.getEdad = () => _edad;
        this.getImg = () => _img;
        this.getComentario = () => _comentario;
        this.getSonido = () => _sonido;

        this.setCometario = (comentario) => {
            _comentario = comentario;
        };

    }

    get Nombre() {
        return this.getNombre();
    }

    get Edad() {
        return this.getEdad();
    }

    get Img() {
        return this.getImg();
    }

    get Comentario() {
        return this.getComentario();
    }

    set Comentario(comentario) {
        this.setCometario(comentario);
    }

    get Sonido() {
        return this.getSonido();
    }

}

export class Leon extends Animal {

    rugir() {

    }

}

export class Lobo extends Animal {

    aullar() {
        
    }

}

export class Oso extends Animal {

    grunir() {
        
    }

}

export class Serpiente extends Animal {

    sisear() {
        
    }

}

export class Aguila extends Animal {

    chillar() {
        
    }

}