export default function apiCall(
  host,
  endpoint = "/",
  reqMethod = "get",
  data = {},
  options = {}
) {
  /**
   * Default reqData
   */
  var reqData = {
    method: reqMethod,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };

  /**
   * Fill in additional headers
   */
  if ("headers" in options) {
    reqData.headers = { ...reqData.headers, ...options.headers };
  }

  reqData = { ...reqData, ...options };

  /**
   * Merge reqdata with options
   */
  if (Object.keys(options).length === 0) {
    if (reqMethod === "POST") reqData["body"] = JSON.stringify(data);
    if (reqMethod === "PATCH") reqData["body"] = JSON.stringify(data);
    if (reqMethod === "PUT") reqData["body"] = JSON.stringify(data);
    if (reqMethod === "DELETE") reqData["body"] = JSON.stringify(data);
  } else {
    reqData["body"] = data;
  }

  const res = fetch(`${host}${endpoint}`, reqData)
    .then((response) => {
      if (response.status === 403) {
        window.alert("UNATHORIZED");
        window.location.replace(`/unathorized`);
      }
      return response.json();
    })
    .then((res) => res)
    .catch((error) => {
      return error;
    });
  return res;
}
