export const http = (() => {
    
    const makeRequest = async (url, options = {}) => {
        try {
            const response = await fetch(url);
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
    
    return {
        makeRequest
    };
    
})();