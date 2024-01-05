import axiosClient from './axios.js';

export default class AdminDataServices{
  static insertAdmin(data){
    return axiosClient.post('/groupadmins', data);
  }

  static deleteAdmin({id, ...data}){
    return axiosClient.delete(`/groupadmins/${id}`, data);
  }
}