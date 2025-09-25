import axios, { AxiosInstance } from "axios";

/**
 * Creates a base Axios instance with sensible defaults.
 *
 * @param baseURL - Optional base URL for the API
 * @param timeout - Optional request timeout (ms), default 30s
 */
export const createAxiosInstance = (
  baseURL?: string,
  timeout: number = 30000
): AxiosInstance => {
  return axios.create({
    baseURL,
    timeout,
    headers: {
      "Content-Type": "application/json",
    },
  });
};
