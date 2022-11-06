import axios from "axios";

const baseUrl = 'http://localhost:4000/api/register'
const resetPasswordUrl = 'http://localhost:4000/api/reset-password'


export interface RegisterPayload {
  name: string,
  surname: string,
  email: string,
  password: string,
  phone?: string,
  type: UserTypeEnum
}

export type UserTypeEnum = 'student' | 'professor';

export const register = async function (data) {
    const response = await axios.post(baseUrl, data)
    return response
  };

  export const resetPassword = async (data) => {
    const response = await axios.post(resetPasswordUrl, data)
    return response
  }