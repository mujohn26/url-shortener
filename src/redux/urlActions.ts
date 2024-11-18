import axios from "axios";
import { AppDispatch } from "./store";


const API_URL = "https://urlshortener.smef.io/urls";
const USERNAME = "abat";
const PASSWORD = "5hWDEcFK4FUW";

const getHeaders = () => {
  const credentials = btoa(`${USERNAME}:${PASSWORD}`);
  return {
    "Content-Type": "application/json",
    Authorization: `Basic ${credentials}`,
  };
};

const apiRequest = async (
  method: "GET" | "POST" | "PUT" | "DELETE",
  url: string,
  data?: object
) => {
  try {
    const response = await axios({
      method,
      url,
      headers: getHeaders(),
      data,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const fetchUrlAction = () => async (dispatch: AppDispatch) => {
  dispatch({ type: "FETCH_START" });

  try {
    const response = await apiRequest("GET", API_URL);

    if (response.status === 200 && response.data.length > 0) {
      dispatch({ type: "FETCH_SUCCESS", payload: response.data });
    } else {
      dispatch({ type: "FETCH_ERROR", payload: "No URLs found" });
    }
  } catch (error) {
    dispatch({ type: "FETCH_ERROR", payload: "Error fetching URLs" });
  }
};

export const deleteUrlAction = (id: string) => async (dispatch: AppDispatch) => {
  try {
    const response = await apiRequest("DELETE", `${API_URL}/${id}`);

    if (response.status === 204) {
      dispatch({ type: "DELETE_SUCCESS", payload: id });
    } else {
      dispatch({ type: "DELETE_ERROR", payload: "Failed to delete URL" });
    }
  } catch (error) {
    dispatch({ type: "DELETE_ERROR", payload: "Error deleting URL" });
  }
};

export const createNewUrlAction =
  (id: string, ttlInSeconds: number, webUrl: string) =>
  async (dispatch: AppDispatch) => {
    try {
      const response = await apiRequest("POST", `${API_URL}/${id}`, {
        url: webUrl,
        ttlInSeconds,
      });

      if (response.status === 200) {
        dispatch({ type: "CREATE_URL_SUCCESS", payload: response.data });
      } else {
        dispatch({ type: "CREATE_URL_ERROR", payload: "Failed to create URL" });
      }
    } catch (error) {
      dispatch({ type: "CREATE_URL_ERROR", payload: "Error creating URL" });
    }
  };

export const updateUrlAction =
  (id: string, ttlInSeconds: number, webUrl: string) =>
  async (dispatch: AppDispatch) => {
    try {
      const response = await apiRequest("PUT", `${API_URL}/${id}`, {
        url: webUrl,
        ttlInSeconds,
      });

      if (response.status === 200) {
        dispatch({ type: "UPDATE_URL_SUCCESS", payload: response.data });
      } else {
        dispatch({ type: "UPDATE_URL_ERROR", payload: "Failed to update URL" });
      }
    } catch (error) {
      dispatch({ type: "UPDATE_URL_ERROR", payload: "Error updating URL" });
    }
  };

export const resetUrlCreated = () => ({
  type: "RESET_URL_CREATED",
});
