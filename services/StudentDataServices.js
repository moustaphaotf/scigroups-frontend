import axiosClient from './axios.js';


export default class StudentDataServices {
  static getAllStudents(){
    return axiosClient.get(`/groups`);
  }

  static getStudentById(id){
    return axiosClient.get(`/groups/${id}`);
  }

  static updateStudent(id, data){
    return axiosClient.put(`/students/${id}`, data);
  }
  
  static insertStudent(data){
    return axiosClient.post(`/groups/${id}/students/`, data);
  }

  static deleteStudent(id){
    return axiosClient.delete(`/students/${id}`);
  }
}