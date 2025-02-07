import { BACKEND_URL } from "../lib/config";

class ProjectDataService {
  getAll() {
    const result = fetch(`${BACKEND_URL}/projects`)

    return result;
  }

  get(id) {
    const result = fetch(`${BACKEND_URL}/projects/${id}`)
      .then(async response => await response.json());

    return result;
  }

  create(data) {
    const result = fetch(`${BACKEND_URL}/projects`, {
      method: "POST",
      body:data
    })

    return result;
  }

  update(id, data) {
    const result = fetch(`${BACKEND_URL}/projects/${id}`, {
      method: "PUT",
      body:data
    })

    return result;
  }

  delete(id) {
    const result = fetch(`${BACKEND_URL}/projects/${id}`, {
      method: "DELETE",
    })

    return result;
  }

  deleteAll() {
    const result = fetch(`${BACKEND_URL}/projects`, {
      method: "DELETE"
    })

    return result;
  }
}

export default new ProjectDataService();