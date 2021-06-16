const baseUrl = 'https://api.github.com/users';

const request = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

const getUser = async (user) => {
    const url = `${baseUrl}/${user}`;
    return request(url);
};

const getRepos = async (user, page, perPage) => {
    const url = `${baseUrl}/${user}/repos?page=${page}&per_page=${perPage}`;
    return request(url);
}

const form = document.forms[0];

form.addEventListener('submit', (event) => {

    event.preventDefault();

    const user = form.elements.nombre.value;
    const page = form.elements.pagina.value || 1;
    const perPage = form.elements.repoPagina.value || 15;

    Promise.all([getUser(user), getRepos(user, page, perPage)])
        .then(data => {
            console.log(data);
            if (data[0].message === 'Not Found') {
                usuario.innerHTML = '';
                repositorios.innerHTML = '';
                Swal.fire({
                    title: 'Error',
                    text: 'Usuario no encontrado',
                    icon: 'error'
                });
            } else {
                usuario.innerHTML = '';
                repositorios.innerHTML = '';
                makeUserCard(data[0]);
                makeReposCard(data[1]);
            }  
        });

});

const makeReposCard = (data) => {

    const card = document.createElement('div');
    card.classList.add('card');

    const title = document.createElement('h4');
    title.classList.add('card-title');
    title.innerText = 'Repositorios';

    const body = document.createElement('div');
    body.classList.add('card-body');

    body.append(title);

    data.forEach(element => {
        body.append(makeCardLink(element.svn_url, element.name));
    });
    
    card.append(body);

    repositorios.append(card);

};

const makeUserCard = (data) => {

    usuario.innerHTML = `
    <div class="card">
        <div class="card-body">
            <h4 class="card-title">Datos Usuario</h4>
            <img class="card-img" src="${data.avatar_url}">
            <p class="card-text">Nombre de Usuario: ${data.name}</p>
            <p class="card-text">Nombre de Login: ${data.login}</p>
            <p class="card-text">Repositorios: ${data.public_repos}</p>
            <p class="card-text">Localidad: ${data.location}</p>
            <p class="card-text">Tipo usuario: ${data.type}</p>
        </div>
    </div>`;

};

const makeCardLink = (url, text) => {
    const link = document.createElement('a');
    link.classList.add('card-text');
    link.href = url;
    link.innerText = text;
    return link;
}
