import { BACKEND_URL } from "../lib/config";

class JobDataService {
  getAll() {
    const result = fetch(`${BACKEND_URL}/jobs`)

    return result;
  }

  get(id) {
    const result = fetch(`${BACKEND_URL}/jobs/${id}`)
      .then(async response => await response.json());

    return result;
  }

  getCodeGenHistory() {
    const result = fetch(`${BACKEND_URL}/jobs/history/codegen`)
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

  getPtpHistory() {
    const result = fetch(`${BACKEND_URL}/jobs/history/ptp`)
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

  create(data) {
    const result = fetch(`${BACKEND_URL}/jobs`, {
      method: "POST",
      body:data
    })

    return result;
  }

  update(id, data) {
    const result = fetch(`${BACKEND_URL}/jobs/${id}`, {
      method: "PUT",
      body:data
    })

    return result;
  }

  delete(id) {
    const result = fetch(`${BACKEND_URL}/jobs/${id}`, {
      method: "DELETE",
    })

    return result;
  }

  deleteAll() {
    const result = fetch(`${BACKEND_URL}/jobs`, {
      method: "DELETE"
    })

    return result;
  }
}

export default new JobDataService();