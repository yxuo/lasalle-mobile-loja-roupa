import axios from "axios";
const token="AIzaSyD5tDIwBiQgiaBivkXIvItfNakgJxvdHbA"
const axiosConfig = {  
  baseURL:"https://rivas-modas-default-rtdb.firebaseio.com",  
  headers: {
    Authorization: `Bearer ${token}`
  }
}; 

export const api = axios.create(axiosConfig);