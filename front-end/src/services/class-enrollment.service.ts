import axios from "axios";

const baseUrl = 'http://localhost:4000/api/request-class'
const findRequestURL = 'http://localhost:4000/api/get-class-requests'
const updateUrl = 'http://localhost:4000/api/update-class-requests'



export interface EnrollClassPayload {
    id_student: number,
    id_class: number
    status: 'Solicitada',
    timeslot: string,
    message: string
}


export const enrollClass = async function (data: EnrollClassPayload) {
    const response = await axios.post(baseUrl, data)
    return response
  };

export const findEnrollments = async function name(idStudent:number) {
    let url = findRequestURL + '?id_student=' + idStudent
    const response = await axios.get(url);
    return response
  }
export const updateEnrollment = async function name(data: any) {
    const response = await axios.post(updateUrl, data);
    return response
  }
