const loginForm = document.getElementById('login-form');
const feed = document.getElementById('feed');
const photos = document.getElementById('photos');
const logout = document.getElementById('logout');
const more = document.getElementById('more');

loginForm.addEventListener('submit', async (event) => {

    event.preventDefault();

    const email = event.target.elements.email.value;
    const password = event.target.elements.password.value;
    console.log(email, password);

    const token = await getToken(email, password);
    console.log(token);

    const data = await getPhotos(token);
    fillFeed(data);

});

more.addEventListener('click', async () => {
    const jwt = sessionStorage.getItem('token');
    const data = await getPhotos(jwt, incrementPage());
    fillFeed(data);
});

logout.addEventListener('click', () => {
    sessionStorage.clear();
    loginForm.classList.toggle('d-none');
    feed.classList.toggle('d-none');
    photos.innerHTML = '';
});

const getToken = async (email, password) => {
    try {
        const response = await fetch('http://localhost:3000/api/login', {
            method: 'POST',
            body: JSON.stringify({ email: email, password: password })
        });
        // Desestructuracion de objetos. Una propiedad se convierte en variable.
        const { token } = await response.json();
        if (token) {
            sessionStorage.setItem('token', token);
            loginForm.classList.toggle('d-none');
            feed.classList.toggle('d-none');
        }
        return token;
    } catch (error) {
        console.log(`Error: ${error}`);
    }
};

const getPhotos = async (jwt, page = 1) => {
    try {
        const response = await fetch(`http://localhost:3000/api/photos?page=${page}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        });
        if (response.ok) {
            const { data } = await response.json();
            console.log(data);
            return data;
        } else {
            sessionStorage.clear();
            return null;
        }
    } catch (error) {
        sessionStorage.clear();
        console.log(`Error: ${error}`);
    }
};

const fillFeed = (data) => {
    data.forEach(item => {
        const card = document.createElement('div');
        card.classList.add('col', 'mb-2');
        card.innerHTML = `
        <div class="card">
            <img src="${item.download_url}" class="card-img" alt="${item.author}">
            <div class="card-footer text-muted">
            Autor: <span>${item.author}</span>
            </div>
        </div>
        `;
        photos.appendChild(card);
    });
};

const incrementPage = (() => {
    let i = 1;
    return () => ++i;
})();

const init = (async () => {
    const token = sessionStorage.getItem('token');
    if (token) {
        loginForm.classList.toggle('d-none');
        const data = await getPhotos(token);   
        fillFeed(data);
        feed.classList.toggle('d-none');
    }
})();