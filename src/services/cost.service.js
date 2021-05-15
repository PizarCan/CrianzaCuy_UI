import axios from "axios";
//import authHeader from "./auth-header";

const API_URL = "http://192.168.0.13:9000/api/v1/costs/";

const register = (dni, nombres, apellidos, password, confirm_password) => {
  return axios.post(API_URL + "/", {
    dni,
    nombres,
    apellidos,
    password,
    confirm_password,
  });
};

const insertUpdateCost = (jsonData) => {
  console.log(jsonData);   
  return axios
    .post( API_URL , {
      jsonData
    })
    .then((response) => {
        return response.data;
    })
    .catch(function (error) {
        console.log(error);
    });  
};

const showDetailCost = (dni, tipo) => {
    
    return axios
      .get( `${API_URL}id/${dni}/${tipo}` , {
      })
      .then((response) => {
          return response.data;
      })
      .catch(function (error) {
          console.log(error);
      });  
};

const showFixedCost = (dni) => {

    return axios
      .get( `${API_URL}id/${dni}` , {
      })
      .then((response) => {
          return response.data;
      })
      .catch(function (error) {
          console.log(error);
      });  
};

export default {
  register,
  insertUpdateCost,
  showDetailCost,
  showFixedCost,
};