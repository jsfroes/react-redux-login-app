// Authentication service

import axios from "axios";
import config from "../config/config"

const AUTH_URL = config.AUTH_URL

const register = (username, email, password, roles) => {
  return axios.post(AUTH_URL + "signup", {
    username,
    email,
    password,
    roles,
  });
};

const login = (username, password) => {
  return axios
    .post(AUTH_URL + "signin", {
      username,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

const siteAccess = {
  register,
  login,
  logout,
};

export default siteAccess;
