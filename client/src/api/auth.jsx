import axios from "axios";
const API_BASE_URL = "http://localhost:5000";

export const signup = async (user) => {
  try {
    const { data } = await axios.post(`${API_BASE_URL}/api/auth/signup`, user);
    return data;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      // If the server provides a specific error message, use it
      throw new Error(error.response.data.message);
    } else {
      // Otherwise, use a generic error message
      throw new Error("An error occurred during call api");
    }
  }
};
export const signin = async (user) => {
  try {
    const { data } = await axios.post(`${API_BASE_URL}/api/auth/signin`, user);
    return data;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      // If the server provides a specific error message, use it
      throw new Error(error.response.data.message);
    } else {
      // Otherwise, use a generic error message
      throw new Error("An error occurred during call api");
    }
  }
};

export const authGoogle = async (user) => {
  try {
    const { data } = await axios.post(`${API_BASE_URL}/api/auth/google`, user);
    return data;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      // If the server provides a specific error message, use it
      throw new Error(error.response.data.message);
    } else {
      // Otherwise, use a generic error message
      throw new Error("An error occurred during call api");
    }
  }
};
