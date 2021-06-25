import { http } from './http.js';
import { chart } from './chart.js';


// Constantes
const homeLink = document.getElementById('home');
const chileLink = document.getElementById('chile');
const loginLink = document.getElementById('login');
const logoutLink = document.getElementById('logout');
const loginError = document.getElementById('loginError');
const loginModal = new bootstrap.Modal(document.getElementById('loginModal'));
const loginForm = document.getElementById('loginForm');
const loading = document.getElementById('loading');
const chileChartContainer = document.getElementById('chileChartContainer');
const worldChartContainer = document.getElementById('worldChartContainer');
const worldTable = document.getElementById('worldTable');
const worldChart = chart.makeBarChart('worldChart', {}, {
    plugins: {
        legend: {
            display: true,
            position: 'top'
        },
        title: {
         display: true,
         font: { size: 26 },
         text: `Casos Covid19 en países con más de 10.000 casos activos`
     }
    }
});
const chileChart = chart.makeLineChart('chileChart', {}, {
    plugins: {
        legend: {
            display: true,
            position: 'top'
        },
        title: {
         display: true,
         font: { size: 26 },
         text: `Casos Covid19 en Chile`
     }
    }
});


// Funciones
const iniciarSesion = () => {
    loginLink.classList.toggle('d-none');
    logoutLink.classList.toggle('d-none');
    chileLink.classList.toggle('d-none');
};

const cerrarSesion = () => {
    hideElement(logoutLink);
    hideElement(chileLink);
    showElement(loginLink);
    sessionStorage.clear();
    loginModal.show();
    mostrarSituacionMundial();
};

const llenarTabla = (data) => {
    const body = document.getElementById('data');
    data.forEach(i => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${i.location}</td>
            <td>${i.confirmed}</td>
            <td>${i.active}</td>
            <td>${i.recovered}</td>
            <td>${i.deaths}</td>
            <td><button class="btn btn-sm btn-primary" onclick="mostrarModalPais('${i.location}')">Ver más</button></td>
        `;
        body.appendChild(row);
    });
};

window.mostrarModalPais = async (pais) => {

    const countryModal = new bootstrap.Modal(document.getElementById('countryDetailModal'));
    countryModal._dialog.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title"> Casos Coronavirus para ${pais}</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div id="modalBody" class="modal-body">
                <div id="countryChartloading" class="text-center fa-4x">
                    <i class="fas fa-spinner fa-spin"></i>
                </div>
                <div id="countryChartContainer" class="d-none">
                    <canvas id="countryChart" width="200" height="200"></canvas>
                </div>
            </div>
        </div>
    `;
    countryModal.show();
    
    const country = await http.makeRequest(`http://localhost:3000/api/countries/${pais}`);
    
    const data = {
        labels: Object.keys(country).splice(1),
        datasets: [
            {
                label: `${country.location}`,
                data: Object.values(country).splice(1),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)'
                ],
                borderWidth: 1
            }
        ]
    };
    const options =  {
        plugins: {
            legend: {
                display: false,
                position: 'top'
            },
            title: {
             display: false,
             font: { size: 26 },
             text: `Casos Covid19 en ${pais}`
         }
        }
    };

    chart.makeBarChart('countryChart', data, options);

    const countryChartLoading  = document.getElementById('countryChartloading');
    const countryChartContainer = document.getElementById('countryChartContainer');
    hideElement(countryChartLoading);
    showElement(countryChartContainer);
    
    console.log(pais);
    console.log(country);
};

const showElement = (element) => {
    if (element.classList.contains('d-none')) {
        element.classList.remove('d-none');
    }
};

const hideElement = (element) => {
    if (!element.classList.contains('d-none')) {
        element.classList.add('d-none');
    }
}; 

