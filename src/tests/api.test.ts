import { setupServer } from 'msw/node';
import { rest, RestRequest } from 'msw';

import SlackAPI, { API_PATH } from '../api/slack';

const profileData = {
  id: 1,
  name: 'admin',
  status: "Hello, i'm here!",
  data: {
    country: 'Russia',
    phone: '+78887776655',
    email: 'admin@admin.ru',
    twitter: '@admin',
  },
};

const loginData = {
  username: 'admin',
  token: 'asdasd2133123ui1!i*&!#$@!$uigzddad26fki',
};

const server = setupServer(
  rest.get(`*${API_PATH}/profile`, (request, res, context) =>
    res(context.json(profileData))
  ),
  rest.post(
    `*${API_PATH}/login`,
    (
      request: RestRequest<{ username: string; password: string }>,
      res,
      context
    ) => {
      if (request.body.password !== 'admin') return res(context.status(401));
      return res(context.json(loginData));
    }
  )
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('API testing', () => {
  test('/profiles should return profile data.', async () => {
    const profile = await SlackAPI.getProfile();
    expect(JSON.stringify(profile)).toBe(JSON.stringify(profileData));
  });
  test('/login should return login data.', async () => {
    const login = await SlackAPI.login('admin', 'admin');
    expect(JSON.stringify(login)).toBe(JSON.stringify(loginData));
  });
  test('/login wrong password should return 401', async () => {
    try {
      await SlackAPI.login('admin', 'root');
    } catch (error) {
      expect(error).toStrictEqual(
        new Error('Request failed with status code 401')
      );
    }
  });
});
