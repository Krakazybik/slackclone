import axios from "axios"

export const API_PATH = "/api/v1"
export const API_HOST = "http://srv.evgeraskin.ru:5000"

export interface IChannel {
  id: number
  name: string
  removable: boolean
}

export interface IMessage {
  id: number
  channelId: number
  name: string
  message: string
}

export interface IChannelsResponse {
  channels: Array<IChannel>
  messages: Array<IMessage>
  currentChannelId: number
}

export interface ILoginData {
  username: string
  token: string
}

const axiosInstance = axios.create({
  baseURL: `http://srv.evgeraskin.ru:5000${API_PATH}`,
  headers: { "content-type": "application/json", Accept: "application/json" },
})

const SlackAPI = {
  setJwtToken(jwtToken: string): void {
    axiosInstance.defaults.headers.common.Authorization = `Bearer ${jwtToken}`
  },
  async login(username: string, password: string): Promise<ILoginData> {
    const response = await axiosInstance.post("/login", {
      username,
      password,
    })
    return response.data
  },
  async getProfile() {
    const response = await axiosInstance.get("/profile")
    return response.data
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
