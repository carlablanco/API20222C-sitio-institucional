import axios from "axios";

const baseUrl = 'http://localhost:4000/api/create-class'
const filterUrl = 'http://localhost:4000/api/filter-class'
const updateUrl = 'http://localhost:4000/api/update-class'
const deleteUrl = 'http://localhost:4000/api/delete-class'



export interface CreateClassPayload {
    professor: string,
    name: string,
    duration: string,
    frequency: FrequencyEnum,
    type: TypeEnum,
    cost: number,
}

export interface UpdateClassPayload {
    id: number,
    name?: string,
    duration?: string,
    frequency?: FrequencyEnum,
    type?: TypeEnum,
    cost?: number,
    status?: StateEnum
}

export interface FilterClassPayload {
    name?: string,
    type?: TypeEnum,
    frequency?: FrequencyEnum,
    rating?: number,
    status?: string,
    professor?: number,
}

export type FrequencyEnum = 'unica' | 'semanal' | 'mensual';
export type TypeEnum = 'grupal' | 'individual';
export type StateEnum = 'Publicada' | 'No publicada';




export const addClass = async function (data) {
    const response = await axios.post(baseUrl, data)
    return response
  };

export const filterClass = async (data = null) => {
    const response = await axios.post(filterUrl, data);
    return response
}

export const updateClass = async(data: UpdateClassPayload) => {
    const response = await axios.post(updateUrl, data);
    return response
}

export const deleteClass = async(id) => {
    const response = await axios.delete(deleteUrl, {params: {id}});
    return response
}