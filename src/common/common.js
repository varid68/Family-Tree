import qs from 'qs'

const queryString = (params) => {
  return qs.parse(params, {
    ignoreQueryPrefix: true
  });
};

export { queryString }
