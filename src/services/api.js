import axios from 'axios';
import config from '../config';

const api = axios.create({
  baseURL: config.api.baseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

export default {
  getUsers() {
    return api.get(config.api.endpoints.users);
  },
  getUser(id) {
    return api.get(`${config.api.endpoints.users}/${id}`);
  },
  deleteUser(id) {
    return api.delete(`${config.api.endpoints.users}/${id}`);
  },
  login(userData) {
    return api.post(config.api.endpoints.login, userData);
  },
  signUpUser(userData) {
    return api.post(config.api.endpoints.signup, userData);
  },

  // Student API functions
  studentsData() {
    return api.get(config.api.endpoints.students);
  },
  getStudentById(id) {
    return api.get(`${config.api.endpoints.students}/${id}`);
  },
  addstudentData(data) {
    return api.post(config.api.endpoints.students, data);
  },
  editStudentsData(id, data) {
    return api.put(`${config.api.endpoints.students}/${id}`, data);
  },
  deleteStudentsData(id) {
    return api.delete(`${config.api.endpoints.students}/${id}`);
  },
};
