import chickenList from '../fixtures';

const BASE_URL = 'https://your-endpoint';

// Mock data
const fetch = (_url, _options) => Promise.resolve(chickenList);

class ApiUtil {
  static get() {
    const url = BASE_URL;
    const options = {
      method: 'GET',
      headers: {},
    };

    return fetch(url, options);
  }
}

export default ApiUtil;
