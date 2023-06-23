import axios from "axios";

const backendService = axios.create({
  baseURL: "http://localhost:8000/",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
  //   withCredentials: true,
});

const apiService = {
  // API CALL HERE
  async postLogin(user) {
    try {
      console.log("service here", user);
      const res = await backendService.post("/login", user);
      return res;
    } catch (error) {
      console.log(error);
      return error;
    }
  },

  async getDashboard() {
    try {
      const res = await backendService.get("dashboard");
      console.log(res);
    } catch (error) {
      console.log(error);
      return error;
    }
  },
};

export default apiService;
