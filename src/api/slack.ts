import axios from "axios"

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
  baseURL: "http://srv.evgeraskin.ru:5000/api/v1",
  headers: { "content-type": "application/json", Accept: "application/json" },
})

const SlackAPI = {
  setJwtToken(jwtToken: string): void {
    axiosInstance.defaults.headers.common.Authorization = `Bearer ${jwtToken}`
  },
  async login(username: string, password: string): Promise<ILoginData> {
    let loginData
    try {
      const response = await axiosInstance.post("/login", {
        username,
        password,
      })
      loginData = response.data
    } catch (err) {
      console.log(err)
      throw err
    }
    return loginData
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
