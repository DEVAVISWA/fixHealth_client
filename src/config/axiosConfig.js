import axios from "axios";

const intance = axios.create({
  baseURL: "https://fixhealth-server-ld2v.onrender.com/api", //change  to actual url in production
});

export default intance;
