import { http } from './http.js';
import { chart } from './chart.js';


const data = await http.makeRequest('http://localhost:3000/api/total');
const paisesGraves = data.filter(c => c.active >= 10000).slice(0, 20);

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
            <td><button class="btn btn-primary" onclick="mostrarModal('${i.location}')">Ver más</button></td>
        `;
        body.appendChild(row);
    });
};

window.mostrarModal = async (pais) => {
    console.log(pais);
    const country = await http.makeRequest(`http://localhost:3000/api/countries/${pais}`);
    console.log(country);
    const myModal = new bootstrap.Modal(document.getElementById('countryDetail'));
    myModal._dialog.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title"> Casos Coronavirus para ${country.location}</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <canvas id="countryChart" width="200" height="200"></canvas>
            </div>
        </div>
    `;

    chart.barChart('countryChart',
        {
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
        },
        {
            options: {
                responsive: true,
                
                plugins: {
                    legend: {
                        display: false,
                    },
                    title: {
                        display: false,
                        font: { size: 26 },
                        text: `Casos Covid19 para ${pais}`
                    }
                }
            }
        }
    );

    myModal.show();
};

llenarTabla(data);

chart.barChart('countriesChart',
    {
        labels: paisesGraves.map(c => c.location),
        datasets: [
            {
                label: 'Activos',
                data: paisesGraves.map(i => i.active),
                backgroundColor: ['rgba(106, 127, 219, 0.9)'],
                borderColor: ['rgba(106, 127, 219, 1)'],
                borderWidth: 1
            },
            {
                label: 'Confirmados',
                data: paisesGraves.map(i => i.confirmed),
                backgroundColor: ['rgba(87, 226, 229, 0.9)'],
                borderColor: ['rgba(87, 226, 229, 1)'],
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
    },
    {
        options: {
            responsive: false,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    font: { size: 26 },
                    text: 'Países con más de 10.000 casos activos de Covid19'
                }
            }
        }
    }
);
