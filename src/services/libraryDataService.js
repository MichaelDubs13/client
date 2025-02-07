import { BACKEND_URL } from "../lib/config";

class LibraryDataService {
  async getUnreleasedChanges() {
    console.log(BACKEND_URL);
    const result = await fetch(`${BACKEND_URL}/library/unreleased/changes`)
      .then(async response => await response.json());
    return result;
  }

  async getUnreleasedRevs() {
    console.log(BACKEND_URL);
    const result = await fetch(`${BACKEND_URL}/library/unreleased/revisions`)
      .then(async response => await response.json());
    return result;
  }

  async getReleasedLibs() {
    console.log(BACKEND_URL);
    const result = await fetch(`${BACKEND_URL}/library/released/`)
      .then(async response => await response.json());
    return result;
  }

  async getReleasedLibRevs(id) {
    console.log(BACKEND_URL);
    const result = await fetch(`${BACKEND_URL}/library/released/${id}/revisions`)
      .then(async response => await response.json());
    return result;
  }

  async getInconsistent() {
    console.log(BACKEND_URL);
    const result = await fetch(`${BACKEND_URL}/library/error/inconsistent`)
      .then(async response => await response.json());
    return result;
  }

  async getDuplicateNames() {
    console.log(BACKEND_URL);
    const result = await fetch(`${BACKEND_URL}/library/error/duplicatename`)
      .then(async response => await response.json());
    return result;
  }

  async getInconsistentDependency() {
    console.log(BACKEND_URL);
    const result = await fetch(`${BACKEND_URL}/library/error/inconsistentdep`)
      .then(async response => await response.json());
    return result;
  }

  async getNonDefaultInstance() {
    console.log(BACKEND_URL);
    const result = await fetch(`${BACKEND_URL}/library/error/nondefaultinstance`)
      .then(async response => await response.json());
    return result;
  }

  get(id) {
    const result = fetch(`${BACKEND_URL}/library/${id}`)
      .then(async response => await response.json());

    return result;
  }
  createReleaseNotes(data) {
    const result = fetch(`${BACKEND_URL}/library/release`, {
      method: "POST",
      body:data,
    })

    return result;
  }
}

export default new LibraryDataService();