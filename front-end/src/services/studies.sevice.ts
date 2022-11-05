import axios from "axios";

const baseUrl = 'http://localhost:4000/api/get-student-studies';
const createExperienceUrl = 'http://localhost:4000/api/create-studies';
const modifyExperienceUrl = 'http://localhost:4000/api/update-studies';
const deleteExperienceUrl = 'http://localhost:4000/api/delete-studies';


export const getStudentStudies = async function (data) {
    const response = await axios.post(baseUrl, data)
    return response
  };

  export const createStudentStudies = async function (data) {
    const response = await axios.post(createExperienceUrl, data)
    return response
  };

  
  export const modifyStudentStudies = async function (data) {
    const response = await axios.post(modifyExperienceUrl, data)
    return response
  };

  export const deleteStudentStudies = async function (id) {
    const response = await axios.delete(deleteExperienceUrl, {params: {id}});
    return response
  };

