import { BACKEND_URL } from "../lib/config";

class EecDataService {
  async createJob(formData) {
    const result = fetch(`${BACKEND_URL}/eec/jobs`, {
      method: "POST",
      body: formData
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
  getEecJobHistory() {
    const result = fetch(`${BACKEND_URL}/eec/jobs/history`)
    .then(async response => {
      if(!response.ok){
        throw new Error(response.status);
      } 
      else{
        return await response.json()
      } 
      
    })

    return result;
  }
  
 
}

export default new EecDataService();