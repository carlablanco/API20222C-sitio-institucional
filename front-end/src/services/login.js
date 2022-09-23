import axios from "axios";

const baseUrl = 'http://localhost:4000/api/login'

const login = async credentials => {
    // implementar try
    const { data } = await axios.post(baseUrl, credentials)
    return data
    // guardar de una en el session storage en vez de return data
}

export default { login }