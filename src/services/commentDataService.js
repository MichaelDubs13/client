import { BACKEND_URL } from "../lib/config";

class CommentDataService {
    async getComments (id) {
        const result = await fetch(`${BACKEND_URL}/comments/plc/${id}`)
        .then(async response => await response.json());
        return result;
      }
    
    createComment(data) {
        const result = fetch(`${BACKEND_URL}/comments/plc`, {
          method: "POST",
          body:data
        })
    
        return result;
      }
}

export default new CommentDataService();