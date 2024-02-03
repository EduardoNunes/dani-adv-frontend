import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:3001",
  timout: 10000,
  headers: { "Content-Type": "application/json" },
});
