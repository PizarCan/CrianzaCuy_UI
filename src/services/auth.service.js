import axios from "axios";
import jwt_decode from "jwt-decode";

const API_URL = "http://192.168.0.13:9000/api/v1/users/";

const register = (dni, nombres, apellidos, password, confirm_password) => {
  console.log(dni);
  return axios.post(API_URL, {
    dni,
    nombres,
    apellidos,
    password,
    confirm_password
  })
  .then((response) => {
    console.log(response);
    return response.data;
  })
  .catch(function (error) {
    /*console.log(error.response.data);
    console.log(error.response.status);
    console.log(error.response.headers);
    console.log(error.response.data.errors);*/
    
    return error.response.data; 
  }); 
};

const login = (dni, password) => {
  return axios
    .post(API_URL + "login", {
      dni,
      password,
    })
    .then((response) => {
      if (response.data.token) {
        console.log(response);
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

const isTokenExpired = (token) => {
  const decodedToken = jwt_decode(token);
  const currentDate = new Date();

  if (decodedToken.exp < currentDate.getTime() / 1000){
    logout();
    return false;
  }

  return true;
}

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

export default {
  register,
  login,
  logout,
  isTokenExpired,
  getCurrentUser,
};