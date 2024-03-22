import axios from "axios";
const API_BASE_URL = "http://localhost:5000";

export const createComment = async (commentData) => {
  console.log(commentData);
  try {
    const { data } = await axios.post(
      `${API_BASE_URL}/api/comment/create`,
      commentData,
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
export const getComments = async (postId) => {
  try {
    const { data } = await axios.get(
      `${API_BASE_URL}/api/comment/getPostComments/${postId}`,
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

export const likeComment = async (commentId) => {
  try {
    const { data } = await axios.put(
      `${API_BASE_URL}/api/comment/likeComment/${commentId}`,
      {},
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
export const editComment = async (dataComment) => {
  try {
    const { data } = await axios.put(
      `${API_BASE_URL}/api/comment/editComment/${dataComment.commentId}`,
      dataComment,
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
