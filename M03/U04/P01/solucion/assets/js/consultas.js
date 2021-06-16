let personajes = (() => {
    const url = 'http://localhost:5500/dbz.json';
    const getData = async () => {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    };

    return { getData };
})();

export default personajes;