import Axios from 'axios';
import { setupCache } from 'axios-cache-interceptor';

const api = Axios.create({});

export const axios = setupCache(api, {
  ttl: 15 * 60 * 1000,
});
