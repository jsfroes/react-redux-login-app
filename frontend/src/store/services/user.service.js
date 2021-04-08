// Access Data service
import axios from "axios";
import authHeader from "./auth-header";
import config from "../config/config"

console.log(config.test)
const TEST_URL = config.TEST_URL;

const getPublicContent = () => {
  return axios.get(TEST_URL + "all");
};

const getInfluencerBoard = () => {
  return axios.get(TEST_URL + "influencer", { headers: authHeader() });
};

const getStaffBoard = () => {
  return axios.get(TEST_URL + "staff", { headers: authHeader() });
};

const getAdminBoard = () => {
  return axios.get(TEST_URL + "admin", { headers: authHeader() });
};

export default {
    getPublicContent,
    getInfluencerBoard,
    getStaffBoard,
    getAdminBoard,
  };
