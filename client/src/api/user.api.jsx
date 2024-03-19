import axios from "axios";
const API_BASE_URL = "http://localhost:5000";

export const updateUser = async (user) => {
  try {
    const { data } = await axios.put(
      `${API_BASE_URL}/api/user/update/${user.userId}`,
      user,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

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
