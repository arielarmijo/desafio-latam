export const http = (() => {

    const makeRequest = async (url, options = {method: 'GET'}) => {
        try {
            const response = await fetch(url, options);
            //console.log(response);
            if (response.ok) {
                const { data } = await response.json();
                //console.log(data);
                return data;
            } else {
                throw new Error(`${response.status}: ${response.statusText}`);
            }

        } catch (error) {
            console.log(error);
        }
    };

    const getToken = async (url, user) => {

        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify({ email: user.email, password: user.password })
        });
        const data = await response.json();

        //console.log(response);
        //console.log(data);

        if (response.ok) {
            return data.token;
        } else {
            throw new Error(data.message);
        }

    };

    return {
        makeRequest,
        getToken
    };

})();