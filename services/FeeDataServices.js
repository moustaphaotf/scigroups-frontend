import axiosClient from './axios.js';


export default class FeeDataServices {
  static insertFee(data){
    return axiosClient.post(`/fees`, data);
  }

  static updateFee({id, ...data}){
    return axiosClient.put(`/fees/${id}`, data);
  }

  static deleteFee({id, ...data}){
    return axiosClient.delete(`/fees/${id}`, data);
  }
}