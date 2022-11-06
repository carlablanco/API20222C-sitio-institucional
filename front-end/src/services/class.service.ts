import axios from "axios";

const baseUrl = 'http://localhost:4000/api/create-class'
const filterUrl = 'http://localhost:4000/api/filter-class'

export interface CreateClassPayload {
    professor: string,
    name: string,
    duration: string,
    frequency: FrequencyEnum,
    type: TypeEnum,
    cost: number,
}

export interface FilterClassPayload {
    name?: string,
    type?: TypeEnum,
    frequency?: FrequencyEnum,
    rating?: number,
    status?: string
}

export type FrequencyEnum = 'unica' | 'semanal' | 'mensual';
export type TypeEnum = 'grupal' | 'individual';



export const addClass = async function (data) {
    const response = await axios.post(baseUrl, data)
    return response
  };

export const filterClass = async (data) => {
    const response = await axios.post(filterUrl, data);
    return response
}