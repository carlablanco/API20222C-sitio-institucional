import axios from "axios";

const baseUrl = 'http://localhost:4000/api/get-professor-experience';
const createExperienceUrl = 'http://localhost:4000/api/create-experience';
const modifyExperienceUrl = 'http://localhost:4000/api/update-experience';
const deleteExperienceUrl = 'http://localhost:4000/api/delete-experience';



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

  
  export const modifyProfessorExperience = async function (data) {
    const response = await axios.post(modifyExperienceUrl, data)
    return response
  };

  export const deleteProfessorExperience = async function (id) {
    const response = await axios.delete(deleteExperienceUrl, {params: {id}});
    return response
  };

