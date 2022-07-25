import axios from 'axios';

const axiosClient = axios.create({
  baseURL: "https://scientificgroups.herokuapp.com/api/v1",
  headers: {
    "Content-Type": 'application/json',
    Accept: 'application/json',
  }}
); 

export default axiosClient;