import axios from "axios";

const baseUrl = 'http://localhost:4000/api/create-class'

export interface CreateClassPayload {
    professor: string,
    name: string,
    duration: string,
    frequency: FrequencyEnum,
    type: TypeEnum,
    cost: number,
}

export type FrequencyEnum = 'unica' | 'semanal' | 'mensual';
export type TypeEnum = 'grupal' | 'individual';



export const addClass = async function (data) {
    const response = await axios.post(baseUrl, data)
    return response
  };