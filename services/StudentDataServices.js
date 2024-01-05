import axiosClient from './axios.js';


export default class StudentDataServices {
  static getAllStudents(groupId = ''){
    return (groupId === '' 
      ? axiosClient.get(`/students`) 
      : axiosClient.get(`/groups/${groupId}/students`)
    );
  }

  static updateStudent({id, ...data}){
    return axiosClient.put(`/students/${id}`, data);
  }
  
  static insertStudent(data){
    return axiosClient.post(`/students/`, data);
  }

  static deleteStudent(id){
    return axiosClient.delete(`/students/${id}`);
  }
}