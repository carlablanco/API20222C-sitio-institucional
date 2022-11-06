import axios from "axios";

const baseUrl = 'http://localhost:4000/api/post-comment'
const blockCommentUrl = 'http://localhost:4000/api/block-commnent'


export interface UploadCommentRequest {
    id_student: number,
    id_class: number
    content: string,
    stars: number
}


export const uploadComment = async function (data: UploadCommentRequest) {
    const response = await axios.post(baseUrl, data)
    return response
  };
