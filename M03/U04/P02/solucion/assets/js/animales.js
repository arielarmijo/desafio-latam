export class Animal {

    constructor(nombre, edad, imagen, comentario, sonido) {
        
        let _nombre = nombre;
        let _edad = edad;
        let _img = imagen;
        let _comentario = comentario;
        let _sonido = sonido;

        this.getNombre = () => _nombre;
        this.getEdad = () => _edad;
        this.getImagen = () => _img;
        this.getComentario = () => _comentario;
        this.getSonido = () => _sonido;

        this.setEdad = (edad) => {
            _edad = edad;
        };
        this.setCometario = (comentario) => {
            _comentario = comentario;
        };

    }

    get nombre() {
        return this.getNombre();
    }

    get edad() {
        return this.getEdad();
    }

    set edad(edad) {
        this.setEdad(edad);
    }

    get imagen() {
        return this.getImagen();
    }

    get comentario() {
        return this.getComentario();
    }

    set comentario(comentario) {
        this.setCometario(comentario);
    }

    get sonido() {
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