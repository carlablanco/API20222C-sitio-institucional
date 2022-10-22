import axios from "axios";

const baseUrl = 'http://localhost:4000/api/register'

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