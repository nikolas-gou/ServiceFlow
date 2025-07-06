export default function apiCall(host, endpoint = '/', reqMethod = 'get', data = {}, options = {}) {
  /**
   * Default reqData
   */
  var reqData = {
    method: reqMethod,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    mode: 'cors',
  };

  /**
   * Fill in additional headers
   */
  if ('headers' in options) {
    reqData.headers = { ...reqData.headers, ...options.headers };
  }

  reqData = { ...reqData, ...options };

  /**
   * Merge reqdata with options
   */
  if (Object.keys(options).length === 0) {
    if (reqMethod === 'POST') reqData['body'] = JSON.stringify(data);
    if (reqMethod === 'PATCH') reqData['body'] = JSON.stringify(data);
    if (reqMethod === 'PUT') reqData['body'] = JSON.stringify(data);
    if (reqMethod === 'DELETE') reqData['body'] = JSON.stringify(data);
  } else {
    reqData['body'] = data;
  }

  return fetch(`${host}${endpoint}`, reqData)
    .then(async (response) => {
      if (!response.ok) {
        if (response.status === 403) {
          window.alert('UNAUTHORIZED');
          window.location.replace(`/unauthorized`);
          throw new Error('Unauthorized');
        }
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }
      return response.json();
    })
    .catch((error) => {
      console.error('API call error:', error);
      throw error;
    });
}
