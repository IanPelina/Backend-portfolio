import axios from "axios";

export default axios.create({
  baseURL: {
    DEVELOPMENT: "http://localhost:3001/api",
    PRODUCTION: "/api"
  }[process.env.REACT_APP_ENV]
});