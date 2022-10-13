import axios from "axios";

const baseUrl = 'http://localhost:4000/api/register'

export const register = async function (data) {
    const response = await axios.post(baseUrl, data)
    return response
  };