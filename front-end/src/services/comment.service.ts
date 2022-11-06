import axios from "axios";

const baseUrl = 'http://localhost:4000/api/post-comment'
const blockCommentUrl = 'http://localhost:4000/api/block-comment'


export interface UploadCommentRequest {
    id_student: number,
    id_class: number
    content: string,
    stars: number
}

export interface DeleteCommentRequest {
    id: number,
    mail: string,
    message: string,
}


export const uploadComment = async function (data: UploadCommentRequest) {
    const response = await axios.post(baseUrl, data)
    return response
  };

  
export const deleteComment = async function (data: DeleteCommentRequest) {
    const response = await axios.post(blockCommentUrl, data)
    return response
  };