const mostrarSituacionMundial = async () => {

    showElement(loading);
    hideElement(chileChartContainer);
    hideElement(worldChartContainer);
    hideElement(worldTable);

    const paises = await http.makeRequest('http://localhost:3000/api/total');
    const paisesGraves = paises.filter(c => c.active >= 10000);
    const data = {
        labels: paisesGraves.map(c => c.location),
        datasets: [
            {
                label: 'Activos',
                data: paisesGraves.map(i => i.active),
                backgroundColor: ['rgba(87, 226, 229, 0.9)'],
                borderColor: ['rgba(87, 226, 229, 1)'],
                borderWidth: 1
            },
            {
                label: 'Confirmados',
                data: paisesGraves.map(i => i.confirmed),
                backgroundColor: ['rgba(106, 127, 219, 0.9)'],
                borderColor: ['rgba(106, 127, 219, 1)'],
                borderWidth: 1
            },
            {
                label: 'Muertes',
                data: paisesGraves.map(i => i.deaths),
                backgroundColor: ['rgba(244, 141, 172, 0.9)'],
                borderColor: ['rgba(244, 141, 172, 1)'],
                borderWidth: 1
            },
            {
                label: 'Recuperados',
                data: paisesGraves.map(i => i.rec),
                backgroundColor: ['rgba(69, 203, 133, 0.9)'],
                borderColor: ['rgba(69, 203, 133, 1)'],
                borderWidth: 1
            }
        ]
    };

    chart.updateChart(worldChart, data);
    llenarTabla(paises);

    hideElement(loading);
    showElement(worldChartContainer);
    showElement(worldTable);

    console.log(paises);

};

const mostrarSituacionChile = () => {

    showElement(loading);
    hideElement(chileChartContainer);
    hideElement(worldChartContainer);
    hideElement(worldTable);

    const requestOptions = {
        method: 'GET',
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('token')}`
            }
    };
    const confirmed = http.makeRequest('http://localhost:3000/api/confirmed', requestOptions);
    const deaths = http.makeRequest('http://localhost:3000/api/deaths', requestOptions);
    const recovered = http.makeRequest('http://localhost:3000/api/recovered', requestOptions);

    Promise.all([confirmed, deaths, recovered]).then(data => {
        console.log(data);
        const chartData = {
            labels: data[0].map(item => item.date),
            datasets: [
                {
                    label: 'Confirmados',
                    data: data[0].map(item => item.total),
                    fill: false,
                    borderColor: 'rgb(75, 192, 192)',
                    tension: 0.1
                },
                {
                    label: 'Muertos',
                    data: data[1].map(item => item.total),
                    fill: false,
                    borderColor: 'rgb(244, 141, 172)', 
                    tension: 0.1
                },
                {
                    label: 'Recuperados',
                    data: data[2].map(item => item.total),
                    fill: false,
                    borderColor: 'rgb(69, 203, 133)',
                    tension: 0.1
                }
               
            ]
        };
    
        chart.updateChart(chileChart, chartData);
        hideElement(loading);
        showElement(chileChartContainer);

    }).catch(error => {
        console.log(error);
        hideElement(loading);
    });

};

const init = (async () => {
    if (sessionStorage.getItem('token')) {
        iniciarSesion();
    }
    mostrarSituacionMundial();
})();


// Eventos
loginLink.addEventListener('click', (event) => {
    loginModal.show();
});

logoutLink.addEventListener('click', cerrarSesion);

loginForm.addEventListener('submit', (event) => {

    event.preventDefault();

    const user = {
        email: event.target.elements.email.value,
        password: event.target.elements.password.value
    };

    console.log(user);

    http.getToken(`http://localhost:3000/api/login`, user)
        .then(token => {
            console.log(token);
            sessionStorage.setItem('token', token);
            iniciarSesion();
            loginModal.hide();
            if (!loginError.classList.contains('d-none')) {
                loginError.classList.add('d-none');
            }
        })
        .catch(error => {
            loginError.innerText = error.message;
            loginError.classList.toggle('d-none');
        });
    
});

chileLink.addEventListener('click', mostrarSituacionChile);

homeLink.addEventListener('click', mostrarSituacionMundial);