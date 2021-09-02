import axios from 'axios';

export const API_PATH = '';
export const API_HOST = 'localhost:5000';

export interface IMessage {
  userId: number;
  name: string;
  message: string;
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
  baseURL: `http://localhost:5000`,
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
  async getProfile() {
    const response = await axiosInstance.get('/profile');
    return response.data;
  },

  async getChannels(): Promise<IChannelsResponse> {
    const response = await axiosInstance.get('/channels');
    const channelsData: IChannelsResponse = response.data;
    // eslint-disable-next-line @typescript-eslint/no-throw-literal
    if (channelsData.channels === undefined) throw { error: 'Error' };
    return channelsData;
  },
};
export default SlackAPI;
