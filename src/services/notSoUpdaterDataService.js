class NotSoUpdaterDataService {
    GetInstalledTiaVersions(url, headers) {
        const result = fetch(`${url}`, {
          method: "PUT",
          headers: headers
        })
    
        return result;
      }

}

export default new NotSoUpdaterDataService();