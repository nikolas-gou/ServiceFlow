export default function apiCall(host, endpoint = '/', reqMethod = 'get', data = {}, options = {}) {
  /**
   * Default reqData
   */
  var reqData = {
    method: reqMethod,
    headers: {
      Accept: 'application/json',
    },
    mode: 'cors',
  };

  // Προσθήκη Content-Type μόνο αν δεν είναι FormData
  if (!(data instanceof FormData)) {
    reqData.headers['Content-Type'] = 'application/json';
  }

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
    if (data instanceof FormData) {
      reqData['body'] = data;
    } else {
      if (reqMethod === 'POST') reqData['body'] = JSON.stringify(data);
      if (reqMethod === 'PATCH') reqData['body'] = JSON.stringify(data);
      if (reqMethod === 'PUT') reqData['body'] = JSON.stringify(data);
      if (reqMethod === 'DELETE') reqData['body'] = JSON.stringify(data);
    }
  } else {
    reqData['body'] = data;
  }

  return fetch(`${host}${endpoint}`, reqData)
    .then(async (response) => {
      if (response.ok) {
        return response.json();
      }
      // Error case - Robust parsing για mixed HTML+JSON responses
      const responseText = await response.text();

      // Προσπάθεια να εξάγουμε JSON από το response (ακόμα κι αν έχει HTML warnings)
      const jsonMatch = responseText.match(/\{.*\}/s);
      if (jsonMatch) {
        try {
          const errorData = JSON.parse(jsonMatch[0]);
          if (errorData.message) {
            // Βρήκαμε το message από το backend!
            throw new Error(errorData.message);
          }
        } catch (jsonParseError) {
          // Αν το JSON.parse αποτύχει (malformed JSON)
          if (jsonParseError instanceof SyntaxError) {
            // Malformed JSON - συνεχίζουμε στο fallback
          } else {
            // Αν είναι το Error που κάναμε throw εμείς, το ξαναπετάμε
            throw jsonParseError;
          }
        }
      }

      // Fallback: Generic error με status code
      throw new Error(`Σφάλμα διακομιστή (Status: ${response.status})`);
    })
    .catch((error) => {
      // Re-throw το error για να το χειριστεί το calling code
      throw error;
    });
}

/**
 * Έλεγχος αν το response έχει το αναμενόμενο format
 * @param {Object} response - Το response από το backend
 * @returns {Boolean} - True αν το response έχει το αναμενόμενο format, false αν δεν έχει
 */
export const isValidFormat = (response) => {
  // Έλεγχος αν το response έχει το αναμενόμενο format
  if (!response || typeof response !== 'object') {
    console.error('Unexpected response format:', response);
    return false;
  }
  return true;
};
