import { AUTH_URL } from "../lib/config";


const http = {
  async get(endpoint) {
    const result = await fetch(`${AUTH_URL}/${endpoint}`, {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      withCredentials: true,
      headers: {
          "Content-type": "application/json"
        }
    })
    return result;
  },

  async put(endpoint, data) {
    const result = await fetch(`${AUTH_URL}/${endpoint}`, {
      withCredentials: true,
      method: "POST",
      body:data
    })
    return result;
  }
}

export default http;


