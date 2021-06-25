const axios = require('axios')
const PICSUMPHOTOS = 'https://picsum.photos/v2/list'

class LoremPicsumServices {
    photos(page) {
        return axios.get(`${PICSUMPHOTOS}?page=${page}&limit=10`).then(r => r.data)
    }
}
module.exports = {
    LoremPicsumServices
}