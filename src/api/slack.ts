import axios from 'axios';

const REACT_APP_API_HOST =
  process.env.REACT_APP_API_HOST || 'http://localhost:5000';

export interface IMessage {
  id: number;
  userName: string;
  message: string;
  createdAt: string;
}

export interface IChannel {
  id: number;
  name: string;
  removable: boolean;
}

export interface IChannelsResponse {
  channels: Array<IChannel>;
}

export interface ILoginData {
  username: string;
  token: string;
}

const axiosInstance = axios.create({
  baseURL: REACT_APP_API_HOST,
  headers: { 'content-type': 'application/json', Accept: 'application/json' },
});

const SlackAPI = {
  setJwtToken(jwtToken: string): void {
    axiosInstance.defaults.headers.common.Authorization = `Bearer ${jwtToken}`;
  },
  async login(email: string, password: string): Promise<ILoginData> {
    const response = await axiosInstance.post('/auth/login', {
      email,
      password,
    });
    return response.data;
  },

  async getChannels(): Promise<IChannelsResponse> {
    const response = await axiosInstance.get('/channels');
    const channelsData: IChannelsResponse = response.data;
    // eslint-disable-next-line @typescript-eslint/no-throw-literal
    if (channelsData.channels === undefined) throw { error: 'Error' };
    return channelsData;
  },

  async regUser(email: string, password: string): Promise<ILoginData> {
    const response = await axiosInstance.post('/auth/registration', {
      email,
      password,
    });
    return response.data;
  },

  async getMessages(channelId: number): Promise<Array<IMessage>> {
    const response = await axiosInstance.get(`/messages/${channelId}`);
    return response.data;
  },
};
export default SlackAPI;
