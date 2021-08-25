import axios from "axios"

export interface IChannel {
  id: number
  name: string
  removable: boolean
}

export interface IChannelsResponse {
  channels: Array<IChannel>
  messages: Array<string>
  currentChannelId: number
}

const axiosInstance = axios.create({
  baseURL: "http://evgeraskin.ru:8080/api/v1",
  headers: { "content-type": "application/json", Accept: "application/json" },
})

const SlackAPI = {
  setJwtToken(jwtToken: string): void {
    axiosInstance.defaults.headers.common.Authorization = `Bearer ${jwtToken}`
  },
  async login(username: string, password: string) {
    let token
    try {
      const response = await axiosInstance.post("/login", {
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
  async getChannels(): Promise<IChannelsResponse> {
    const response = await axiosInstance.get("/data")
    const channelsData: IChannelsResponse = response.data
    // eslint-disable-next-line @typescript-eslint/no-throw-literal
    if (channelsData.channels === undefined) throw { error: "Error" }
    return channelsData
  },
}
export default SlackAPI
