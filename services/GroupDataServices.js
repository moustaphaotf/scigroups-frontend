import axiosClient from './axios.js';


export default class GroupDataServices {
  static insertGroup(data){
    return axiosClient.post(`/groups`, data);
  }
  
  static getAllGroups(){
    return axiosClient.get(`/groups`);
  }

  static getGroupById(id){
    return axiosClient.get(`/groups/${id}`);
  }

  static updateGroup({id, ...data}){
    return axiosClient.put(`/groups/${id}`, data);
  }

  static deleteGroup(id){
    return axiosClient.delete(`/groups/${id}`);
  }
}