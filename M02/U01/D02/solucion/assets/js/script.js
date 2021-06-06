const rondasInput = document.getElementById('rondas');
let rondas = rondasInput.value;

rondasInput.addEventListener('change', function(event) {
    rondas = event.target.value;
})

const manos = ['papel', 'piedra', 'tijera'];
const botones = [];

manos.forEach(mano => botones.push(document.getElementById(mano)));
botones.forEach((boton, i) => {
    boton.addEventListener('click', function(event) {
        jugar(manos[i]);
    });
});

const humano = document.getElementById('humano');
const maquina = document.getElementById('maquina');

function jugar(jugadaHumano) {

    rondasInput.disabled = true;

    humano.src = `./assets/img/${jugadaHumano}.png`;
    humano.classList.add('show');

    let jugadaMaquina = manos[Math.floor(Math.random() * manos.length)]
    maquina.src = `./assets/img/${jugadaMaquina}.png`;
    maquina.classList.add('show');

    setTimeout(()=>{
        
        if (jugadaHumano === jugadaMaquina) {
            empatar();
            return;
        }
    
        if (jugadaHumano === 'papel') {
            if (jugadaMaquina === 'piedra') {
                ganarHumano();
                return;
            }
            if (jugadaMaquina === 'tijera') {
                ganarMaquina();
                return;
            }
        }
    
        if (jugadaHumano === 'piedra') {
            if (jugadaMaquina === 'tijera') {
                ganarHumano();
                return;
            }
            if (jugadaMaquina === 'papel') {
                ganarMaquina();
                return;
            }
        }
    
        if (jugadaHumano === 'tijera') {
            if (jugadaMaquina === 'papel') {
                ganarHumano();
                return;
            }
            if (jugadaMaquina === 'piedra') {
                ganarMaquina();
                return;
            }
        }

    }, 250);

}

const marcadorHumano = document.getElementById('pjeHumano');
const marcadorMaquina = document.getElementById('pjeMaquina');

let pjeHumano = 0;
let pjeMaquina = 0;

function ganarHumano() {
    console.log('Humano gana');
    maquina.classList.remove('show');
    marcadorHumano.innerText = ++pjeHumano;
    actualizarRondas();
}

function ganarMaquina() {
    console.log('Maquina gana');
    humano.classList.remove('show');
    marcadorMaquina.innerText = ++pjeMaquina;
    actualizarRondas();
}

function empatar() {
    console.log('empate');
}

function actualizarRondas() {
    console.log(pjeHumano == rondas);
    if (pjeHumano == rondas || pjeMaquina == rondas) {
        finalizarJuego();
    }
}


function finalizarJuego() {

    botones.forEach(boton => {
        boton.disabled = true;
    });

    const mensaje = document.getElementById('resultado');
    mensaje.innerText = (pjeHumano > pjeMaquina) ? '!Humano gana!' : '!Máquina gana!';

    const myModal = new bootstrap.Modal(document.getElementById('myModal'));
    myModal.show();

    document.getElementById('venganza').addEventListener('click', function(event) {
        pjeHumano = 0;
        pjeMaquina = 0;
        rondasInput.disabled = false;
        marcadorHumano.innerText = 0;
        marcadorMaquina.innerText = 0;
        botones.forEach(boton => {
            boton.disabled = false;
        });
        myModal.hide();
    });

}