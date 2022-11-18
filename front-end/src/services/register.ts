import axios from "axios";

const baseUrl = 'http://localhost:4000/api/register'
const resetPasswordUrl = 'http://localhost:4000/api/reset-password'
const changePasswordUrl = 'http://localhost:4000/api/change-password'



  export interface RegisterPayload {
    name: string,
    surname: string,
    email: string,
    password: string,
    phone?: string,
    type: UserTypeEnum
  }

  export interface ChangePasswordPayload {
    newPassword: string,
    token?: string,
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

  export const changePassword = async (data: ChangePasswordPayload) => {
    const response = await axios.post(changePasswordUrl, data);
    return response
  }