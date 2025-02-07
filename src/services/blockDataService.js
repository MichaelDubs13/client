import { BACKEND_URL } from "../lib/config";

class BlockDataService {
  async getAll() {
    console.log(BACKEND_URL);
    const result = await fetch(`${BACKEND_URL}/blocks`)
      .then(async response => await response.json());
    return result;
  }

  // get(id) {
  //   const result = fetch(`${BACKEND_URL}/blocks/${id}`)
  //     .then(async response => await response.json());

  //   return result;
  // }

  async getImage(block_id, image_id, plc) {
    const result = await fetch(`${BACKEND_URL}/blocks/${block_id}/images?`+ new URLSearchParams({
      image_id: image_id,
      plc: plc,
    }), {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        headers: {
          'Content-Type': 'image/png'
    }}).then(async response => await response.blob());
      
      return URL.createObjectURL(result);
  }
  
  async getRevisionXML(block_id, xml_id) {
    const result = await fetch(`${BACKEND_URL}/blocks/${block_id}/xml/${xml_id}`, {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        headers: {
        'Content-Type': 'blob'
    }}).then(async response => await response.blob());
      
      return URL.createObjectURL(result);
  }

  async getBlockXML(block, plc) {
    const result = await fetch(`${BACKEND_URL}/blocks/xml?`+ new URLSearchParams({
      block: block,
      plc: plc,
    }), {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        headers: {
        'Content-Type': 'blob'
    }}).then(async response => await response.blob());
      
      return URL.createObjectURL(result);
  }
}

export default new BlockDataService();