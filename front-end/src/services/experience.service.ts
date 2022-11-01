import axios from "axios";

const baseUrl = 'http://localhost:4000/api/get-professor-experience'
const createExperienceUrl = 'http://localhost:4000/api/create-experience'

export type FrequencyEnum = 'unica' | 'semanal' | 'mensual';
export type TypeEnum = 'grupal' | 'individual';



export const getProfessorExperience = async function (data) {
    const response = await axios.post(baseUrl, data)
    return response
  };

  export const createProfessorExperience = async function (data) {
    const response = await axios.post(createExperienceUrl, data)
    return response
  };
