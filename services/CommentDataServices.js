import axiosClient from './axios.js';

export default class CommentDataServices{
  static insertComment(data){
    return axiosClient.post('/comments', data);
  }

  static updateComment({id, ...data}){
    return axiosClient.put(`/comments/${id}`, data);
  }

  static deleteComment({id, ...data}){
    return axiosClient.delete(`/comments/${id}`);
  }
}