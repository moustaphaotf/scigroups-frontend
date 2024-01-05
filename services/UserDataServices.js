import axiosClient from './axios.js';

export default class UserDataServices{
  static insertUser(data){
    return axiosClient.post('/users', data);
  }

  static getUser(id){
    return axiosClient.get(`/users/${id}`);
  }

  static updateUser({id, ...data}){
    return axiosClient.put(`/users/${id}`, data);
  }
  
  static deleteUser(id){
    return axiosClient.delete(`/users/${id}`);
  }
}