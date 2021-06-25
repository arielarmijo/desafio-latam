
const loginForm = document.forms[0];
const postsTable = document.getElementById('jwt-table-posts');

const getToken = async (user, password) => {
    try {
        const response = await fetch('http://localhost:3000/api/login', {
            method: 'POST',
            body: JSON.stringify({ email: user, password: password })
        });
        // Desestructuracion de objetos. Una propiedad se convierte en variable.
        const { token } = await response.json();
        if (token) {
            sessionStorage.setItem('token', token);
            loginForm.classList.toggle('d-none');
        }
        return token;
    } catch (error) {
        console.log(`Error: ${error}`);
    }
};

const getPosts = async (jwt) => {
    try {
        const response = await fetch('http://localhost:3000/api/posts', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        });
        if (response.ok) {
            const { data } = await response.json();
            llenarTabla(data);
            postsTable.classList.toggle('d-none');
            return data;
        } else {
            sessionStorage.clear();
            loginForm.classList.toggle('d-none');
            return null;
        }
        
    } catch (error) {
        sessionStorage.clear();
        console.log(`Error: ${error}`);
    }
};

const llenarTabla = (data) => {
    const bodyTable = document.getElementById('jwt-table-body');
    //console.log(tabla);
    data.forEach(post => {
        const row = document.createElement('tr');
        row.innerHTML = `
        <tr>
            <td>${post.title}</td>
            <td>${post.body}</td>
        </tr>
        `;
        bodyTable.append(row);
    });
};

const init = (async () => {
    const token = sessionStorage.getItem('token');
    if (token) {
        loginForm.classList.toggle('d-none');
        const data = await getPosts(token);        
    }
})();

loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const usuario = event.target.elements.user.value;
    const password = event.target.elements.password.value;
    //console.log(usuario, password);
    const JWT = await getToken(usuario, password);
    //console.log(JWT);
    const data = await getPosts(JWT);
    //console.log(data);
});

