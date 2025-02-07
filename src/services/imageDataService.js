import { BACKEND_URL } from "../lib/config";

class ImageDataService {

  async get(id) {
    const result = await fetch(`${BACKEND_URL}/images/${id}`, {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'image/jpeg'
    }}).then(async response => await response.blob());

    return [URL.createObjectURL(result), null];
  }
}

export default new ImageDataService();