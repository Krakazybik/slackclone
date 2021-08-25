import axios from "axios"

const axiosInstance = axios.create({
  baseURL: "http://192.168.3.2:5000",
  headers: { "content-type": "application/json", Accept: "application/json" },
})
const LoginAPI = {
  async login(username: string, password: string) {
    let token
    try {
      const response = await axiosInstance.post("/api/v1/login", {
        username,
        password,
      })
      token = response.data.token
    } catch (err) {
      console.log(err)
      throw err
    }
    return token
  },
}
export default LoginAPI
