import axiosClient from './axios.js';


export default class GroupDataServices {
  static insertGroup(data){
    return axiosClient.post(`/groups`, data);
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

  static getGroupsByUser(id, sort="name.asc"){
    return axiosClient.get(`/users/${id}/groups?sort=${sort}`);
  }
}