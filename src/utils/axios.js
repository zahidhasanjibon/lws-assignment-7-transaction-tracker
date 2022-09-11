import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://lws-assignment-7-transactiont.herokuapp.com",
});

export default axiosInstance;
