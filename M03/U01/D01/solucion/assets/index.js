function Paciente(nombre, rut, edad, diagnostico) {
    
    var _nombre = nombre;
    var _rut = rut;
    var _edad = edad;
    var _diagnostico = diagnostico;

    Object.defineProperty(this, "_getNombre", {
        get: function() {
            return _nombre;
        }
    } );

    Object.defineProperty(this, "_getRut", {
        get: function() {
            return _rut;
        }
    } );

    Object.defineProperty(this, "_getEdad", {
        get: function() {
            return _edad;
        }
    } );

    Object.defineProperty(this, "_getDiagnostico", {
        get: function() {
            return _diagnostico;
        }
    } );

    Object.defineProperty(this, "_setNombre", {
        set: function(nombre) {
            _nombre = nombre;
        }
    } );

    Object.defineProperty(this, "_setRut", {
        set: function(rut) {
            _rut = rut;
        }
    } );

    Object.defineProperty(this, "_setEdad", {
        set: function(edad) {
            _edad = edad;
        }
    } );

    Object.defineProperty(this, "_setDiagnostico", {
        set: function(diagnostico) {
            _diagnostico = diagnostico;
        }
    } );

}

Paciente.prototype.getNombre = function() { return this._getNombre };
Paciente.prototype.getRut = function() { return this._getRut };
Paciente.prototype.getEdad = function() { return this._getEdad };
Paciente.prototype.getDiagnostico = function() { return this._getDiagnostico };

Paciente.prototype.setNombre = function(nombre) { this._setNombre = nombre };
Paciente.prototype.setRut = function(rut) { this._setRut = rut };
Paciente.prototype.setEdad = function(edad) { this._setEdad = edad };
Paciente.prototype.setDiagnostico = function(diagnostico) { this._setDiagnostico = diagnostico };

Paciente.prototype.getDatos = function() {
    return "Nombre: " + this.getNombre() + " " + this.getRut() + ", Edad: " + this.getEdad() + ", Diagnostico: " + this.getDiagnostico();
}

function Consultorio(nombre, pacientes) {
    this.nombre = nombre;
    this.pacientes = pacientes || [];
}

Consultorio.prototype.agregarPaciente = function(paciente) {
    this.pacientes.push(paciente);
}

Consultorio.prototype.mostrarPacientes = function() {
    return this.pacientes;
}

Consultorio.prototype.buscarPorNombre = function(nombre) {
    return this.pacientes.filter(function(paciente) {
        return paciente.getNombre().toLowerCase() == nombre.toLowerCase();
    });
}

var p1 = new Paciente('Pedro', '55.555.555-5', 30, 'Coronavirus');
var p2 = new Paciente('Pedro', '33.333.333-3', 40, 'Influenza');
var p3 = new Paciente('Diego', '22.222.222-2', 35, 'Hipertension');

var consultorio = new Consultorio('Consultorio N° 1', [p1, p2, p3]);

var titulo = document.getElementById('titulo');
titulo.innerText = consultorio.nombre;

consultorio.pacientes.forEach(mostrar);

var btnRegistrar = document.getElementById('registrar');
var btnBuscar = document.getElementById('buscar');

btnRegistrar.addEventListener('click', function(event) {

    event.preventDefault();
    
    var inputNombre = document.getElementById('nombre');
    var inputRut = document.getElementById('rut');
    var inputEdad = document.getElementById('edad');
    var inputDiagnostico = document.getElementById('diagnostico');
    var nombre = inputNombre.value;
    var rut = inputRut.value;
    var edad = inputEdad.value;
    var diagnostico = inputDiagnostico.value;
    if (nombre && rut && edad && diagnostico) {
        document.getElementById('pacientes').innerHTML = '';
        var paciente = new Paciente(nombre, rut, edad, diagnostico);
        consultorio.agregarPaciente(paciente);
        consultorio.pacientes.forEach(mostrar);
        inputNombre.value = '';
        inputRut.value = '';
        inputEdad.value = '';
        inputDiagnostico.value = '';
    } else {
        alert('Llene todos los campos');
    }
    
});

btnBuscar.addEventListener('click', function(event) {

    event.preventDefault();
    document.getElementById('pacientes').innerHTML = '';

    var inputNombre = document.getElementById('nombre-buscado');
    var nombre = inputNombre.value;
    
    if (nombre) {
        consultorio.buscarPorNombre(nombre).forEach(mostrar);
    } else {
        consultorio.mostrarPacientes().forEach(mostrar);
    }

    inputNombre.value = '';

});

function mostrar(paciente) {

    var tdNombre = document.createElement('td');
    var tdRut = document.createElement('td');
    var tdEdad = document.createElement('td');
    var tdDiagnostico = document.createElement('td');
    var tr = document.createElement('tr');
    var tbody = document.getElementById('pacientes');

    tdNombre.innerText = paciente.getNombre();
    tdRut.innerText = paciente.getRut();
    tdEdad.innerText = paciente.getEdad();
    tdDiagnostico.innerText = paciente.getDiagnostico();

    tr.appendChild(tdNombre);
    tr.appendChild(tdRut);
    tr.appendChild(tdEdad);
    tr.appendChild(tdDiagnostico);
    tbody.appendChild(tr);

}
