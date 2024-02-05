import axios from "axios";

export default axios.create({
  baseURL: "https://danielalordelloadv.cyclic.app",
  timout: 10000,
  headers: { "Content-Type": "application/json" },
});
