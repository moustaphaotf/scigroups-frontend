import axiosClient from './axios.js';


export default class FeeDataServices {
  static insertFee({groupId, studentId, ...data}){
    return axiosClient.post(`groups/${groupId}/students/${studentId}/fees`, data);
  }

  static getAllFees(groupId, studentId){
    return axiosClient.get(`/groups/${groupId}/students/${studentId}/fees`);
  }

  static updateFee({id, ...data}){
    return axiosClient.put(`/fees/${id}`, data);
  }

  static deleteFee(id){
    return axiosClient.delete(`/fees/${id}`);
  }
}