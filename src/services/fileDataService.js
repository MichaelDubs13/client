import { BACKEND_URL } from "../lib/config";

class FileDataService {
  get(filePath) {
    var id = encodeURIComponent(filePath)
    const result = fetch(`${BACKEND_URL}/files/${id}`, {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'blob'
      }})
    .then(response => {
      const fileName = response.headers.get('Access-Control-Expose-Headers');
      response.blob().then(blob => {
          let url = window.URL.createObjectURL(blob);
          let a = document.createElement('a');
          a.href = url;
          a.download = `${fileName}`;
          a.click();
      })});

    return result;
  }

  getAssets(filePath) {
    var id = encodeURIComponent(filePath)
    const result = fetch(`${BACKEND_URL}/files/assets/${id}`, {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'blob'
      }})
    .then(response => {
      const fileName = response.headers.get('Access-Control-Expose-Headers');
      response.blob().then(blob => {
          let url = window.URL.createObjectURL(blob);
          let a = document.createElement('a');
          a.href = url;
          a.download = `${fileName}`;
          a.click();
      })});

    return result;
  }

  getHmiSettings(id) {
    const result = fetch(`${BACKEND_URL}/files/hmi/settings/${id}`, {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'blob'
      }})
    .then(response => {
      const fileName = response.headers.get('Access-Control-Expose-Headers');

      response.blob().then(blob => {
          let url = window.URL.createObjectURL(blob);
          let a = document.createElement('a');
          a.href = url;
          a.download = `${fileName}`;
          a.click();
      })});

    return result;
  }

  getGsd(id) {
    const result = fetch(`${BACKEND_URL}/files/gsd/xml/${id}`, {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'blob'
      }})
    .then(response => {
      response.blob().then(blob => {
          let url = window.URL.createObjectURL(blob);
          let a = document.createElement('a');
          a.href = url;
          a.download = `${id}`;
          a.click();
      })});

    return result;
  }

  uploadHmiSettings(data) {
    const result = fetch(`${BACKEND_URL}/files/hmi/settings`, {
      method: "POST",
      body:data
    }).then(async response => {
      if(!response.ok){
        throw new Error(response.status);
      } 
      else{
        return await response.json()
      }
    })

    return result;
  }

  uploadManual(id, data) {
    
    console.log(data);
    const result = fetch(`${BACKEND_URL}/files/gsd/${id}/upload`, {
      method: "POST",
      body:data
    })

    return result;
  }
  async getGsdImage(name) {
    const result = await fetch(`${BACKEND_URL}/files/gsd/images?`+ new URLSearchParams({
      name: name,
    }), {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        headers: {
          'Content-Type': 'image/png'
    }}).then(async response => await response.blob());
      
      return URL.createObjectURL(result);
  }

  getGuide(id) {
    const result = fetch(`${BACKEND_URL}/files/guide/${id}`, {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'blob'
      }})
    .then(response => {
      response.blob().then(blob => {
          let url = window.URL.createObjectURL(blob);
          let a = document.createElement('a');
          a.href = url;
          a.download = `${id}`;
          a.click();
      })});

    return result;
  }

  getStaticAnalyzer(id) {
    const result = fetch(`${BACKEND_URL}/files/static-analyzer/${id}`, {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'blob'
      }})
    .then(response => response.blob());
      // {
      //response.blob().then(blob => {
      //     // let url = window.URL.createObjectURL(blob);
      //     // let a = document.createElement('a');
      //     // a.href = url;
      //     // a.download = `${id}`;
      //     // a.click();
      // })});
      return result;
  }
}

export default new FileDataService();