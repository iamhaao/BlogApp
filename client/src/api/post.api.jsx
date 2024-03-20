import axios from "axios";
const API_BASE_URL = "http://localhost:5000";

export const createPost = async (postData) => {
  console.log(postData);
  try {
    const { data } = await axios.post(`${API_BASE_URL}/api/post`, postData, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

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
export const getPosts = async (userId, startIndex, postId) => {
  try {
    const { data } = await axios.get(
      `${API_BASE_URL}/api/post/getPosts?userId=${userId}&startIndex=${startIndex}&postId=${postId}`,
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

export const deletePost = async (postData) => {
  try {
    const { data } = await axios.delete(
      `${API_BASE_URL}/api/post/deletePost/${postData.postId}/${postData.userId}`,
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

export const updatePost = async (postData) => {
  try {
    const { data } = await axios.put(
      `${API_BASE_URL}/api/post/updatePost/${postData.postId}/${postData.userId}`,
      postData,
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
