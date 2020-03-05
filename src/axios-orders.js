import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://react-burger-builder-e0a8f.firebaseio.com"
});

export default axiosInstance;
