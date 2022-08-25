import axiosClient from './axios.js';


export default class StudentDataServices {
  static getAllStudents(groupId){
    return axiosClient.get(`/groups/${groupId}/students`);
  }

  static getStudentById(id){
    return axiosClient.get(`/groups/${id}`);
  }

  static updateStudent({id, ...data}){
    return axiosClient.put(`/students/${id}`, data);
  }
  
  static insertStudent({groupId, ...data}){
    return axiosClient.post(`/groups/${groupId}/students/`, data);
  }

  static deleteStudent(id){
    return axiosClient.delete(`/students/${id}`);
  }
}