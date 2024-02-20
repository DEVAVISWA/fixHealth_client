import axios from "axios";

const intance = axios.create({
  baseURL: "http://127.0.0.1:3000/api", //change  to actual url in production
});

export default intance;
