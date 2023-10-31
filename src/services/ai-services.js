import axios from '../utils/axios';

async function generateOutline(data) {
  return axios({
    url: '/generate_outline',
    method: 'post',
    data,
  });
}

async function writing(data) {
  return axios({
    url: '/writing',
    method: 'post',
    data,
  });
}

async function regenerateContentH2(data) {
  return axios({
    url: '/generate_content_h2s',
    method: 'post',
    data,
  });
}

async function getState(hashId) {
  return axios({
    url: `get_state/${hashId}`,
    method: 'get',
  });
}

export default {
  generateOutline,
  writing,
  regenerateContentH2,
  getState,
};
